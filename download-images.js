import axios from 'axios';
import fs from 'fs';
import { mkdirSync, existsSync, createWriteStream } from 'fs';
import path, { resolve, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Placeholder for your input data
const objs = [
  {'L':'https://ddrbbqsupply.com/blogs/news/essential-tips-on-how-to-use-an-offset-smoker-like-a-pro','I':'https://images.surferseo.art/46548196-37dc-49d7-8516-b7e9a8c75988.jpeg'},
{'L':'https://ddrbbqsupply.com/blogs/news/essential-tips-on-how-to-use-an-offset-smoker-like-a-pro','I':'https://images.surferseo.art/48ab43c2-35da-45e5-a256-2674a0350a06.jpeg'},
{'L':'https://ddrbbqsupply.com/blogs/news/essential-tips-on-how-to-use-an-offset-smoker-like-a-pro','I':'https://images.surferseo.art/c14f10b6-32a5-4b36-b9ce-f6b0092b4c9b.png'},
{'L':'https://ddrbbqsupply.com/blogs/news/essential-tips-on-how-to-use-an-offset-smoker-like-a-pro','I':'https://images.surferseo.art/927153ff-07fc-4e20-a413-c18affbc427f.jpeg'},
{'L':'https://ddrbbqsupply.com/blogs/news/fathers-day-gift-ideas-for-grill-masters','I':'https://images.surferseo.art/cb138146-a692-4699-981c-14ab0c80d264.jpeg'},
{'L':'https://ddrbbqsupply.com/blogs/news/fathers-day-gift-ideas-for-grill-masters','I':'https://images.surferseo.art/b9a74b73-c2c1-48da-9e1c-91f8ebd89088.jpeg'},
{'L':'https://ddrbbqsupply.com/blogs/news/fathers-day-gift-ideas-for-grill-masters','I':'https://images.surferseo.art/fb5926e9-73ca-4916-9cc7-1d3c85d56e13.jpeg'},
{'L':'https://ddrbbqsupply.com/blogs/news/fathers-day-gift-ideas-for-grill-masters','I':'https://images.surferseo.art/4584559b-485f-4e52-b0a3-d9c8220346d4.jpeg'},
{'L':'https://ddrbbqsupply.com/blogs/news/fathers-day-gift-ideas-for-grill-masters','I':'https://images.surferseo.art/6bda57a9-eea3-4fcb-919e-f72f377e05da.jpeg'},
{'L':'https://ddrbbqsupply.com/blogs/news/fathers-day-gift-ideas-for-grill-masters','I':'https://images.surferseo.art/2b6142b1-6399-4525-813b-e414c03495e7.jpeg'},
{'L':'https://ddrbbqsupply.com/blogs/news/fathers-day-gift-ideas-for-grill-masters','I':'https://images.surferseo.art/f71704ca-c603-4bd6-9c7c-96f0905622fc.jpeg'},
{'L':'https://ddrbbqsupply.com/blogs/news/fathers-day-gift-ideas-for-grill-masters','I':'https://images.surferseo.art/f32e75d9-b206-4c47-a7a4-2bf403c96fee.jpeg'},
{'L':'https://ddrbbqsupply.com/blogs/news/fathers-day-gift-ideas-for-grill-masters','I':'https://images.surferseo.art/008f7180-80eb-475b-94e7-a4475f25fdf6.jpeg'},
{'L':'https://ddrbbqsupply.com/blogs/news/must-have-4th-of-july-grilling-supplies','I':'https://images.surferseo.art/64aae077-e7cf-46a0-b8c7-e55bf9cafc7b.jpeg'},
{'L':'https://ddrbbqsupply.com/blogs/news/must-have-4th-of-july-grilling-supplies','I':'https://images.surferseo.art/33f84380-0170-4094-abdf-9e82ae5c8549.jpeg'},
{'L':'https://ddrbbqsupply.com/blogs/news/must-have-4th-of-july-grilling-supplies','I':'https://images.surferseo.art/b6747009-587b-4678-8908-d6edfc56aa39.jpeg'},
{'L':'https://ddrbbqsupply.com/blogs/news/must-have-4th-of-july-grilling-supplies','I':'https://images.surferseo.art/1754c68e-3e0b-4341-ba91-fafd6e03ede1.jpeg'},
{'L':'https://ddrbbqsupply.com/blogs/news/must-have-4th-of-july-grilling-supplies','I':'https://images.surferseo.art/365e071d-da3b-4341-9403-86661d29163e.jpeg'},
{'L':'https://ddrbbqsupply.com/blogs/news/must-have-4th-of-july-grilling-supplies','I':'https://images.surferseo.art/bc6f50ed-e031-4f80-9864-183d43fc7428.jpeg'},
{'L':'https://ddrbbqsupply.com/blogs/news/must-have-4th-of-july-grilling-supplies','I':'https://images.surferseo.art/6e1c96d0-40d9-4558-b392-b0ad715116f5.jpeg'},
{'L':'https://ddrbbqsupply.com/blogs/news/must-have-4th-of-july-grilling-supplies','I':'https://images.surferseo.art/5b4001dc-8325-4ef8-8b76-48bd99efee2e.jpeg'},
{'L':'https://ddrbbqsupply.com/blogs/news/must-have-4th-of-july-grilling-supplies','I':'https://images.surferseo.art/01733455-2bae-479e-98ff-1db5702f6f14.jpeg'},
{'L':'https://ddrbbqsupply.com/blogs/news/must-have-4th-of-july-grilling-supplies','I':'https://images.surferseo.art/2fde58b0-2b72-46aa-a85a-4fd1fe88e3c2.jpeg'},
{'L':'https://ddrbbqsupply.com/blogs/news/must-have-4th-of-july-grilling-supplies','I':'https://images.surferseo.art/5803328f-5888-4666-ba27-fa422529e1cc.jpeg'},
{'L':'https://ddrbbqsupply.com/blogs/news/must-have-4th-of-july-grilling-supplies','I':'https://images.surferseo.art/75a46fbf-f7e0-4427-a159-259d39502a3a.jpeg'},
{'L':'https://ddrbbqsupply.com/blogs/news/must-have-4th-of-july-grilling-supplies','I':'https://images.surferseo.art/53032a2f-6846-4a3f-8392-6119766b2708.jpeg'},
{'L':'https://ddrbbqsupply.com/blogs/news/must-have-4th-of-july-grilling-supplies','I':'https://images.surferseo.art/494f7c4a-e27a-4b08-a52e-8e76a22903ec.jpeg'},
{'L':'https://ddrbbqsupply.com/blogs/news/must-have-4th-of-july-grilling-supplies','I':'https://images.surferseo.art/b9b7e9d8-2522-481f-9f3b-4f4a5b3a72f8.jpeg'},
{'L':'https://ddrbbqsupply.com/blogs/news/must-have-4th-of-july-grilling-supplies','I':'https://images.surferseo.art/c120d9b6-3af2-4550-8922-ddcbea7c0e89.jpeg'},
{'L':'https://ddrbbqsupply.com/blogs/news/must-have-4th-of-july-grilling-supplies','I':'https://images.surferseo.art/d5694b13-a445-41bd-a535-488e7d6b9892.jpeg'},
{'L':'https://ddrbbqsupply.com/blogs/news/must-have-4th-of-july-grilling-supplies','I':'https://images.surferseo.art/0fdbd453-c3f6-4ccc-81a1-5dab2fc3df48.jpeg'},
{'L':'https://ddrbbqsupply.com/blogs/news/must-have-4th-of-july-grilling-supplies','I':'https://images.surferseo.art/8d09f994-ffbf-451b-8e6d-63c3ac0f86ef.jpeg'},
{'L':'https://ddrbbqsupply.com/blogs/news/must-have-4th-of-july-grilling-supplies','I':'https://images.surferseo.art/648e4622-a5e5-412e-a0b5-dab5dcca23e3.jpeg'},
{'L':'https://ddrbbqsupply.com/blogs/news/must-have-4th-of-july-grilling-supplies','I':'https://images.surferseo.art/c45a07df-1c84-4a25-8c60-c84724447a33.jpeg'},
{'L':'https://ddrbbqsupply.com/blogs/news/must-have-4th-of-july-grilling-supplies','I':'https://images.surferseo.art/b8a61834-4824-4498-b382-2392605132c4.jpeg'},
{'L':'https://ddrbbqsupply.com/blogs/news/must-have-4th-of-july-grilling-supplies','I':'https://images.surferseo.art/34a395c8-6905-4900-94f7-279e54f222de.jpeg'},
{'L':'https://ddrbbqsupply.com/blogs/news/must-have-4th-of-july-grilling-supplies','I':'https://images.surferseo.art/e20fea08-dcf2-4814-aa5e-07d63730a48b.jpeg'},
{'L':'https://ddrbbqsupply.com/blogs/news/perfect-pairings-top-9-sides-to-bring-out-the-best-in-your-brisket','I':'https://images.surferseo.art/4ba4a925-3563-4c0b-bfb1-2727a568acf2.jpeg'},
{'L':'https://ddrbbqsupply.com/blogs/news/perfect-pairings-top-9-sides-to-bring-out-the-best-in-your-brisket','I':'https://images.surferseo.art/9e04f7d7-dc2e-48ac-8053-981af4ac42dd.webp'},
{'L':'https://ddrbbqsupply.com/blogs/news/perfect-pairings-top-9-sides-to-bring-out-the-best-in-your-brisket','I':'https://images.surferseo.art/4516b7b6-20e5-4b82-9179-611f3c145348.jpeg'},
{'L':'https://ddrbbqsupply.com/blogs/news/perfect-pairings-top-9-sides-to-bring-out-the-best-in-your-brisket','I':'https://images.surferseo.art/6540d71b-5026-41e0-a1f0-bb86d022cf3f.jpeg'},
{'L':'https://ddrbbqsupply.com/blogs/news/perfect-pairings-top-9-sides-to-bring-out-the-best-in-your-brisket','I':'https://images.surferseo.art/3d2535f5-43be-4ff8-975d-3e4d40998852.jpeg'},
{'L':'https://ddrbbqsupply.com/blogs/news/perfect-pairings-top-9-sides-to-bring-out-the-best-in-your-brisket','I':'https://images.surferseo.art/9ae84d49-3fda-4ddd-9c6e-8d1d859aa6a5.jpeg'},
{'L':'https://ddrbbqsupply.com/blogs/news/perfect-pairings-top-9-sides-to-bring-out-the-best-in-your-brisket','I':'https://images.surferseo.art/d2ac5c59-1777-4d57-9bc6-39bbce6f41be.jpeg'},
{'L':'https://ddrbbqsupply.com/blogs/news/perfect-pairings-top-9-sides-to-bring-out-the-best-in-your-brisket','I':'https://images.surferseo.art/e3a4c6b8-0a02-4e7a-aba0-351961faf355.jpeg'},
{'L':'https://ddrbbqsupply.com/blogs/news/texas-pepper-jelly-rib-candy-all-sweet-no-heat-flavors','I':'https://images.surferseo.art/c7963f11-1dfa-42cd-a97a-cf2861660d20.jpeg'},
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