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
  { id: 'TextEdit', filelink: '/content/modernMac/desktop/hello.html', childItems: [] },
]);

defaultAppsByStyle.set('oneBit', [
  { id: 'Finder', filelink: '/content/oneBit/desktop/desktopConfig.json', childItems: [] },
]);

export function getDefaultAppsForStyle(style: string) {
  return defaultAppsByStyle.get(style) || [];
}
