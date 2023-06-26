// openedAppsProvider.ts
import { BehaviorSubject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { FileItem } from '../components/global/file/file';
import { GlobalStyleController, addStyleChangedEventListener } from "./styleController";
import { getApplicationByID } from './appManager';
import { getDefaultAppsForStyle } from './defaultAppsByStyle';

export interface OpenedApp {
  id: string;
  component: any;
  uuid: string;
  top?: number;
  left?: number;
  filelink?: string;
  childItems?: FileItem[];
}

export const openedAppsSubject = new BehaviorSubject<OpenedApp[]>([]);
export const focusedAppUuidSubject = new BehaviorSubject<string>('');


export function addNewOpenedApp(id: string, component: any, filelink?: string, childItems?: FileItem[], top?: number, left?: number) {
  const currentApps = openedAppsSubject.getValue();
  const newApp = { id, component, uuid: uuidv4(), filelink, childItems, top, left };
  openedAppsSubject.next([...currentApps, newApp]);
  focusedAppUuidSubject.next(newApp.uuid);  // update the focused app
}

export function removeOpenedApp(uuid: string, name?: string) {
  const currentApps = openedAppsSubject.getValue();
  let appToRemove;
  if (name) {
    appToRemove = currentApps.find(app => app.id === name);
    if (!appToRemove) {
      console.error(`No app with name ${name} found`);
      return;
    }
    uuid = appToRemove.uuid;
  }
  else{
    appToRemove = currentApps.find(app => app.uuid === uuid);
  }
  
  if (!appToRemove) {
    console.error(`No app with uuid ${uuid} found`);
    return;
  }
  
  openedAppsSubject.next(currentApps.filter((app) => app.uuid !== uuid));
}

export const openedAppsProvider = {  
  handleAddOpenedApp(e: CustomEvent<{ id: string; component: any; filelink: string; childItems?: FileItem[] }>) {
    addNewOpenedApp(e.detail.id, e.detail.component, e.detail.filelink, e.detail.childItems);
  },
};

window.addEventListener('addOpenedApp', openedAppsProvider.handleAddOpenedApp as EventListener);

//Init change

const styleController = new GlobalStyleController();
var currentStyle = styleController.style;
onStyleChanged();

// Update the opened apps when the style changes

addStyleChangedEventListener(onStyleChanged);

function onStyleChanged() {
  currentStyle = styleController.style;
  openedAppsSubject.next([]);

  // Get the default apps for the new style.
  const defaultApps = getDefaultAppsForStyle(currentStyle);

  // Open each default app.
  defaultApps.forEach(appData => {
    const app = getApplicationByID(appData.id);
    addNewOpenedApp(appData.id, app.component, appData.filelink, appData.childItems, appData.top, appData.left);
  });
}

