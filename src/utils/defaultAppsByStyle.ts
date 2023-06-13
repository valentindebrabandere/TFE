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

defaultAppsByStyle.set('modernMac', [
  { id: 'Finder', filelink: '/content/modernMac/desktop/desktopConfig.json', childItems: [], top: 20, left: 20 },
  { id: 'TextEdit', filelink: '/content/modernMac/desktop/hello.html', childItems: [], top: 10, left: 10 },
]);

defaultAppsByStyle.set('oneBit', [
  { id: 'Aperçu', filelink: '/content/oneBit/desktop/entreprise/logo.png', childItems: [], top: 10, left: 10 },
  { id: 'TextEdit', filelink: '/content/oneBit/desktop/baby.html', childItems: [], top: 15, left: 35 },
]);

export function getDefaultAppsForStyle(style: string) {
  return defaultAppsByStyle.get(style) || [];
}
