const currentStyle = 'modernMac';
const styles = ['oneBit', 'modernMac'];

import {createImageElements} from '../../../utils/createImageElements';

//To add new images add them to the images folder and import them here
//Then in const images make correspond the image name with the style

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
    [styles[0]]: logoLoremIpsonOneBit,
    [styles[1]]: logoLoremIpsonModernMac,
  },
  wifiIcon: {
    [styles[0]]: wifiIconOneBit,
    [styles[1]]: wifiIconModernMac,
  },
  controlCenterIcon: {
    [styles[0]]: controlCenterIconOneBit,
    [styles[1]]: controlCenterIconModernMac,
  },
  searchIcon: {
    [styles[0]]: searchIconOneBit,
    [styles[1]]: searchIconModernMac,
  },
};


  
const imageElements = createImageElements(images, currentStyle);
  

export { imageElements };
