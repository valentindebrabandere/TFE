import { html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { getApplicationByID } from "../../../utils/appManager";

import { StyledElement } from "../../../utils/globalStyledElement.ts";

export interface FileItem {
  appname: string;
  filename: string;
  filelink: string;
  childItems?: FileItem[];
  position?: { top: number; left: number };
}

@customElement("file-component")
export class FileComponent extends StyledElement {
  @property({ type: String }) appname: string = "";
  @property({ type: String }) filename: string = "";
  @property({ type: String }) filelink: string = "";
  @property({ type: Array }) childItems: FileItem[] = [];

  @state() selected = false;
  @state() opened = false;

  @state() currentStyle = "";

  private differentIconDisplayApps = ["Aperçu"];
  private defaultIconStyles = ["oneBit", "grey"];

  constructor() {
    super();
    this.classList.add("c-file");
    this.setAttribute("data-drag", "draggable");
    this.setAttribute("data-application-name", this.appname);
    this.updateStyles();
  
    this.addEventListener('select', () => {
      this.selected = true;
      this.requestUpdate();
    });
  
    this.addEventListener('open', () => {
      this.opened = true;
      this.requestUpdate();
    });
  
    this.addEventListener('deselect', () => {
      this.selected = false;
      this.opened = false;
      this.requestUpdate();
    });
  }
  
  

  connectedCallback() {
    super.connectedCallback();
    this.updateStyles();
  }

  openApp() {
    const app = getApplicationByID(this.appname);
    const openAppEvent = new CustomEvent('addOpenedApp', {
      detail: {
        id: app.appName,
        component: app.component,
        filelink: this.filelink,
        childItems: this.childItems,
      },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(openAppEvent);
  }

  select() {
    this.classList.add("selected");
    this.selected = true;
    this.requestUpdate();
  }
  
  deselect() {
    this.classList.remove("opened");
    this.classList.remove("selected");
    this.selected = false;
    this.opened = false;
    this.requestUpdate();
  }
  
  open() {
    this.classList.add("selected");
    this.classList.add("opened");
    this.openApp();
    this.opened = true;
    this.requestUpdate();
  }

  //need to be called to change the style
  updateStyles() {
    this.currentStyle = this.globalStyleController.style;
  }

  customIcon() {
    let fileIconPath = this.filelink;
    fileIconPath = fileIconPath.replace("desktopImages", "desktopImages/thumb");
    return {
      path: fileIconPath,
      additionalClass: "c-file__icon--image",
    };
  }

  defaultIcon(app: any) {
    const fileIconPath = `/images/fileIcons/${this.currentStyle}/${app.appName}.png`;
    return fileIconPath;
  }

  render() {
    const app = getApplicationByID(this.appname);

    let fileIconPath = "";
    let additionalClass = "";

    if (this.defaultIconStyles.includes(this.currentStyle) || !this.differentIconDisplayApps.includes(this.appname)) {
      fileIconPath = this.defaultIcon(app);
    } else {
      const customIconResult = this.customIcon();
      fileIconPath = customIconResult.path;
      additionalClass = customIconResult.additionalClass;
    }

    return html`
      <img
        src="${fileIconPath}"
        class="c-file__icon ${additionalClass}"
        alt="File Icon"
      />
      <p class="c-file__name">${this.filename}</p>
    `;
  }
}
