import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const watchedFolder = '/Users/Valou/code/TFE/public/content/skeuo/messages/profilePictures';
const thumbnailsFolder = '/Users/Valou/code/TFE/public/content/skeuo/messages/profilePictures/thumb';
const thumbnailSize = 100;

// Delete existing thumbnails
fs.readdirSync(thumbnailsFolder).forEach(file => {
  const filePath = path.join(thumbnailsFolder, file);
  fs.unlinkSync(filePath);
});

// Create new thumbnails
fs.readdirSync(watchedFolder).forEach(file => {
  const filePath = path.join(watchedFolder, file);

  // Ensure the file is not a directory
  if (fs.lstatSync(filePath).isFile()) {
    sharp(filePath)
      .metadata()
      .then(({ width, height }) => {
        // Determine whether width or height is larger
        const maxSize = Math.max(width, height);

        // If width is larger, we'll scale based on width
        const options = (maxSize === width)
          ? { width: thumbnailSize }
          : { height: thumbnailSize };

        return sharp(filePath)
          .resize(options)
          .toFile(path.join(thumbnailsFolder, file));
      })
      .catch(err => console.error(err));
  }
});
