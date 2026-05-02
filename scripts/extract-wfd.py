import re
import zlib
from pathlib import Path

PDF_PATH = Path("/Users/rickni/Downloads/【截至4.30】WFD高频213句.pdf")
OUT_PATH = Path("lib/wfd.ts")

FONT_TO_UNICODE = {
    "F7": 20,
    "F8": 25,
    "F9": 30,
    "F11": 35,
    "F12": 40,
    "F13": 45,
    "F57": 50,
}


def ts_string(value: str) -> str:
    return value.replace("\\", "\\\\").replace("'", "\\'")


def get_obj(pdf: bytes, num: int) -> bytes:
    marker = f"{num} 0 obj".encode()
    start = pdf.find(marker)
    end = pdf.find(b"endobj", start)
    return pdf[start:end]


def stream_of_obj(pdf: bytes, num: int) -> bytes:
    obj = get_obj(pdf, num)
    start = obj.find(b"stream") + len(b"stream")
    while obj[start:start + 1] in b"\r\n":
        start += 1
    end = obj.find(b"endstream", start)
    return zlib.decompress(obj[start:end].strip(b"\r\n"))


def cmap(pdf: bytes, num: int) -> dict[int, str]:
    text = stream_of_obj(pdf, num).decode("latin1")
    mapping: dict[int, str] = {}
    for src, dst in re.findall(r"<([0-9A-Fa-f]{4})>\s*<([0-9A-Fa-f]{4})>", text):
        mapping[int(src, 16)] = chr(int(dst, 16))
    for line in text.splitlines():
        match = re.match(r"<([0-9A-Fa-f]{4})>\s+<([0-9A-Fa-f]{4})>\s+<([0-9A-Fa-f]{4})>", line.strip())
        if match:
            start, end, dst = (int(part, 16) for part in match.groups())
            for code in range(start, end + 1):
                mapping[code] = chr(dst + code - start)
    return mapping


def decode_hex(hex_text: str, font: str, maps: dict[str, dict[int, str]]) -> str:
    mapping = maps.get(font, {})
    return "".join(mapping.get(int(hex_text[i:i + 4], 16), "") for i in range(0, len(hex_text), 4))


def extract_text(pdf: bytes) -> str:
    maps = {font: cmap(pdf, ref) for font, ref in FONT_TO_UNICODE.items()}
    content_refs = [int(ref) for ref in re.findall(rb"/Contents\s+(\d+)\s+0\s+R", pdf)]
    chunks: list[str] = []

    for ref in content_refs:
        try:
            stream = stream_of_obj(pdf, ref)
        except Exception:
            continue
        current_font = ""
        token_pattern = re.compile(rb"/(F\d+)\s+[\d.]+\s+Tf|<([0-9A-Fa-f]+)>\s*Tj|\[(.*?)\]\s*TJ", re.S)
        for match in token_pattern.finditer(stream):
            if match.group(1):
                current_font = match.group(1).decode()
            elif match.group(2) and current_font:
                chunks.append(decode_hex(match.group(2).decode(), current_font, maps))
            elif match.group(3) and current_font:
                parts = re.findall(rb"<([0-9A-Fa-f]+)>", match.group(3))
                if parts:
                    chunks.append("".join(decode_hex(part.decode(), current_font, maps) for part in parts))

    return "\n".join(chunk.strip() for chunk in chunks if chunk.strip())


def parse_records(text: str) -> list[dict[str, object]]:
    lines = [line.strip() for line in text.splitlines() if line.strip()]
    records: list[dict[str, object]] = []
    i = 0

    while i < len(lines):
        match = re.match(r"^(\d+)\.(.+)$", lines[i])
        if not match:
            i += 1
            continue

        number = int(match.group(1))
        sentence_parts = [match.group(2).strip()]
        i += 1
        while i < len(lines) and not re.match(r"^#\d+", lines[i]):
            sentence_parts.append(lines[i])
            i += 1
        if i >= len(lines):
            break

        code = lines[i]
        i += 1
        tags: list[str] = []
        while i < len(lines) and lines[i] in {"极高频", "极限预测", "普通", "简单", "困难", "重回", "新题", "降频区"}:
            tags.append(lines[i])
            i += 1

        translation_parts: list[str] = []
        while i < len(lines) and not re.match(r"^\d+\.", lines[i]):
            translation_parts.append(lines[i])
            i += 1

        difficulty = next((tag for tag in tags if tag in {"简单", "普通", "困难"}), "")
        labels = [tag for tag in tags if tag != difficulty]
        records.append({
            "number": number,
            "sentence": " ".join(sentence_parts).strip(),
            "translation": " ".join(translation_parts).strip(),
            "code": code,
            "difficulty": difficulty,
            "labels": labels,
        })

    return records


def main() -> None:
    pdf = PDF_PATH.read_bytes()
    records = parse_records(extract_text(pdf))
    print(f"Extracted {len(records)} WFD records")

    lines = [
        "export interface WFDSentence {",
        "  number: number",
        "  sentence: string",
        "  translation: string",
        "  code: string",
        "  difficulty: string",
        "  labels: string[]",
        "}",
        "",
        "export const WFD_SENTENCES: WFDSentence[] = [",
    ]
    for item in records:
        labels = ", ".join(f"'{ts_string(label)}'" for label in item["labels"])
        lines.extend([
            "  {",
            f"    number: {item['number']},",
            f"    sentence: '{ts_string(str(item['sentence']))}',",
            f"    translation: '{ts_string(str(item['translation']))}',",
            f"    code: '{ts_string(str(item['code']))}',",
            f"    difficulty: '{ts_string(str(item['difficulty']))}',",
            f"    labels: [{labels}],",
            "  },",
        ])
    lines.extend([
        "]",
        "",
    ])
    OUT_PATH.write_text("\n".join(lines), encoding="utf-8")


if __name__ == "__main__":
    main()
