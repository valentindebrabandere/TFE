// openedAppsProvider.ts
import { BehaviorSubject } from 'rxjs';
import { FileItem } from '../components/global/file/file';

export interface OpenedApp {
  id: string;
  component: any;
  filelink?: string;
  childItems?: FileItem[];
}

export const openedAppsSubject = new BehaviorSubject<OpenedApp[]>([]);

export function addNewOpenedApp(id: string, component: any, filelink?: string, childItems?: FileItem[]) {
  const currentApps = openedAppsSubject.getValue();
  openedAppsSubject.next([...currentApps, { id, component, filelink, childItems }]);
}

export function removeOpenedApp(id: string) {
  const currentApps = openedAppsSubject.getValue();
  openedAppsSubject.next(currentApps.filter((app) => app.id !== id));
}

export const openedAppsProvider = {  
  handleAddOpenedApp(e: CustomEvent<{ id: string; component: any; filelink: string; childItems?: FileItem[] }>) {
    addNewOpenedApp(e.detail.id, e.detail.component, e.detail.filelink, e.detail.childItems);
  },
};

window.addEventListener('addOpenedApp', openedAppsProvider.handleAddOpenedApp as EventListener);
