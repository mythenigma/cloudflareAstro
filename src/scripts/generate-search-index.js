/**
 * This script generates a search index from markdown files in the blog.
 * It extracts titles, headings, and URLs to create a JSON index for client-side search.
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
  
  // Find all markdown files in the blog directory
  const markdownFiles = await globby(['*.md'], { cwd: contentDir });
  
  const searchIndex = [];
  
  for (const file of markdownFiles) {
    const filePath = path.join(contentDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Parse frontmatter
    const { data: frontmatter, content: markdownContent } = matter(content);
    
    // Get slug from filename (remove .md extension)
    const fileSlug = file.replace(/\.md$/, '');
    const url = `/blog/${fileSlug}`;
    
    // Add the main page entry
    searchIndex.push({
      title: frontmatter.title || 'Untitled',
      url: url,
      type: 'article',
      content: markdownContent.slice(0, 150) // First 150 chars as preview
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
                url: `${url}#${id}`
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
        depth: heading.depth
      });
    });
  }
  
  // Write the search index to a JSON file
  fs.writeFileSync(outputPath, JSON.stringify(searchIndex, null, 2));
  
  console.log(`Search index generated with ${searchIndex.length} entries at ${outputPath}`);
}

generateSearchIndex().catch(error => {
  console.error('Error generating search index:', error);
  process.exit(1);
});