// function to create image elements from an image object
// Used into components to create the image elements

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