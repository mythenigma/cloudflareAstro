#!/usr/bin/env python3
"""
Fix all 2026 dates to 2025 in blog markdown files
"""
import os
import re
from pathlib import Path

def fix_dates_in_file(file_path):
    """Fix 2026 dates to 2025 in a markdown file"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Replace 2026 with 2025 in pubDate fields
        original_content = content
        content = re.sub(r'pubDate: "([^"]*2026)"', r'pubDate: "\1"', content)
        content = content.replace('2026', '2025')
        
        # Only write if content changed
        if content != original_content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            return True
        return False
    except Exception as e:
        print(f"Error processing {file_path}: {e}")
        return False

def main():
    blog_dir = Path('src/content/blog')
    if not blog_dir.exists():
        print(f"Blog directory not found: {blog_dir}")
        return
    
    fixed_count = 0
    total_files = 0
    
    # Find all markdown files
    for md_file in blog_dir.rglob('*.md'):
        total_files += 1
        if fix_dates_in_file(md_file):
            fixed_count += 1
            print(f"Fixed: {md_file}")
    
    print(f"\nTotal files processed: {total_files}")
    print(f"Files fixed: {fixed_count}")

if __name__ == '__main__':
    main()
