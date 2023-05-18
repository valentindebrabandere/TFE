// file-component.ts
import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { getApplicationByID } from '../../../utils/appManager';

import { StyledElement } from '../../../utils/globalStyledElement.ts';

export interface FileItem {
  appname: string;
  filename: string;
  filelink: string;
  childItems?: FileItem[];
  position?: { top: number; left: number };
}

@customElement('file-component')
export class File extends StyledElement {
  @property({ type: String }) appname: string = '';
  @property({ type: String }) filename: string = '';
  @property({ type: String }) filelink: string = '';
  @property({ type: Array }) childItems: FileItem[] = []; // Change here
  

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

  openApp() {
    const app = getApplicationByID(this.appname);
    const openAppEvent = new CustomEvent('addOpenedApp', {
      detail: {
        id: app.name,
        component: app.component,
        filelink: this.filelink,
        childItems: this.childItems,
      },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(openAppEvent);
  }

  customIcon() {
    let fileIconPath = this.filelink;
    fileIconPath = fileIconPath.replace('desktopImages', 'desktopImages/thumb'); // replace part of the path
    return {
      path: fileIconPath,
      additionalClass: 'c-file__icon--image',
    };
  }
  
  

  defaultIcon(app: any) {
    const fileIconPath = `/images/fileIcons/${this.globalStyleController.style}/${app.name}.png`;
    return fileIconPath;
  }

  render() {
    const app = getApplicationByID(this.appname);
  
    let fileIconPath = '';
    let additionalClass = '';
  
    // Check if the app is included in differentIconDisplayApps
    if (this.differentIconDisplayApps.includes(this.appname)) {
      const customIconResult = this.customIcon();
      fileIconPath = customIconResult.path;
      additionalClass = customIconResult.additionalClass;
    } else {
      fileIconPath = this.defaultIcon(app); // Call the defaultIcon() method
    }
  
    return html`
      <img src="${fileIconPath}" @dblclick="${this.openApp}" class="c-file__icon ${additionalClass}" alt="File Icon" />
      <p class="c-file__name">${this.filename}</p>
    `;
  }
  
}
