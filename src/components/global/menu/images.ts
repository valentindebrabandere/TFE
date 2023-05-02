import { stylesList, currentStyle, GlobalStyleController } from '../../../utils/styleController';
import { initializeImageElements } from '../../../utils/createImageElements';

// import images in the different styles
import logoLoremIpsonOneBit from './assets/oneBit/logoLoremIpson.png';
import logoLoremIpsonModernMac from './assets/modernMac/logoLoremIpson.png';

import wifiIconOneBit from './assets/oneBit/wifiIcon.png';
import wifiIconModernMac from './assets/modernMac/wifiIcon.png';

import controlCenterIconOneBit from './assets/oneBit/controlCenterIcon.png';
import controlCenterIconModernMac from './assets/modernMac/controlCenterIcon.png';

import searchIconOneBit from './assets/oneBit/searchIcon.png';
import searchIconModernMac from './assets/modernMac/searchIcon.png';

interface ImageObject {
  [key: string]: { [key: string]: string };
}

// Create an object to store the image names and their styles
const images: ImageObject = {
  logoLoremIpson: {
    [stylesList[0].call]: logoLoremIpsonOneBit,
    [stylesList[1].call]: logoLoremIpsonModernMac,
  },
  wifiIcon: {
    [stylesList[0].call]: wifiIconOneBit,
    [stylesList[1].call]: wifiIconModernMac,
  },
  controlCenterIcon: {
    [stylesList[0].call]: controlCenterIconOneBit,
    [stylesList[1].call]: controlCenterIconModernMac,
  },
  searchIcon: {
    [stylesList[0].call]: searchIconOneBit,
    [stylesList[1].call]: searchIconModernMac,
  },
};

const globalStyleController = new GlobalStyleController(null, images, imageElements);

const imageElementsExport = initializeImageElements(images, currentStyle, globalStyleController);

export { imageElementsExport };
