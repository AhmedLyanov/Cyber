import sharp from "sharp";
import path from "path";

class Resizer {
  constructor() {
    this.sizes = {
      thumbnail: { width: 150, height: 150 },
      small: { width: 300, height: 300 },
      medium: { width: 600, height: 600 },
      large: { width: 1200, height: 1200 }
    };
  }

  async processImage(inputPath, outputDir, filename) {
    const results = {};
    
    for (const [sizeName, dimensions] of Object.entries(this.sizes)) {
      const outputPath = path.join(outputDir, `${sizeName}_${filename}`);
      
      await sharp(inputPath)
        .resize(dimensions.width, dimensions.height, {
          fit: 'cover', 
          position: 'center'
        })
        .webp({ quality: 80 }) 
        .toFile(outputPath);
      
      results[sizeName] = `${sizeName}_${filename}`;
    }
    
    return results;
  }
}

const resizer = new Resizer();
export default resizer;