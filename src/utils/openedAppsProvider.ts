// openedAppsProvider.ts
import { BehaviorSubject } from 'rxjs';

interface OpenedApp {
  id: string;
  component: any;
  filelink?: string;
}

export const openedAppsSubject = new BehaviorSubject<OpenedApp[]>([]);

export function addNewOpenedApp(id: string, component: any, filelink?: string) {
  const currentApps = openedAppsSubject.getValue();
  openedAppsSubject.next([...currentApps, { id, component, filelink }]);
}

export function removeOpenedApp(id: string) {
  const currentApps = openedAppsSubject.getValue();
  openedAppsSubject.next(currentApps.filter((app) => app.id !== id));
}

// openedAppsProvider.ts
export const openedAppsProvider = {  
  handleAddOpenedApp(e: CustomEvent<{ id: string; component: any; filelink: string}>) {
    addNewOpenedApp(e.detail.id, e.detail.component, e.detail.filelink);
  },
};

window.addEventListener('addOpenedApp', openedAppsProvider.handleAddOpenedApp as EventListener);
