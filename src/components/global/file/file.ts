// file-component.ts
import { html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { getApplicationByID } from '../../../utils/appManager';

import { StyledElement } from '../../../utils/globalStyledElement.ts';
import { openedAppsSubject } from '../../../utils/openedAppsProvider.ts';

import { basic, styles } from './styles.ts';

@customElement('file-component')
export class FileComponent extends StyledElement {
  @property({ type: String }) appname: string = '';
  @property({ type: String }) filelink: string = '';

  @state() styles = [basic, css``];

  constructor() {
    super();
    this.classList.add('c-file');
    this.updateStyles();
  }

  //need to be called to change the style
  updateStyles() {
    //select the current style (globalStyledElement.ts)
    this.styles = this.applyStyles(styles, basic);
  }

  openApp() {
    const app = getApplicationByID(this.appname);
    const openedApps = openedAppsSubject.getValue();
  
    // Check if the app is already open
    const appIsOpen = openedApps.some(openedApp => openedApp.id === app.name);
  
    if (appIsOpen) {
      console.log(`${app.name} focused`);
    } else {
      const openAppEvent = new CustomEvent('addOpenedApp', {
        detail: { id: app.name, component: app.component, filelink: this.filelink },
        bubbles: true,
        composed: true,
      });
      this.dispatchEvent(openAppEvent);
    }
  }

  render() {
    const currentStyle = this.globalStyleController.style;
    const app = getApplicationByID(this.appname);
    const fileIconPath = app.fileIcon ? app.fileIcon(currentStyle) : app.icon(currentStyle);

    return html`
      <style>
          /* Import the good style */
          ${this.styles}
      </style>
      <div
        class="c-file"
        data-application-name="${this.appname}"
        @click="${this.openApp}"
      >
        <img src="${fileIconPath}" class="c-file__icon" alt="File Icon" />
      </div>
    `;
  }
}
