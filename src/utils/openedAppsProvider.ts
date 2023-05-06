// openedAppsProvider.ts
import { BehaviorSubject } from 'rxjs';

interface OpenedApp {
  id: string;
  component: any;
}

export const openedAppsSubject = new BehaviorSubject<OpenedApp[]>([]);

export function addNewOpenedApp(id: string, component: any) {
  const currentApps = openedAppsSubject.getValue();
  openedAppsSubject.next([...currentApps, { id, component }]);
}

export function removeOpenedApp(id: string) {
  const currentApps = openedAppsSubject.getValue();
  openedAppsSubject.next(currentApps.filter((app) => app.id !== id));
}

export const openedAppsProvider = {  
  handleAddOpenedApp(e: CustomEvent<{ id: string; component: any }>) {
    addNewOpenedApp(e.detail.id, e.detail.component);
  },
};

// Corrected reference to the handleAddOpenedApp function
window.addEventListener('addOpenedApp', openedAppsProvider.handleAddOpenedApp as EventListener);
