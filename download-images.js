import axios from 'axios';
import fs from 'fs';
import { mkdirSync, existsSync, createWriteStream } from 'fs';
import path, { resolve, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Placeholder for your input data
const objs = [
  {'L':'https://www.babyriddle.com/blogs/baby-riddle-blog/blog-what-are-the-benefits-of-bamboo-baby-clothes','I':'https://cdn.shopify.com/s/files/1/0851/0868/7156/files/prd-kpspb3985-ele-alt2.jpg'},
{'L':'https://www.babyriddle.com/blogs/baby-riddle-blog/blog-guide-to-starting-family-holiday-pajamas','I':'https://cdn.shopify.com/s/files/1/0851/0868/7156/files/9m-cnns.jpg'},
{'L':'https://www.babyriddle.com/blogs/baby-riddle-blog/blog-how-to-take-perfect-family-portraits-outfit-ideas-and-tips','I':'https://cdn.shopify.com/s/files/1/0851/0868/7156/files/mq8pvevg.jpg'},
];

// Function to group URLs
function groupUrls(data) {
  const result = [];

  data.forEach(({ L, I }) => {
    const existingEntry = result.find(entry => entry.locationUrl === L);
    if (existingEntry) {
      existingEntry.images.push(I);
    } else {
      result.push({ locationUrl: L, images: [I] });
    }
  });

  return result;
}

const downloadTasks = groupUrls(objs);

// Function to extract folder name from the URL
function getFolderNameFromUrl(url) {
  const segments = url.split('/');
  return segments[segments.length - 1] || 'default-folder';
}

// Function to download an image and save it to a folder
async function downloadImage(url, folder, fileName) {
  try {
    const response = await axios({
      url,
      method: 'GET',
      responseType: 'stream',
    });

    // Ensure the directory exists
    if (!existsSync(folder)) {
      mkdirSync(folder, { recursive: true });
    }

    const filePath = resolve(folder, fileName);
    const writer = createWriteStream(filePath);

    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on('finish', () => resolve(`Downloaded to ${filePath}`));
      writer.on('error', reject);
    });
  } catch (error) {
    console.error(`Error downloading ${url}:`, error.message);
  }
}

// Function to process all download tasks
async function processDownloads() {
  for (const { locationUrl, images } of downloadTasks) {
    // Extract folder name from the location URL
    const folderName = getFolderNameFromUrl(locationUrl);
    const folderPath = join(__dirname, 'downloads', folderName);

    console.log(`Creating folder: ${folderPath}`);

    // Download all images for this location
    for (const imageUrl of images) {
      const fileName = imageUrl.split('/').pop(); // Extract file name from image URL
      console.log(`Downloading ${fileName} to ${folderPath}...`);
      const result = await downloadImage(imageUrl, folderPath, fileName);
      if (result) console.log(result);
    }
  }
}

// Run the download process
processDownloads()
  .then(() => console.log('All downloads completed'))
  .catch((err) => console.error('Error:', err));