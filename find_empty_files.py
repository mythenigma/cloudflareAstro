#!/usr/bin/env python3
"""
Find all empty markdown files in blog directory
"""
from pathlib import Path

def find_empty_files():
    blog_dir = Path('src/content/blog')
    if not blog_dir.exists():
        print(f"Blog directory not found: {blog_dir}")
        return
    
    empty_files = []
    
    # Find all markdown files
    for md_file in blog_dir.rglob('*.md'):
        try:
            content = md_file.read_text(encoding='utf-8')
            if content.strip() == '':
                empty_files.append(md_file)
        except Exception as e:
            print(f"Error reading {md_file}: {e}")
    
    if empty_files:
        print(f"Found {len(empty_files)} empty files:\n")
        for f in empty_files:
            # Print path as string
            print(f"  {str(f)}")
    else:
        print("No empty files found.")
    
    return empty_files

if __name__ == '__main__':
    find_empty_files()
