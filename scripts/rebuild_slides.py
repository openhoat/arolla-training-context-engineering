#!/usr/bin/env python3
"""Rebuild slides/context-engineering.md from the PDF source.

Extracts text page-by-page from ContextEngineering4Devs_training.pdf
and generates a Marp markdown with real text (editable, searchable).
"""

import subprocess, sys, os, re
from pathlib import Path

PDF_PATH = Path(__file__).parent.parent / "slides" / "ContextEngineering4Devs_training.pdf"
IMG_DIR = Path(__file__).parent.parent / "slides" / "images"
OUT_PATH = Path(__file__).parent.parent / "slides" / "context-engineering.md"

PAGE_COUNT = 336


def extract_text(page: int) -> str:
    result = subprocess.run(
        ["pdftotext", "-f", str(page), "-l", str(page), "-layout", str(PDF_PATH), "-"],
        capture_output=True, text=True
    )
    text = result.stdout
    # strip form feed
    text = text.replace("\f", "")
    return text


def classify(text: str) -> str:
    """Classify a slide: 'text', 'short_title', 'visual'."""
    stripped = text.strip()
    if not stripped or len(stripped) <= 5:
        return "visual"
    if len(stripped) <= 30:
        return "short_title"
    return "text"


def clean_line(line: str) -> str:
    """Remove excessive leading whitespace while preserving structure."""
    # Strip trailing spaces
    line = line.rstrip()
    return line


def normalize_bullets(text: str) -> str:
    """Convert bullet chars to markdown dashes."""
    # U+2022 BULLET
    text = text.replace("\u2022", "-")
    return text


def fix_url_artifacts(text: str) -> str:
    """Insert spaces before URLs that got concatenated to previous words."""
    text = re.sub(r"([^\s])https?://", r"\1 https://", text)
    text = re.sub(r"([^\s])ftp://", r"\1 ftp://", text)
    return text


def parse_slide_text(text: str) -> str:
    """Convert extracted text to markdown slide content."""
    lines = text.split("\n")
    if not lines:
        return ""

    # Remove leading empty lines
    while lines and not lines[0].strip():
        lines.pop(0)
    if not lines:
        return ""

    title = lines[0].strip()
    body_lines = lines[1:]

    # Build title
    md = f"# {title}\n"

    if body_lines:
        # Strip trailing empty lines from body
        while body_lines and not body_lines[-1].strip():
            body_lines.pop()

        # Find common leading whitespace to dedent
        non_empty = [l for l in body_lines if l.strip()]
        if non_empty:
            indents = [len(l) - len(l.lstrip()) for l in non_empty if l.strip()]
            min_indent = min(indents) if indents else 0
        else:
            min_indent = 0

        for line in body_lines:
            stripped = line.strip()
            if not stripped:
                md += "\n"
                continue

            # Dedent
            content = line[min_indent:] if min_indent > 0 else line
            content = content.rstrip()

            md += f"{content}\n"

    return md


def build_frontmatter() -> str:
    return """---
marp: true
theme: default
paginate: false
backgroundColor: #fff
---

"""


def build_slide_content(page: int, text: str, cls: str) -> str:
    img_path = f"images/slide-{page:03d}.jpg"

    if cls == "visual":
        return f"![bg]({img_path})"

    text = fix_url_artifacts(text)
    slide_md = parse_slide_text(text)
    slide_md = normalize_bullets(slide_md)
    return slide_md.rstrip("\n")


def main():
    if not PDF_PATH.exists():
        print(f"ERROR: PDF not found at {PDF_PATH}", file=sys.stderr)
        sys.exit(1)

    # Read the legacy MD to get its frontmatter and verify consistency
    legacy_path = Path(__file__).parent.parent / "slides" / "context-engineering.legacy-images-only.md.bak"
    legacy_count = 0
    if legacy_path.exists():
        with open(legacy_path) as f:
            content = f.read()
            legacy_count = content.count("---\n")
        print(f"Legacy slides: ~{legacy_count} separators (expect 337 = 336 slides + frontmatter)")

    print(f"Generating from {PDF_PATH.name} ({PAGE_COUNT} pages)...")

    result = build_frontmatter()

    for p in range(1, PAGE_COUNT + 1):
        text = extract_text(p)
        cls = classify(text)
        slide_content = build_slide_content(p, text, cls)

        if p > 1:
            result += "\n\n---\n\n"
        result += slide_content

        if p % 50 == 0:
            print(f"  Processed {p}/{PAGE_COUNT} slides")

    with open(OUT_PATH, "w") as f:
        f.write(result)

    # Count: frontmatter closing --- + inter-slide separators
    sep_count = result.count("\n---\n")  # frontmatter + inter-slide
    print(f"\nDone! Generated {OUT_PATH}")
    print(f"Slides: {sep_count} (PDF has {PAGE_COUNT} pages)")
    print(f"Size: {os.path.getsize(OUT_PATH)} bytes")


if __name__ == "__main__":
    main()
