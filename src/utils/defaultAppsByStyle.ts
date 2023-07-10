// defaultAppsByStyle.ts
import { FileItem } from '../components/global/file/File';

interface AppData {
  id: string;
  filelink?: string;
  childItems?: FileItem[];
  top?: number; // percent
  left?: number; // percent
}

const defaultAppsByStyle = new Map<string, AppData[]>();

// Declare the default apps for each style here
//Odred of the apps guide the z-index first is on top

//One Bit
defaultAppsByStyle.set('oneBit', [
  { id: 'TextEdit', filelink: '/content/oneBit/desktop/baby.html', childItems: [], top: 20, left: 35 },
  { id: 'Aperçu', filelink: '/content/oneBit/desktop/entreprise/logo.png', childItems: [], top: 5, left: 2 },
]);

//Grey
defaultAppsByStyle.set('grey', [
  { id: 'Mail', filelink: '', childItems: [], top: 5, left: 10 },
  { id: 'Browser', filelink: '/content/grey/website/website.html', childItems: [], top: 2, left: 2 },
]);

//Skeuo
defaultAppsByStyle.set('skeuo', [
  { id: 'Aperçu', filelink: '/content/skeuo/desktop/desktopImages/bourse.png', childItems: [], top: 15, left: 8 },
  { id: 'Aperçu', filelink: '/content/skeuo/desktop/desktopImages/news2.png', childItems: [], top: 8, left: 60 },
  { id: 'Aperçu', filelink: '/content/skeuo/desktop/desktopImages/news.png', childItems: [], top: 2, left: 10 },
  { id: 'Messages', filelink: '', childItems: [], top: 5, left: 5 },
]);

//Flat
defaultAppsByStyle.set('flat', [
  { id: 'TextEdit', filelink: '/content/flat/desktop/recup.html', childItems: [], top: 18, left: 8 },
  { id: 'TextEdit', filelink: '/content/flat/desktop/avocats.html', childItems: [], top: 8, left: 30 },
  { id: 'Aperçu', filelink: '/content/flat/desktop/desktopImages/voleur.png', childItems: [], top: 12, left: 20 },
]);
//Modern Mac
defaultAppsByStyle.set('modernMac', [
  { id: 'TextEdit', filelink: '/content/modernMac/desktop/lettre.html', childItems: [], top: 10, left: 25 },
  { id: 'Aperçu', filelink: '/content/modernMac/desktop/desktopImages/Yuna 1.jpeg', childItems: [], top: 8, left: 8 },
  { id: 'Aperçu', filelink: '/content/modernMac/desktop/desktopImages/Yuna 8.jpeg', childItems: [], top: 5, left: 55 },
  { id: 'Aperçu', filelink: '/content/modernMac/desktop/desktopImages/Yuna 2.jpeg', childItems: [], top: 10, left: 25 },

]);


export function getDefaultAppsForStyle(style: string) {
  return defaultAppsByStyle.get(style) || [];
}
