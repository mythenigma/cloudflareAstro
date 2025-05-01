import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const SOURCE_DIR = './public/maipdf-images';
const TARGET_DIR = './public/maipdf-images/optimized';

// Create target directory if it doesn't exist
if (!fs.existsSync(TARGET_DIR)) {
  fs.mkdirSync(TARGET_DIR, { recursive: true });
}

// Process files
async function optimizeImages() {
  console.log('Starting image optimization...');
  
  // Get all image files
  const files = fs.readdirSync(SOURCE_DIR).filter(file => {
    const ext = path.extname(file).toLowerCase();
    return ['.jpg', '.jpeg', '.png', '.webp', '.gif'].includes(ext);
  });
  
  // Target sizes for responsive images
  const sizes = [480, 768, 1024, 1280];
  
  // Process each file
  for (const file of files) {
    const sourcePath = path.join(SOURCE_DIR, file);
    
    // Skip directories
    if (fs.statSync(sourcePath).isDirectory()) {
      continue;
    }
    
    const fileBaseName = path.basename(file, path.extname(file));
    
    try {
      // Get image metadata
      const metadata = await sharp(sourcePath).metadata();
      
      // Original size in KB
      const originalSize = fs.statSync(sourcePath).size / 1024;
      
      // Original extension
      const originalExt = path.extname(file).toLowerCase();
      
      // Only resize if image is larger than our largest target size
      if (metadata.width > sizes[sizes.length - 1]) {
        // Create responsive versions
        for (const width of sizes.filter(size => size < metadata.width)) {
          const targetWebP = path.join(TARGET_DIR, `${fileBaseName}-${width}.webp`);
          const targetOriginal = path.join(TARGET_DIR, `${fileBaseName}-${width}${originalExt}`);
          
          // Create WebP version
          await sharp(sourcePath)
            .resize(width)
            .webp({ quality: 80 })
            .toFile(targetWebP);
            
          // Create original format version
          await sharp(sourcePath)
            .resize(width)
            .toFile(targetOriginal);
          
          console.log(`Resized: ${file} to ${width}px width`);
        }
      }
      
      // Always create a WebP version of the original size
      const targetWebP = path.join(TARGET_DIR, `${fileBaseName}.webp`);
      await sharp(sourcePath)
        .webp({ quality: 80 })
        .toFile(targetWebP);
        
      const newWebPSize = fs.statSync(targetWebP).size / 1024;
      console.log(`Converted: ${file} to WebP (${originalSize.toFixed(1)}KB → ${newWebPSize.toFixed(1)}KB, saved ${((1 - newWebPSize/originalSize) * 100).toFixed(1)}%)`);
      
    } catch (err) {
      console.error(`Error processing ${file}:`, err);
    }
  }
  
  console.log('Image optimization complete!');
}

optimizeImages().catch(err => {
  console.error('Error during image optimization:', err);
  process.exit(1);
});