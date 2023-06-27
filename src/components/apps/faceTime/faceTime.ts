import { html, css } from "lit";
import { customElement, state, property, query } from "lit/decorators.js";
import { getApplicationByID } from "../../../utils/appManager";

import { basic, styles } from "./styles";

// utils imports
import { StyledElement } from "../../../utils/globalStyledElement";

@customElement("face-time-component")
export class FaceTime extends StyledElement {
  @property({ type: String, attribute: "filelink" }) filelink:
    | string
    | undefined;

  @state() content: string = "";
  @state() styles = [basic, css``];
  @state() currentStyle = "";
  @state() callTime: string = '0:00';
  @state() callEnded: boolean = false;
  @state() callStarted: boolean = false;

  @query("#time") timeEl!: HTMLDivElement;
  @query("#endCallButton") endCallButton!: HTMLButtonElement;

  private startTime?: Date;
  private updateTimeInterval?: number;

  connectedCallback() {
    super.connectedCallback();
    this.updateStyles();
    this.classList.add("c-faceTime");
    this.classList.add("c-app");

    this.startCamera();
  }

  async startCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const video = this.querySelector('#faceTime-user');
      if (video instanceof HTMLVideoElement) {
        video.srcObject = stream;
        video.onloadedmetadata = (e) => {
          video.play();
          this.startCall();
        };
      }
    } catch (err) {
      console.error('Failed to start camera', err);
    }
  }

  startCall() {
    this.callStarted = true;
    this.startTime = new Date();
    this.updateTimeInterval = window.setInterval(() => {
      const diff = new Date().getTime() - this.startTime!.getTime();
      const seconds = diff / 1000;
      this.callTime = this.formatTime(seconds);
    }, 1000);
  }

  endCall() {
    if (this.updateTimeInterval !== undefined) {
      clearInterval(this.updateTimeInterval);
    }
    this.callStarted = false;
    this.callEnded = true;
    const video = this.querySelector('#faceTime-user');
    if (video instanceof HTMLVideoElement && video.srcObject) {
      const stream = video.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach((track) => {
        track.stop();
      });
      video.srcObject = null;
    }
  }

  firstUpdated() {
    this.endCallButton.addEventListener('click', () => {
      this.endCall();
    });
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
    return html`
      <style>
        ${this.styles}
      </style>
      ${this.filelink && !this.callEnded
        ? html`
          <video
            id="faceTime-user"
            class="c-faceTime__user"
          >
            <source class="" src="${this.filelink}" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <video
            id="faceTime"
            class="c-faceTime__content c-app__content"
            autoplay
          >
            <source class="" src="${this.filelink}" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div id="faceTime-controls" class="c-faceTime__controls c-app__controls">
            <div id="time" class="c-faceTime__controls-time">${this.callTime}</div>
            <button id="endCallButton" class="c-faceTime__controls-button">End Call</button>
          </div>
          `
        : this.callEnded
        ? html`<div>Call terminated</div>`
        : html`<div class="c-faceTime__no-content">
            <img src="${app.icon(this.currentStyle)}" alt="Aperçu Logo" />
            <h2>Pas d'appel Récent</h2>
            <p>Connectez vous à internet pour charger vos anciens appels</p>
          </div>`
      }
    `;
  }
}
