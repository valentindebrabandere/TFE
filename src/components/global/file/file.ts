// file-component.ts
import { html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { getApplicationByID } from '../../../utils/appManager';

import { StyledElement } from '../../../utils/globalStyledElement.ts';
import { openedAppsSubject } from '../../../utils/openedAppsProvider.ts';

import { basic, styles } from './styles.ts';

@customElement('file-component')
export class File extends StyledElement {
  @property({ type: String }) appname: string = '';
  @property({ type: String }) filename: string = '';
  @property({ type: String }) filelink: string = '';

  @state() styles = [basic, css``];

  private differentIconDisplayApps = ['Aperçu'];

  constructor() {
    super();
    this.classList.add('c-file');
    this.setAttribute('data-drag', 'draggable');
    this.setAttribute('data-application-name', this.appname);
    this.updateStyles();
  }

  connectedCallback() {
    super.connectedCallback();
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

  customIcon() {
    let fileIconPath = this.filelink;
    console.log(fileIconPath)
    return fileIconPath;
  }
  

  defaultIcon(app: any) {
    const fileIconPath = `/images/fileIcons/${this.globalStyleController.style}/${app.name}.png`;
    return fileIconPath;
  }

  render() {
    const app = getApplicationByID(this.appname);

    let fileIconPath = '';

    // Check if the app is included in differentIconDisplayApps
    if (this.differentIconDisplayApps.includes(this.appname)) {
      fileIconPath = this.customIcon(); // Call the customIcon() method
    } else {
      fileIconPath = this.defaultIcon(app); // Call the defaultIcon() method
    }
    

    return html`
      <style>
        /* Import the good style */
        ${this.styles}
      </style>
      <img src="${fileIconPath}" @dblclick="${this.openApp}" class="c-file__icon" alt="File Icon" />
      <p class="c-file__name">${this.filename}</p>
    `;
  }
}
