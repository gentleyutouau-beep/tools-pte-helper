import re
import zlib
from pathlib import Path

SOURCES = [
    ("pte-basic", "PTE基础词汇", "PTE", Path("/Users/rickni/Downloads/猩际PTE基础单词本 pdf.pdf")),
    ("pte-advanced", "PTE高阶词汇", "PTE", Path("/Users/rickni/Downloads/猩际PTE高阶单词本 pdf.pdf")),
    ("listening-fib", "听力 FIB 高频词汇", "Listening FIB", Path("/Users/rickni/Downloads/猩际听力 fib 词汇pdf.pdf")),
    ("reading-fib-basic", "阅读 FIB 基础词汇", "Reading FIB", Path("/Users/rickni/Downloads/猩际阅读 FIB 基础单词本 pdf.pdf")),
    ("reading-fib-advanced", "阅读 FIB 高阶词汇", "Reading FIB", Path("/Users/rickni/Downloads/猩际阅读 FIB 高阶单词本 pdf.pdf")),
]

NOISE = {
    "apeuni", "pte", "fib", "page", "of", "www", "com", "ptexj", "listening",
    "reading", "words", "word", "basic", "advanced",
}


def cmap_for(pdf: bytes) -> dict[int, str]:
    idx = pdf.find(b"/ToUnicode")
    if idx < 0:
        return {}
    idx = pdf.find(b"15 0 obj", idx)
    start = pdf.find(b"stream", idx) + len(b"stream")
    while pdf[start:start + 1] in b"\r\n":
        start += 1
    end = pdf.find(b"endstream", start)
    text = zlib.decompress(pdf[start:end]).decode("latin1")
    return {
        int(src, 16): chr(int(dst, 16))
        for src, dst in re.findall(r"<([0-9A-F]{4})>\s*<([0-9A-F]{4})>", text)
    }


def decode_hex(hex_text: str, mapping: dict[int, str]) -> str:
    chars = []
    for i in range(0, len(hex_text), 4):
        chars.append(mapping.get(int(hex_text[i:i + 4], 16), ""))
    return "".join(chars)


def extract_words(path: Path) -> list[str]:
    pdf = path.read_bytes()
    mapping = cmap_for(pdf)
    words: list[str] = []

    for match in re.finditer(rb"(\d+) 0 obj\r?\n?", pdf):
        obj_start = match.end()
        obj_end = pdf.find(b"endobj", obj_start)
        if obj_end < 0:
            continue

        obj = pdf[obj_start:obj_end]
        if b"/Filter /FlateDecode" not in obj or b"/Subtype /Image" in obj:
            continue
        length_match = re.search(rb"/Length\s+(\d+)", obj[:1000])
        if length_match and int(length_match.group(1)) > 60000:
            continue

        stream_start = obj.find(b"stream")
        if stream_start < 0:
            continue
        stream_start += len(b"stream")
        while obj[stream_start:stream_start + 1] in b"\r\n":
            stream_start += 1
        stream_end = obj.find(b"endstream", stream_start)

        try:
            stream = zlib.decompress(obj[stream_start:stream_end].strip(b"\r\n"))
        except zlib.error:
            continue

        for block in re.findall(rb"BT(.*?)ET", stream, re.S):
            parts = re.findall(rb"<([0-9A-F]+)>\s*Tj", block)
            if not parts:
                continue
            token = "".join(decode_hex(part.decode(), mapping) for part in parts).strip()
            normalized = token.lower()
            if (
                re.fullmatch(r"[A-Za-z][A-Za-z-]*", token)
                and len(token) > 1
                and normalized not in NOISE
            ):
                words.append(token)

    seen = set()
    result = []
    for word in words:
        key = word.lower()
        if key in seen:
            continue
        seen.add(key)
        result.append(word)
    return result


def ts_string(value: str) -> str:
    return value.replace("\\", "\\\\").replace("'", "\\'")


def main() -> None:
    books = []
    for slug, title, category, path in SOURCES:
        words = extract_words(path)
        books.append((slug, title, category, words))
        print(f"{slug}: {len(words)} words")

    lines = [
        "export interface VocabularyBook {",
        "  slug: string",
        "  title: string",
        "  category: string",
        "  words: string[]",
        "}",
        "",
        "export const VOCABULARY_BOOKS: VocabularyBook[] = [",
    ]
    for slug, title, category, words in books:
        lines.extend([
            "  {",
            f"    slug: '{ts_string(slug)}',",
            f"    title: '{ts_string(title)}',",
            f"    category: '{ts_string(category)}',",
            "    words: [",
        ])
        for word in words:
            lines.append(f"      '{ts_string(word)}',")
        lines.extend([
            "    ],",
            "  },",
        ])
    lines.extend([
        "]",
        "",
        "export function getVocabularyBook(slug: string) {",
        "  return VOCABULARY_BOOKS.find((book) => book.slug === slug)",
        "}",
        "",
    ])

    Path("lib/vocabulary.ts").write_text("\n".join(lines), encoding="utf-8")


if __name__ == "__main__":
    main()
