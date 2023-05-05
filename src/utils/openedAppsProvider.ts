import { LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BehaviorSubject } from 'rxjs';

interface OpenedApp {
  id: string;
  component: any;
}

export const openedAppsSubject = new BehaviorSubject<OpenedApp[]>([]);

export function addNewOpenedApp(id: string, component: any) {
  console.log('addNewOpenedApp called', id, component)
  const currentApps = openedAppsSubject.getValue();
  openedAppsSubject.next([...currentApps, { id, component }]);
}

export function removeOpenedApp(id: string) {
  const currentApps = openedAppsSubject.getValue();
  openedAppsSubject.next(currentApps.filter((app) => app.id !== id));
}

@customElement('opened-apps-provider')
export class OpenedAppsProvider extends LitElement {
  constructor() {
    super();
    this.handleAddOpenedApp = this.handleAddOpenedApp.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('addOpenedApp', this.handleAddOpenedApp as EventListener);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('addOpenedApp', this.handleAddOpenedApp as EventListener);
  }

  handleAddOpenedApp(e: CustomEvent<{ id: string; component: any }>) {
    addNewOpenedApp(e.detail.id, e.detail.component);
    console.log('handleAddOpenedApp called', e.detail);
  }
}
