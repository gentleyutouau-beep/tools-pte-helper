#!/usr/bin/env python3
"""
Generate Chinese translations for missing vocabulary entries using Claude API.
Resumable: caches progress to scripts/vocab-cache.json.
Usage: ANTHROPIC_API_KEY=sk-... python3 scripts/generate-vocab-details.py
"""

import asyncio
import json
import os
import re
import sys
from pathlib import Path

import anthropic

ROOT = Path(__file__).parent.parent
CACHE_FILE = Path(__file__).parent / 'vocab-cache.json'
VOCAB_TS = ROOT / 'lib' / 'vocabulary.ts'
DETAILS_TS = ROOT / 'lib' / 'vocabularyDetails.ts'

BATCH_SIZE = 50
CONCURRENCY = 6


def get_all_words() -> list[str]:
    content = VOCAB_TS.read_text()
    seen: set[str] = set()
    result: list[str] = []
    for section in re.findall(r'words:\s*\[(.*?)\]', content, re.DOTALL):
        for w in re.findall(r"'([^']+)'", section):
            if w not in seen:
                seen.add(w)
                result.append(w)
    return result


def get_existing_keys() -> set[str]:
    content = DETAILS_TS.read_text()
    m = re.search(r'const DETAILS[^=]*=\s*\{(.*?)\n\}', content, re.DOTALL)
    if not m:
        return set()
    return set(re.findall(r'^\s+(\w+):\s*\{', m.group(1), re.MULTILINE))


def load_cache() -> dict:
    if CACHE_FILE.exists():
        return json.loads(CACHE_FILE.read_text(encoding='utf-8'))
    return {}


def save_cache(cache: dict) -> None:
    CACHE_FILE.write_text(json.dumps(cache, ensure_ascii=False, indent=2), encoding='utf-8')


async def fetch_batch(
    client: anthropic.AsyncAnthropic,
    words: list[str],
    sem: asyncio.Semaphore,
) -> list[dict]:
    async with sem:
        prompt = (
            "For each English word below, return a JSON array. Each object must have:\n"
            '  "word": the word exactly as given\n'
            '  "pos": POS abbreviation — e.g. "n.", "v.", "adj.", "adv.", "n./v.", "adj./n."\n'
            '  "zh": concise Chinese translation; use ；to separate distinct meanings (max 3)\n'
            '  "ex": one short natural English sentence under 15 words\n\n'
            "Return ONLY the JSON array, no markdown fences, no extra text.\n\n"
            f"Words: {json.dumps(words, ensure_ascii=False)}"
        )
        msg = await client.messages.create(
            model="claude-haiku-4-5-20251001",
            max_tokens=4096,
            messages=[{"role": "user", "content": prompt}],
        )
        text = msg.content[0].text.strip()
        m = re.search(r'\[.*\]', text, re.DOTALL)
        if not m:
            print(f"  [warn] no JSON in response for batch starting with {words[0]!r}", file=sys.stderr)
            return []
        try:
            return json.loads(m.group())
        except json.JSONDecodeError as e:
            print(f"  [warn] JSON parse error: {e}", file=sys.stderr)
            return []


def escape_ts(s: str) -> str:
    return s.replace('\\', '\\\\').replace("'", "\\'")


async def main() -> None:
    api_key = os.environ.get('ANTHROPIC_API_KEY')
    if not api_key:
        print("Error: ANTHROPIC_API_KEY environment variable not set", file=sys.stderr)
        sys.exit(1)

    all_words = get_all_words()
    existing = get_existing_keys()
    cache = load_cache()

    missing = [w for w in all_words if w.lower() not in existing and w.lower() not in cache]
    total = len(missing)
    print(f"Total unique words : {len(all_words)}")
    print(f"Already in source  : {len(existing)}")
    print(f"Already cached     : {len(cache)}")
    print(f"To generate        : {total}")

    if missing:
        client = anthropic.AsyncAnthropic(api_key=api_key)
        sem = asyncio.Semaphore(CONCURRENCY)
        batches = [missing[i : i + BATCH_SIZE] for i in range(0, total, BATCH_SIZE)]
        done = 0
        lock = asyncio.Lock()

        async def process(idx: int, batch: list[str]) -> None:
            nonlocal done
            results = await fetch_batch(client, batch, sem)
            async with lock:
                for r in results:
                    key = r.get('word', '').lower()
                    if key:
                        cache[key] = r
                done += len(batch)
                save_cache(cache)
                print(f"  [{done}/{total}] batch {idx+1}/{len(batches)} done")

        await asyncio.gather(*[process(i, b) for i, b in enumerate(batches)])
        print("Generation complete.")

    # --- Rebuild vocabularyDetails.ts ---
    print("Writing vocabularyDetails.ts ...")

    new_lines: list[str] = []
    for word in all_words:
        key = word.lower()
        if key in existing:
            continue  # preserve hand-crafted entries
        r = cache.get(key)
        if not r:
            continue
        pos = escape_ts(r.get('pos', 'n./v./adj.'))
        zh  = escape_ts(r.get('zh', ''))
        ex  = escape_ts(r.get('ex', f'The word "{word}" appears in academic contexts.'))
        new_lines.append(f"  {key}: {{ partOfSpeech: '{pos}', translation: '{zh}', example: '{ex}' }},")

    content = DETAILS_TS.read_text(encoding='utf-8')
    # Insert generated entries before the closing } of DETAILS
    content = re.sub(
        r'(const DETAILS[^=]*=\s*\{)(.*?)(\n\})',
        lambda m: m.group(1) + m.group(2) + '\n' + '\n'.join(new_lines) + m.group(3),
        content,
        flags=re.DOTALL,
    )
    DETAILS_TS.write_text(content, encoding='utf-8')
    print(f"Done — added {len(new_lines)} entries to vocabularyDetails.ts")


if __name__ == '__main__':
    asyncio.run(main())
