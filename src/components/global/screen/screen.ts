import { html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { Notif } from "../../global/notif/notif";

import "../menu/menu";
import "../openedApps/openedApps";
import "../notif/notif";
import "../dock/dock";
import "../desktop/desktop";

// utils imports
import { StyledElement } from "../../../utils/globalStyledElement";
import { getApplicationByID } from "../../../utils/appManager";

@customElement("screen-component")
export class Screen extends StyledElement {
  @state() currentStyle = "";

  constructor() {
    super();
    this.classList.add("c-screen__container");
  }

  connectedCallback() {
    super.connectedCallback();
    this.updateStyles();
    this.notifCheck();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  //need to be called to change the style
  updateStyles() {
    //select the current style (globalStyledElement.ts)
    this.currentStyle = this.globalStyleController.style;
  }

  notifCheck() {
    if (this.currentStyle === "skeuo") {
      setTimeout(() => {
        if (this.currentStyle !== "skeuo") return;
        let newNotif = Notif.createNewNotification(
          "Messages",
          "Steve - Boulot vous a envoyé un message vocal",
          "/content/skeuo/messages/messagesNotif.json"
        );
        let display = document.querySelector(".c-notif-container");
        display?.appendChild(newNotif);
      }, 20000);
    }

    if (this.currentStyle === "flat") {
      setTimeout(() => {
        const app = getApplicationByID("FaceTime");
    const openAppEvent = new CustomEvent('addOpenedApp', {
      detail: {
        id: app.name,
        component: app.component,
        filelink: "/content/flat/faceTime/appelVideo.mp4",
        childItems: "",
        top: 5, 
        left: 40
      },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(openAppEvent);
      }, 1000);
    }
  }

  render() {
    this.updateStyles();

    return html`
      <div class="${this.currentStyle} c-screen js-screen">
        <link
          rel="stylesheet"
          href="/src/components/global/screen/screen.css"
        />
        <link
          rel="stylesheet"
          href="/src/components/global/screen/styles/${this.currentStyle}.css"
        />
        <div class="c-screen__overlay"></div>
        <menu-component></menu-component>
        <div class="c-display-container">
          <div class="c-notif-container"></div>
          <opened-apps-component></opened-apps-component>
          <desktop-component></desktop-component>
        </div>
        <dock-component></dock-component>
      </div>
    `;
  }
}
