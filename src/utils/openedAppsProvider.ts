// openedAppsProvider.ts
import { BehaviorSubject } from 'rxjs';

interface OpenedApp {
  id: string;
  component: any;
  filelink?: string;
}
interface DynamicElementHTMLElement extends HTMLElement {
  componentClass: any;
  options: { filelink?: string };
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
  handleAddOpenedApp(e: CustomEvent<{ id: string; component: any; filelink?: string }>) {
    const dynamicElement = document.createElement('dynamic-element') as DynamicElementHTMLElement;
    dynamicElement.componentClass = e.detail.component;
    dynamicElement.options = { filelink: e.detail.filelink };
    document.body.appendChild(dynamicElement);
    addNewOpenedApp(e.detail.id, dynamicElement, e.detail.filelink);
  },
};

window.addEventListener('addOpenedApp', openedAppsProvider.handleAddOpenedApp as EventListener);
