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
import remarkStringify from 'remark-stringify';
import { visit } from 'unist-util-visit';
import { slug } from 'github-slugger';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const contentDir = path.join(__dirname, '../content/blog');
const outputPath = path.join(__dirname, '../../public/search-index.json');

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
    
    // Get path parts to determine language and slug
    const pathParts = file.split('/');
    const language = pathParts[0]; // e.g., 'en', 'fr', etc.
    const fileName = pathParts[pathParts.length - 1];
    const fileSlug = fileName.replace(/\.md$/, '');
    
    // Construct URL with language path included
    const url = `/blog/${language}/${fileSlug}/`;
    
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
    ].filter(Boolean);
    
    // Add metadata for search ranking
    const datePublished = frontmatter.pubDate ? new Date(frontmatter.pubDate).getTime() : 0;
    const dateUpdated = frontmatter.updatedDate ? new Date(frontmatter.updatedDate).getTime() : datePublished;
    
    // Add the main page entry
    searchIndex.push({
      title: frontmatter.title || 'Untitled',
      url: url,
      type: 'article',
      language: language,
      content: contentPreview,
      tags: frontmatter.tags || [],
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
              const id = slug(text);
              headings.push({
                title: text,
                depth: node.depth,
                url: `${url}#${id}`,
                language: language,
                keywords: text.toLowerCase().split(/\s+/).filter(word => word.length > 2)
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