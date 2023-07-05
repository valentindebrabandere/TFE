// browser.ts
import { html, css } from "lit";
import { customElement, state, property } from "lit/decorators.js";

import { basic, styles } from "./styles";

// utils imports
import { StyledElement } from "../../../utils/globalStyledElement";
import { getApplicationByID } from "../../../utils/appManager";

@customElement("browser-component")
export class Browser extends StyledElement {
  @property({ type: String, attribute: "filelink" }) filelink:
    | string
    | undefined;
  @state() styles = [basic, css``];
  @state() currentStyle = "";
  static appName = "Browser";

  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
    this.updateStyles();
    this.classList.add("c-browser");
    this.classList.add("c-app");
  }

  //need to be called to change the style
  updateStyles() {
    //select the current style (globalStyledElement.ts)
    this.styles = this.applyStyles(styles, basic);
    this.currentStyle = this.globalStyleController.style;
  }

  getFileIcon(style: string) {
    if (this.filelink) {
      return this.filelink;
    }
    // If filelink is undefined, fall back to the default icon
    const fileIconPath = `/images/fileIcons/${style}/${Browser.name}.png`;
    return fileIconPath;
  }

  render() {
    const app = getApplicationByID("Browser");
    return html`
      <style>
        /* Import the good style */
        ${this.styles}
      </style>
      <!-- es6 if statement filelink undefied -->
      ${this.filelink
        ? html`
        <div class="c-browser__content">
          <iframe
              class="c-browser__iframe"
              src="${this.filelink}"
              frameborder="0"
              style="width: 100%; height: 100%;"
            ></iframe>
        </div>
        `
        : html`<div class="c-browser__no-content">
            <img src="${app.icon(this.currentStyle)}" alt="" />
            <h2>La page que vous essayez de rejoindre est inacessible</h2>
            <p>Veuillez-vous conecter à internet</p>
          </div>`}
    `;
  }
}
