/**
 * This script generates a search index from markdown files in the blog.
 * It extracts titles, headings, URLs, file names, and metadata to create a comprehensive JSON index for intelligent search.
 * Updated to handle multi-language blog structure and extract additional metadata for better search results.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { globby } from 'globby';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkParse from 'remark-parse';
import { visit } from 'unist-util-visit';
import { slug } from 'github-slugger';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const contentDir = path.join(__dirname, '../content/blog');
const outputPath = path.join(__dirname, '../../public/search-index.json');
const LANGUAGE_PREFIXES = new Set(['en', 'cn', 'fr', 'de', 'ja', 'ko', 'es']);
const SENSITIVE_SLUG_PATTERN = /(tracking|track|获取ip|追踪|drm)/i;
const SENSITIVE_TOKENS = ['tracking', 'track', '追踪', '获取ip', 'iplogger', 'grabify', 'whatstheirip'];
const SENSITIVE_TERM_PATTERNS = [
  /\btracking\b/gi,
  /\btrack\b/gi,
  /追踪/g,
  /获取\s*ip/gi,
  /iplogger/gi,
  /grabify/gi,
  /whatstheirip/gi,
];

function sanitizeText(input = '') {
  let output = input;
  for (const pattern of SENSITIVE_TERM_PATTERNS) {
    output = output.replace(pattern, '');
  }
  return output.replace(/\s{2,}/g, ' ').trim();
}

function hasSensitiveTerm(input = '') {
  const normalized = String(input).toLowerCase();
  return SENSITIVE_TOKENS.some((token) => normalized.includes(token));
}

async function generateSearchIndex() {
  console.log('Generating search index...');
  
  // Find all markdown files in the blog directory, including in language subdirectories
  const markdownFiles = await globby(['**/*.md'], { cwd: contentDir });
  
  const searchIndex = [];
  
  for (const file of markdownFiles) {
    const filePath = path.join(contentDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Parse frontmatter
    const { data: frontmatter, content: markdownContent } = matter(content);
    
    // Skip posts explicitly marked as noindex
    if (frontmatter.noindex === true) {
      continue;
    }

    // Get path parts to determine language and slug
    const pathParts = file.split('/');
    const hasLanguagePrefix = LANGUAGE_PREFIXES.has(pathParts[0]);
    const language = hasLanguagePrefix ? pathParts[0] : 'default';
    const fileName = pathParts[pathParts.length - 1];
    const fileSlug = fileName.replace(/\.md$/, '');

    // Skip indexing sensitive slugs even if frontmatter missed noindex.
    if (SENSITIVE_SLUG_PATTERN.test(file)) {
      continue;
    }

    // Skip indexing posts with sensitive wording in key metadata.
    if (hasSensitiveTerm(frontmatter.title || '') || hasSensitiveTerm(frontmatter.description || '')) {
      continue;
    }

    // Construct URL with/without language prefix
    const slugParts = hasLanguagePrefix ? pathParts.slice(1) : pathParts;
    slugParts[slugParts.length - 1] = fileSlug;
    const normalizedSlug = slugParts.join('/');
    const url = hasLanguagePrefix
      ? `/blog/${language}/${normalizedSlug}`
      : `/blog/${normalizedSlug}`;
    
    // Extract keywords from the file name by splitting on hyphens, underscores, and case changes
    const fileNameKeywords = fileSlug
      .replace(/[-_]/g, ' ')
      .replace(/([a-z])([A-Z])/g, '$1 $2') // Split camelCase
      .toLowerCase()
      .split(' ')
      .filter(word => word.length > 2);
      
    // Extract a short preview from the content
    const contentPreview = markdownContent
        .replace(/#{1,6}\s+/g, '') // Remove heading markers
        .replace(/(!?\[.*?\]\(.*?\))/g, '') // Remove markdown images/links
        .slice(0, 250) // First 250 chars
        .trim();
    
    // Extract all potential keywords from title, description, and tags
    const titleWords = (frontmatter.title || '')
      .toLowerCase()
      .split(/\s+/)
      .filter(word => word.length > 2);
      
    const descriptionWords = (frontmatter.description || '')
      .toLowerCase()
      .split(/\s+/)
      .filter(word => word.length > 2);
      
    // Combine all keywords
    const allKeywords = [
      ...fileNameKeywords,
      ...titleWords,
      ...descriptionWords,
      ...(frontmatter.tags || []),
      ...(frontmatter.keywords || [])
    ]
      .map((keyword) => sanitizeText(String(keyword).toLowerCase()))
      .filter(Boolean);
    
    // Add metadata for search ranking
    const datePublished = frontmatter.pubDate ? new Date(frontmatter.pubDate).getTime() : 0;
    const dateUpdated = frontmatter.updatedDate ? new Date(frontmatter.updatedDate).getTime() : datePublished;
    
    // Add the main page entry
    searchIndex.push({
      title: frontmatter.title || 'Untitled',
      url: url,
      type: 'article',
      language,
      content: sanitizeText(contentPreview),
      tags: (frontmatter.tags || [])
        .map((tag) => sanitizeText(String(tag)))
        .filter(Boolean),
      keywords: allKeywords,
      fileName: fileName,
      datePublished,
      dateUpdated,
      weight: calculateDocumentWeight(frontmatter)
    });
    
    // Extract headings
    const headings = [];
      const processor = remark()
      .use(remarkParse)
      .use(() => (tree) => {
        visit(tree, 'heading', (node) => {
          if (node.depth >= 2) { // Only h2 and deeper
            const text = node.children
              .filter(n => n.type === 'text')
              .map(n => n.value)
              .join('');
            
            if (text) {
              if (hasSensitiveTerm(text)) {
                return;
              }
              const id = slug(text);
              headings.push({
                title: sanitizeText(text),
                depth: node.depth,
                url: `${url}#${id}`,
                language,
                keywords: text
                  .toLowerCase()
                  .split(/\s+/)
                  .map((word) => sanitizeText(word))
                  .filter((word) => word.length > 2)
              });
            }
          }
        });
      });
    
    await processor.process(markdownContent);
    
    // Add entries for each heading
    headings.forEach(heading => {
      searchIndex.push({
        title: heading.title,
        url: heading.url,
        type: 'heading',
        language: heading.language,
        depth: heading.depth,
        keywords: heading.keywords,
        parentTitle: frontmatter.title || '',
        weight: 0.7 // Headings have lower weight than full articles
      });
    });
  }
  
  // Write the search index to a JSON file
  fs.writeFileSync(outputPath, JSON.stringify(searchIndex, null, 2));
  
  console.log(`Search index generated with ${searchIndex.length} entries at ${outputPath}`);
}

// Helper function to calculate document weight for ranking
function calculateDocumentWeight(frontmatter) {
  let weight = 1.0; // Base weight
  
  // Increase weight for articles with certain properties
  if (frontmatter.featured) weight += 0.5;
  if (frontmatter.heroImage) weight += 0.2;
  if (frontmatter.description && frontmatter.description.length > 100) weight += 0.3;
  if (Array.isArray(frontmatter.tags) && frontmatter.tags.length > 2) weight += 0.2;
  
  return weight;
}

generateSearchIndex().catch(error => {
  console.error('Error generating search index:', error);
  process.exit(1);
});
