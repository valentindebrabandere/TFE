import { html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { Notif } from "../notif/Notif";

import "../menu/Menu";
import "../openedApps/openedApps";
import "../notif/Notif";
import "../dock/Dock";
import "../desktop/desktop";

import "./screenInterractions.js"


import "../../../main.scss"
import "./screen.css";

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

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  //need to be called to change the style
  updateStyles() {
    //select the current style (globalStyledElement.ts)
    this.currentStyle = this.globalStyleController.style;
    this.notifCheck();
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
        if (!display) return;
        if (display.children.length > 0) return;
        display?.appendChild(newNotif);
      }, 15000);
    }

    if (this.currentStyle === "flat") {
      setTimeout(() => {
        let call = document.querySelector("face-time-component")
        if (call) return;
        if (this.currentStyle !== "flat") return;
        const app = getApplicationByID("FaceTime");
        const openAppEvent = new CustomEvent("addOpenedApp", {
          detail: {
            id: app.appName,
            component: app.component,
            filelink: "/content/flat/faceTime/appelVideo.mp4",
            childItems: "",
            top: 5,
            left: 40,
          },
          bubbles: true,
          composed: true,
        });
        this.dispatchEvent(openAppEvent);
      }, 10000);
    }
  }

  render() {
    this.updateStyles();

    return html`
      <div class="${this.currentStyle} c-screen js-screen">
        <link
          rel="stylesheet"
          href="/screenStyles/${this.currentStyle}.css"
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
