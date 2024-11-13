import imagemin from 'imagemin';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminPngquant from 'imagemin-pngquant';
import imageminGifsicle from 'imagemin-gifsicle';
import imageminWebp from 'imagemin-webp';
import path from 'path';
import { readdir } from 'fs/promises';
import { writeFile } from 'fs/promises';
import fs from 'fs';

const downloadsFolderPath = './downloads';

const optimizeImagesInFolder = async (folderPath) => {
  const files = await readdir(folderPath, { withFileTypes: true });

  for (const file of files) {
    const filePath = path.join(folderPath, file.name);

    if (file.isDirectory()) {
      // Recursively process subdirectories
      await optimizeImagesInFolder(filePath);
    } else if (file.isFile()) {
      const ext = path.extname(file.name).toLowerCase();
      if (['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext)) {
        try {
          // Optimize the image and get the optimized buffer
          const optimizedBuffer = await imagemin.buffer(await fs.promises.readFile(filePath), {
            plugins: [
              imageminMozjpeg({ quality: 75 }),
              imageminPngquant({ quality: [0.6, 0.8] }),
              imageminGifsicle({ optimizationLevel: 2 }),
              imageminWebp({ quality: 75 }),
            ],
          });

          // Overwrite the original file with the optimized buffer
          await writeFile(filePath, optimizedBuffer);
          console.log(`Optimized: ${filePath}`);
        } catch (error) {
          console.error(`Error optimizing ${filePath}:`, error);
        }
      }
    }
  }
};

// Execute the optimization process
(async () => {
  try {
    await optimizeImagesInFolder(downloadsFolderPath);
    console.log('Image optimization complete.');
  } catch (error) {
    console.error('Error during optimization:', error);
  }
})();