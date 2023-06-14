// defaultAppsByStyle.ts
import { FileItem } from '../components/global/file/file';

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
// defaultAppsByStyle.set('grey', [
//   { id: 'Video', filelink: '/content/grey/desktop/test.mp4', childItems: [], top: 20, left: 35 },
// ]);

//Modern Mac
defaultAppsByStyle.set('modernMac', [
  { id: 'Finder', filelink: '/content/modernMac/desktop/desktopConfig.json', childItems: [], top: 20, left: 20 },
  { id: 'TextEdit', filelink: '/content/modernMac/desktop/hello.html', childItems: [], top: 10, left: 10 },
]);


export function getDefaultAppsForStyle(style: string) {
  return defaultAppsByStyle.get(style) || [];
}
