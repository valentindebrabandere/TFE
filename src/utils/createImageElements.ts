// function to create image elements from an image object
// Used into components to create the image elements
import { GlobalStyleController } from './styleController';

interface ImageObject {
    [key: string]: { [key: string]: string };
}

export function createImageElements(images: ImageObject, currentStyle: string): { [key: string]: HTMLImageElement } {
    const imageElements: { [key: string]: HTMLImageElement } = {};
  
    Object.keys(images).forEach((imageName) => {
      const imageStyles = images[imageName];
      const img = new Image();
      img.src = imageStyles[currentStyle];
      imageElements[imageName] = img;
    });
  
    return imageElements;
}

export function initializeImageElements(
  images: ImageObject,
  currentStyle: string,
  globalStyleController: GlobalStyleController
): { [key: string]: HTMLImageElement } {
  const imageElems = createImageElements(images, currentStyle);

  // Add a new element to the GlobalStyleController elements array and listen for the 'style-changed' event
  const styleChangeListener = document.createElement('div');
  globalStyleController.elements.push(styleChangeListener);
  styleChangeListener.addEventListener('style-changed', () => {
    globalStyleController.updateImageElements(images, imageElems);
  });

  return imageElems;
}