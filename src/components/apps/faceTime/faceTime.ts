import { html, css } from "lit";
import { customElement, state, property, query } from "lit/decorators.js";
import { getApplicationByID } from "../../../utils/appManager";

import { Notif } from "../../global/notif/notif";

import { basic, styles } from "./styles";

// utils imports
import { StyledElement } from "../../../utils/globalStyledElement";

@customElement("face-time-component")
export class FaceTime extends StyledElement {
  @property({ type: String, attribute: "filelink" }) filelink:
    | string
    | undefined;

  @property({ type: Boolean }) cameraAccessDenied = false;

  @state() contactName: string = "Anne";
  @state() contactPhoto: string = "/content/flat/faceTime/anne.png";

  @state() content: string = "";
  @state() styles = [basic, css``];
  @state() currentStyle = "";
  @state() callTime: string = "0:00";
  @state() callEnded: boolean = false;
  @state() callStarted: boolean = false;

  @state() ringtoneSource: string =
    "content/flat/faceTime/sound/ring.mp3";
  @state() enterCallSource: string =
    "content/flat/faceTime/sound/in.mp3";
  @state() endCallSource: string = "content/flat/faceTime/sound/out.mp3";

  @query("#time") timeEl!: HTMLDivElement;
  @query("#endCallButton") endCallButton!: HTMLButtonElement;

  private startTime?: Date;
  private updateTimeInterval?: number;
  private ringtone = new Audio(this.ringtoneSource);
  private enterCallSound = new Audio(this.enterCallSource);
  private endCallSound = new Audio(this.endCallSource);

  static appName = "FaceTime";

  connectedCallback() {
    super.connectedCallback();
    this.updateStyles();
    this.classList.add("c-faceTime");
    this.classList.add("c-app");
  }

  firstUpdated() {
    this.endCallButton.addEventListener("click", () => {
      this.endCall();
    });
    if (!this.filelink) {
      return;
    }
    this.preloadCamera(); // Preload the camera here
    this.ringtone.loop = true;
    this.ringtone.play();
  }

  stopVideoStreams() {
    const video = this.querySelector("#faceTime-user");
    if (video instanceof HTMLVideoElement && video.srcObject) {
        const stream = video.srcObject as MediaStream;
        const tracks = stream.getTracks();
        tracks.forEach((track) => {
            track.stop();
        });
        video.srcObject = null;
    }
}

disconnectedCallback() {
    super.disconnectedCallback();
    if (!this.filelink) {
        return;
    }
    this.ringtone.pause();
    this.ringtone.currentTime = 0;
    this.stopVideoStreams(); // Call it here
}
  async preloadCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const video = this.querySelector("#faceTime-user");
      if (video instanceof HTMLVideoElement) {
        video.srcObject = stream;
      }
    } catch (err) {
      console.error("Failed to preload camera", err);
      // Set state that camera is not accessible.
      this.cameraAccessDenied = true;
    }
  }

  async startCamera() {
    this.startCall();
    this.enterCallSound.play();
    this.ringtone.currentTime = 0;
    this.ringtone.pause();
    this.enterCallSound.play();
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const video = this.querySelector("#faceTime-user");
      if (video instanceof HTMLVideoElement) {
        video.srcObject = stream;
        video.onloadedmetadata = () => {
          video.play();
        };
      }
    } catch (err) {
      console.error("Failed to start camera", err);
    }
  }

  startCall() {
    const video = this.querySelector("#faceTime");
    if (video instanceof HTMLVideoElement) {
      video.play();

      video.onended = () => {
        this.endCall();
      };
    }
    this.callStarted = true;
    this.startTime = new Date();
    this.updateTimeInterval = window.setInterval(() => {
      const diff = new Date().getTime() - this.startTime!.getTime();
      const seconds = diff / 1000;
      this.callTime = this.formatTime(seconds);
    }, 1000);
  }

  endCall() {
    this.endCallSound.play();
    this.ringtone.currentTime = 0;
    this.ringtone.pause();
    if (this.updateTimeInterval !== undefined) {
      clearInterval(this.updateTimeInterval);
    }
    this.callStarted = false;
    this.callEnded = true;
    const videoCall = this.querySelector("#faceTime");
    if (videoCall instanceof HTMLVideoElement) {
      videoCall.pause();
    }
    const video = this.querySelector("#faceTime-user");
    if (video instanceof HTMLVideoElement && video.srcObject) {
      const stream = video.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach((track) => {
        track.stop();
      });
      video.srcObject = null;
    }
    this.notifCheck();
  }

  notifCheck() {
    //create a notification
    setTimeout(() => {
      let newNotif = Notif.createNewNotification(
        "Style",
        "Aller au style suivant",
        ""
      );
      let display = document.querySelector(".c-notif-container");
      //if .c-notif-container have children
      if (display?.children.length) {
        if (display?.children.length > 0) {
          return
        }
      }
      display?.appendChild(newNotif);
    }, 3000);
  }

  formatTime(time: number) {
    const minutes = Math.floor(time / 60);
    let seconds = Math.floor(time - minutes * 60);
    let secondsStr = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${minutes}:${secondsStr}`;
  }

  updateStyles() {
    this.styles = this.applyStyles(styles, basic);
    this.currentStyle = this.globalStyleController.style;
  }

  render() {
    const app = getApplicationByID("FaceTime");
    const videoOrPlaceholder = this.cameraAccessDenied
      ? html`<img
          data-drag="draggable-contain"
          class="c-faceTime__user"
          src="/content/flat/faceTime/default.png"
          alt="No camera access"
        />` // Add this line
      : html`
          <video
            data-drag="draggable-contain"
            id="faceTime-user"
            class="c-faceTime__user"
          >
            Your browser does not support the video tag.
          </video>
        `;

    return html`
      <style>
        ${this.styles}
      </style>

      <div
        class="c-facetime__call"
        style="display: ${!this.callStarted && !this.callEnded && this.filelink
          ? "flex"
          : "none"}"
      >
        <img
          class="o-fluidimage c-facetime__call-img"
          src="${this.contactPhoto}"
          alt="${this.contactName}"
        />
        <img
          class="o-fluidimage c-facetime__call-contact"
          src="${this.contactPhoto}"
          alt="${this.contactName}"
        />
        <h2 class="c-facetime__h2">${this.contactName} vous appelle...</h2>
        <div class="c-facetime__call-footer">
          <button class="c-facetime__btn" @click="${this.startCamera}">
            <img
              src="/content/flat/faceTime/accept.svg"
              alt="accept icon"
              class="c-facetime__btn-icon"
            />
            <p class="c-facetime__label">Accepter</p>
          </button>
          <button class="c-facetime__btn" @dblclick="${this.endCall}">
            <img
              src="/content/flat/faceTime/decline.svg"
              alt="accept icon"
              class="c-facetime__btn-icon"
            />
            <p class="c-facetime__label">Refuser</p>
          </button>
        </div>
      </div>

      <div
        style="display: ${this.callStarted && !this.callEnded
          ? "block"
          : "none"}"
      >
        ${videoOrPlaceholder}
        <video id="faceTime" class="c-faceTime__content c-app__content">
          <source class="" src="${this.filelink}" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div
          id="faceTime-controls"
          class="c-faceTime__controls c-app__controls"
        >
          <p id="time" class="c-faceTime__controls-time">${this.callTime}</p>
          <button
            id="endCallButton"
            class="c-facetime__btn"
            @click="${this.endCall}"
          >
            <img
              src="/content/flat/faceTime/decline.svg"
              alt="accept icon"
              class="c-facetime__btn-icon"
            />
          </button>
        </div>
      </div>

      <div
        class="c-facetime__call c-facetime__call--ended"
        style="display: ${!this.callStarted && this.callEnded
          ? "flex"
          : "none"}"
      >
        <img
          class="o-fluidimage c-facetime__call-img"
          src="${this.contactPhoto}"
          alt="${this.contactName}"
        />
        <img
          class="o-fluidimage c-facetime__call-contact"
          src="${this.contactPhoto}"
          alt="${this.contactName}"
        />
        <h2>L'appel avec ${this.contactName} est terminé</h2>
        <div class="c-facetime__call-footer">
          <p>Durée: ${this.callTime}</p>
        </div>
      </div>

      <div
        class="c-faceTime__no-content"
        style="display: ${!this.callStarted && !this.callEnded && !this.filelink
          ? "flex"
          : "none"}"
      >
        <img src="${app.icon(this.currentStyle)}" alt="Preview Logo" />
        <h2>Pas d'appel Récent</h2>
        <p>Connectez vous à internet pour charger vos anciens appels</p>
      </div>
    `;
  }
}
