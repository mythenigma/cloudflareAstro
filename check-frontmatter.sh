#!/bin/bash

echo "=== Validating frontmatter for English articles ==="
echo ""

cd src/content/blog/en || { echo "Error: Could not change directory to src/content/blog/en"; exit 1; }

invalid_count=0
total_files=0

for file in *.md; do
  [ -f "$file" ] || continue
  total_files=$((total_files+1))
  
  missing_fields=()
  
  if ! grep -q "^title:" "$file"; then
    missing_fields+=("title")
  fi
  if ! grep -q "^pubDate:" "$file"; then
    missing_fields+=("pubDate")
  fi
  if ! grep -q "^description:" "$file"; then
    missing_fields+=("description")
  fi
  
  if [ ${#missing_fields[@]} -gt 0 ]; then
    echo "❌ $file: Missing ${missing_fields[*]}"
    invalid_count=$((invalid_count+1))
  fi
done

echo ""
echo "=== Summary ==="
echo "Total files checked: $total_files"
if [ "$invalid_count" -eq 0 ]; then
  echo "✅ All English articles have required frontmatter fields."
else
  echo "❌ Found $invalid_count files missing required frontmatter fields."
fi
