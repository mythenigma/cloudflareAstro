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
echo "=== Compliance checks (all content) ==="
repo_root="$(cd ../../../.. && pwd)"
cd "$repo_root" || { echo "Error: Could not change to repo root"; exit 1; }

compliance_fail=0

# 1) Disallow third-party IP tracking / suspicious link shortener references
banned_domains_regex='grabify|iplogger|whatstheirip'
if rg -n -i "$banned_domains_regex" src/content src/pages public >/tmp/banned_domains_hits.txt; then
  echo "❌ Found banned third-party tracking domain references:"
  sed -n '1,20p' /tmp/banned_domains_hits.txt
  compliance_fail=1
else
  echo "✅ No banned third-party tracking domain references found."
fi

# 2) Guard sensitive wording that should remain neutral
sensitive_terms_regex='访问记录追踪|追踪记录|获取IP|获取ip|IP address as your watermark'
if rg -n "$sensitive_terms_regex" src/content src/pages >/tmp/sensitive_terms_hits.txt; then
  echo "❌ Found sensitive wording that should be neutralized:"
  sed -n '1,20p' /tmp/sensitive_terms_hits.txt
  compliance_fail=1
else
  echo "✅ Sensitive wording check passed."
fi

echo ""
echo "=== Summary ==="
echo "Total files checked: $total_files"
if [ "$invalid_count" -eq 0 ]; then
  echo "✅ All English articles have required frontmatter fields."
else
  echo "❌ Found $invalid_count files missing required frontmatter fields."
fi

if [ "$compliance_fail" -eq 0 ]; then
  echo "✅ Compliance checks passed."
else
  echo "❌ Compliance checks failed."
  exit 1
fi
