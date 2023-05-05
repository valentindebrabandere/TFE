import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { openedAppsSubject } from '../../../utils/openedAppsProvider'; 

interface OpenedApp {
  id: string;
  component: any;
}


@customElement('opened-apps-component')
export class OpenedApps extends LitElement {
  static styles = css`
  /* Add your styles here */
  `;
  
  private openedApps: OpenedApp[] = [];
  
  constructor() {
    super();
    openedAppsSubject.subscribe((apps) => {
      this.openedApps = apps;
      this.requestUpdate();
    });
  }

  render() {
    return html`
      ${this.openedApps.map(
        (app) => html`
          <window-component>
            <div slot="content">
              <${app.component.tagName}></${app.component.tagName}>
            </div>
          </window-component>
        `
      )}
    `;
  }
}
