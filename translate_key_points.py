#!/usr/bin/env python3
"""
Translate "Key points" sections in non-English blog posts
"""
from pathlib import Path
import re

# Translation mappings for "Key points" section
TRANSLATIONS = {
    'fr': {
        'title': 'Points clés',
        'what_it_is': 'De quoi il s\'agit : un aperçu rapide du sujet.',
        'why_it_matters': 'Pourquoi c\'est important : réduire la confusion et rendre le partage plus sûr.',
        'next_step': 'Prochaine étape : consultez le diagramme ci-dessus et appliquez l\'idée à votre flux de travail.'
    },
    'es': {
        'title': 'Puntos clave',
        'what_it_is': 'Qué es: una descripción rápida del tema.',
        'why_it_matters': 'Por qué es importante: reducir la confusión y hacer que el intercambio sea más seguro.',
        'next_step': 'Próximo paso: revise el diagrama anterior y aplique la idea a su flujo de trabajo.'
    },
    'de': {
        'title': 'Wichtige Punkte',
        'what_it_is': 'Was es ist: ein schneller Überblick über das Thema.',
        'why_it_matters': 'Warum es wichtig ist: Verwirrung reduzieren und das Teilen sicherer machen.',
        'next_step': 'Nächster Schritt: Überprüfen Sie das obige Diagramm und wenden Sie die Idee auf Ihren Workflow an.'
    },
    'ja': {
        'title': '重要なポイント',
        'what_it_is': '概要：トピックの簡単な概要。',
        'why_it_matters': '重要性：混乱を減らし、共有をより安全にします。',
        'next_step': '次のステップ：上記の図を確認し、アイデアをワークフローに適用してください。'
    },
    'ko': {
        'title': '핵심 포인트',
        'what_it_is': '요약: 주제에 대한 간단한 개요.',
        'why_it_matters': '중요성: 혼란을 줄이고 공유를 더 안전하게 만듭니다.',
        'next_step': '다음 단계: 위의 다이어그램을 확인하고 아이디어를 워크플로우에 적용하세요.'
    },
    'cn': {
        'title': '关键要点',
        'what_it_is': '概述：主题的快速概述。',
        'why_it_matters': '重要性：减少混淆，使分享更安全。',
        'next_step': '下一步：查看上面的图表，并将想法应用到您的工作流程中。'
    }
}

def translate_key_points(content, lang):
    """Translate Key points section"""
    if lang not in TRANSLATIONS:
        return content
    
    trans = TRANSLATIONS[lang]
    
    # Replace "## Key points"
    content = re.sub(r'^##\s+Key points\s*$', f'## {trans["title"]}', content, flags=re.MULTILINE)
    
    # Replace bullet points
    content = re.sub(
        r'-\s*What it is:\s*a quick overview of the topic\.',
        f'- {trans["what_it_is"]}',
        content
    )
    content = re.sub(
        r'-\s*Why it matters:\s*reduce confusion and make sharing safer\.',
        f'- {trans["why_it_matters"]}',
        content
    )
    content = re.sub(
        r'-\s*Next step:\s*check the diagram above and apply the idea to your workflow\.',
        f'- {trans["next_step"]}',
        content
    )
    
    return content

def main():
    blog_dir = Path('src/content/blog')
    non_en_dirs = ['cn', 'ja', 'fr', 'de', 'es', 'ko']
    
    fixed_count = 0
    
    for lang_dir in non_en_dirs:
        lang_path = blog_dir / lang_dir
        if not lang_path.exists():
            continue
        
        for md_file in lang_path.rglob('*.md'):
            try:
                content = md_file.read_text(encoding='utf-8')
                if '## Key points' in content or '- What it is:' in content:
                    new_content = translate_key_points(content, lang_dir)
                    if new_content != content:
                        md_file.write_text(new_content, encoding='utf-8')
                        print(f"Fixed: {md_file}")
                        fixed_count += 1
            except Exception as e:
                print(f"Error processing {md_file}: {e}")
    
    print(f"\nTotal files fixed: {fixed_count}")

if __name__ == '__main__':
    main()
