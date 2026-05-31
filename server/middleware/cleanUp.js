import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const cleanupProductFiles = async (product) => {
  try {
    if (product.image) {
      const uploadsDir = path.join(__dirname, '../uploads/products');
      const filePath = path.join(uploadsDir, product.image);
      
      try {
        await fs.access(filePath);
        await fs.unlink(filePath);
      } catch (_fileError) {
        console.warn(product.image);
      }
    }
  } catch (error) {
    console.error('File cleanup error:', error);
  }
};