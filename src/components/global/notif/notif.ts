//notif.ts
import { html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { getApplicationByID } from "../../../utils/appManager";

import { newStyleDisplay } from "../../../utils/newStyleDisplay.ts";
import { addNewOpenedApp } from "../../../utils/openedAppsProvider.ts";
import { stylesList } from "../../../utils/styleController.ts";

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

    this.classList.add("c-notif-component");

  }

  connectedCallback() {
    super.connectedCallback();
    this.updateStyles();
  
    // Force a layout paint
    void this.offsetWidth;
  
    // Apply the final translate state
    setTimeout(() => {
      this.style.transform = "translateX(0)";
      this.style.opacity = "1";
    }, 0);
  }
  
  handleClick() {
    const app = getApplicationByID(this.id);
    if (app) {
      if (this.filelink != "") {
        // If the notification is for an app with a filelink, open the app
        addNewOpenedApp(this.id, app.component, this.filelink);
      } else {
        // If the notification is for an app without a filelink

        //get the index of the current style
        let index = stylesList.findIndex((element) => element.call == this.currentStyle);
        let nextStyle = stylesList[index +1];

        newStyleDisplay(nextStyle);
        this.globalStyleController.changeStyle("next");
      }
    }
  }

  createNotification(id: string, message: string, filelink: string) {
    this.id = id;
    this.message = message;
    this.filelink = filelink;
  }

  static createNewNotification(id: string, message: string, filelink: string) {
    let newNotif = new Notif();
    newNotif.createNotification(id, message, filelink);
    newNotif.requestUpdate();
    return newNotif;
  }
  

  //need to be called to change the style
  updateStyles() {
    //select the current style (globalStyledElement.ts)
    this.currentStyle = this.globalStyleController.style;
  }

  render() {
    const iconPath = getApplicationByID(this.id).icon(this.currentStyle);

    this.updateStyles();
    return html`
      <div class="c-notif" @click=${this.handleClick}>
        <img src="${iconPath}" alt="" class="c-notif__appicon o-fluidimage" />
        <div class="c-notif__content">
          <div class="c-notif__header">
            <p class="c-notif__app">${this.id ? this.id : ""}</p>
            <p class="c-notif__time">A l'instant</p>
          </div>
          <p class="c-notif__message">${this.message}</p>
        </div>
      </div>
    `;
  }
}
