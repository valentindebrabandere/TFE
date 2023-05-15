// file-component.ts
import { html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { getApplicationByID } from '../../../utils/appManager';

import { StyledElement } from '../../../utils/globalStyledElement.ts';

import { basic, styles } from './styles.ts';

export interface FileItem {
  appname: string;
  filename: string;
  filelink: string;
  childItems?: FileItem[];
}

@customElement('file-component')
export class File extends StyledElement {
  @property({ type: String }) appname: string = '';
  @property({ type: String }) filename: string = '';
  @property({ type: String }) filelink: string = '';
  @property({ type: Array }) childItems: FileItem[] = []; // Change here
  

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
    console.log(this.childItems)
    console.log(this.filename)
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
      <style>
        /* Import the good style */
        ${this.styles}
      </style>
      <img src="${fileIconPath}" @dblclick="${this.openApp}" class="c-file__icon ${additionalClass}" alt="File Icon" />
      <p class="c-file__name">${this.filename}</p>
    `;
  }
  
}
