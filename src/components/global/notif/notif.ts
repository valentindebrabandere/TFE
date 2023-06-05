import { html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { getApplicationByID } from '../../../utils/appManager';

import { addNewOpenedApp } from '../../../utils/openedAppsProvider.ts';


// utils imports
import { StyledElement } from "../../../utils/globalStyledElement";

@customElement("notif-component")
export class Notif extends StyledElement {
  @property() id: string;
  @property() message: string;
  @property() filelink: string;

  @state() currentStyle = "";


  constructor() {
    super();
    this.message = "";
    this.id = "";
    this.filelink = "";
  }

  connectedCallback() {
    super.connectedCallback();
    this.updateStyles();
  }

  handleClick() {
    const app = getApplicationByID(this.id);
    if(app) {
      if(this.filelink != "") {
        // If the notification is for an app with a filelink, open the app
        addNewOpenedApp(this.id, app.component, this.filelink);
      } else {
        // If the notification is for an app without a filelink
        this.globalStyleController.changeStyle("next");
      }
    }
  }

  createNotification(id: string, message: string, filelink: string) {
    this.id = id;
    this.message = message;
    this.filelink = filelink;
  }

  //need to be called to change the style
  updateStyles() {
    //select the current style (globalStyledElement.ts)
    this.currentStyle = this.globalStyleController.style;
  }

  render() {
    const iconPath = getApplicationByID(this.id).icon(this.currentStyle)

    this.updateStyles();
    return html`
      <div class="c-notif" @click=${this.handleClick}>
        <img src="${iconPath}" alt="" class="c-notif__appicon o-fluidimage">
        <div class="c-notif__content">
          <div class="c-notif__header">
            <p class="c-notif__app">${this.id ? this.id : ''}</p>
            <p class="c-notif__time">A l'instant</p>
          </div>
          <p class="c-notif__message">${this.message}</p>
        </div>
      </div>
    `;
  }
}
