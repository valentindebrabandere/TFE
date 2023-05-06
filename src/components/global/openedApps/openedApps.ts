import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { openedAppsSubject } from '../../../utils/openedAppsProvider'; 

import './assets/appIconImport';

interface OpenedApp {
  id: string;
  component: any;
}


@customElement('opened-apps-component')
export class OpenedApps extends LitElement {
  static styles = css`
    .c-opened-apps {
      position: absolute;
      display: block;
      height: 100%;
      width: 100%;
      z-index: 100;
      padding: 0;
    }
  `;
  
  private openedApps: OpenedApp[] = [];
  
  constructor() {
    super();
    openedAppsSubject.subscribe((apps) => {
      this.openedApps = apps;
      this.requestUpdate();
    });
    this.classList.add('c-opened-apps');
  }

  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      ${this.openedApps.map(
        (app) => html`
          <window-component>
            <dynamic-element .componentClass=${app.component}></dynamic-element>
          </window-component>
        `
      )}
    `;
  }
}