// defaultAppsByStyle.ts
import { FileItem } from '../components/global/file/file';

interface AppData {
  id: string;
  filelink?: string;
  childItems?: FileItem[];
}

const defaultAppsByStyle = new Map<string, AppData[]>();

defaultAppsByStyle.set('modernMac', [
  { id: 'Finder', filelink: '/content/modernMac/desktop/desktopConfig.json', childItems: [] },
  { id: 'TextEdit', filelink: '/content/modernMac/documents/example.txt', childItems: [] },
]);
defaultAppsByStyle.set('oneBit', [
  { id: 'Corbeille', filelink: '/content/oneBit/desktop/desktopConfig.json', childItems: [] },
]);

export function getDefaultAppsForStyle(style: string) {
  return defaultAppsByStyle.get(style) || [];
}
