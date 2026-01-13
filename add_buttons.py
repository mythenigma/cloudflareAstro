import os
import glob

button_html = '''
<div class="solution-highlight">
  <h2 class="solution-title">🚀 Ready to Start?</h2>
  <p class="solution-desc">Experience the power of <strong>Maiimg</strong> - Upload, share, and track your images with complete control!</p>
  <a href="https://maiimg.com" class="solution-button">Try Maiimg Now</a>
</div>
'''

# 查找所有maiimg和image相关的英文文章
patterns = ['src/content/blog/en/*maiimg*.md', 'src/content/blog/en/*image*.md']
files = []
for pattern in patterns:
    files.extend(glob.glob(pattern))

files = list(set(files))  # 去重
count = 0

for filepath in files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 检查是否已有按钮
    if 'Try Maiimg Now' in content:
        continue
    
    # 找到最后一个 ---
    lines = content.split('\n')
    last_separator_idx = -1
    for i in range(len(lines) - 1, -1, -1):
        if lines[i].strip() == '---':
            last_separator_idx = i
            break
    
    if last_separator_idx > 0:
        # 在最后的 --- 之前插入按钮
        lines.insert(last_separator_idx, button_html)
        new_content = '\n'.join(lines)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        count += 1
        print(f"Added button to: {filepath}")

print(f"\nTotal files updated: {count}")
