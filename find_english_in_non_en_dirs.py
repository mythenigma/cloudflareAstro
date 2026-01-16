#!/usr/bin/env python3
"""
Find blog posts in non-English directories that contain English content
"""
from pathlib import Path
import re

def contains_english_content(content):
    """Check if content contains English text patterns"""
    # Common English phrases in blog posts
    english_patterns = [
        r'\bKey points\b',
        r'\bWhat it is\b',
        r'\bWhy it matters\b',
        r'\bNext step\b',
        r'\bquick overview\b',
        r'\breduce confusion\b',
        r'\bapply the idea\b',
        r'\bto your workflow\b',
        r'^##\s+[A-Z][a-z]+',  # English headings like "## Key points"
    ]
    
    for pattern in english_patterns:
        if re.search(pattern, content, re.IGNORECASE | re.MULTILINE):
            return True
    return False

def main():
    blog_dir = Path('src/content/blog')
    non_en_dirs = ['cn', 'ja', 'fr', 'de', 'es', 'ko']
    
    files_to_translate = []
    
    for lang_dir in non_en_dirs:
        lang_path = blog_dir / lang_dir
        if not lang_path.exists():
            continue
            
        for md_file in lang_path.rglob('*.md'):
            try:
                content = md_file.read_text(encoding='utf-8')
                if contains_english_content(content):
                    files_to_translate.append(md_file)
            except Exception as e:
                print(f"Error reading {md_file}: {e}")
    
    if files_to_translate:
        print(f"Found {len(files_to_translate)} files with English content in non-English directories:\n")
        # Show first 50 files
        for f in files_to_translate[:50]:
            print(f"  {str(f)}")
        if len(files_to_translate) > 50:
            print(f"\n... and {len(files_to_translate) - 50} more files")
    else:
        print("No files with English content found in non-English directories.")
    
    return files_to_translate

if __name__ == '__main__':
    main()
