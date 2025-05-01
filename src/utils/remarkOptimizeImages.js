import { visit } from 'unist-util-visit';

// This remark plugin will replace standard markdown images with our OptimizedImage component
export function remarkOptimizeImages() {
  return (tree) => {
    visit(tree, 'image', (node) => {
      const { url, alt } = node;
      
      // Transform the node into an mdx component
      node.type = 'mdxJsxFlowElement';
      node.name = 'OptimizedImage';
      node.attributes = [
        { type: 'mdxJsxAttribute', name: 'src', value: url },
        { type: 'mdxJsxAttribute', name: 'alt', value: alt || '' },
        { type: 'mdxJsxAttribute', name: 'loading', value: 'lazy' },
        { type: 'mdxJsxAttribute', name: 'decoding', value: 'async' }
      ];
      
      delete node.url;
      delete node.alt;
    });
  };
}