// Video.ts
import { html, css } from "lit";
import { customElement, state, property, query } from "lit/decorators.js";
import { getApplicationByID } from "../../../utils/appManager";

import { basic, styles } from "./styles";

// utils imports
import { StyledElement } from "../../../utils/globalStyledElement";

@customElement("video-component")
export class Video extends StyledElement {
  @property({ type: String, attribute: "filelink" }) filelink:
    | string
    | undefined;

  @state() content: string = "";
  @state() styles = [basic, css``];
  @state() currentStyle = "";

  @query("#video") videoEl!: HTMLVideoElement;
  @query("#play-pause") playButtonEl!: HTMLButtonElement;

  @query("#progress") progressBarEl!: HTMLInputElement;
  @query("#time") timeEl!: HTMLDivElement;

  static appName = "Video";

  connectedCallback() {
    super.connectedCallback();
    this.updateStyles();
    this.classList.add("c-video");
    this.classList.add("c-app");
  }

  firstUpdated() {
    if (!this.filelink) return;
    this.playButtonEl.addEventListener("click", this.togglePlay.bind(this));
    this.videoEl.addEventListener(
      "timeupdate",
      this.updateProgressBar.bind(this)
    );
    this.progressBarEl.addEventListener("input", this.seek.bind(this));
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (!this.filelink) return;
    this.playButtonEl.removeEventListener("click", this.togglePlay.bind(this));
    this.videoEl.removeEventListener(
      "timeupdate",
      this.updateProgressBar.bind(this)
    );
    this.progressBarEl.removeEventListener("input", this.seek.bind(this));
  }

  updateProgressBar() {
    this.progressBarEl.value = String(
      (this.videoEl.currentTime / this.videoEl.duration) * 100
    );
    this.timeEl.innerText = `${this.formatTime(
      this.videoEl.currentTime
    )} / ${this.formatTime(this.videoEl.duration)}`;
  }

  seek() {
    this.videoEl.currentTime =
      (Number(this.progressBarEl.value) / 100) * this.videoEl.duration;
  }

  formatTime(time: number) {
    const minutes = Math.floor(time / 60);
    let seconds = Math.floor(time - minutes * 60);
    let secondsStr = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${minutes}:${secondsStr}`;
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
    const fileIconPath = `/images/fileIcons/${style}/${Video.name}.png`;
    return fileIconPath;
  }

  togglePlay() {
    if (this.videoEl.paused) {
      this.videoEl.play();
      this.playButtonEl.innerHTML = `<svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M10 4H6V20H10V4Z" fill="black" />
    <path d="M18 4H14V20H18V4Z" fill="black" />
  </svg>`;
    } else {
      this.videoEl.pause();
      this.playButtonEl.innerHTML = `<svg
  width="25"
  height="25"
  viewBox="0 0 25 25"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M5.12817 3.53174L19.1282 12.5317L5.12817 21.5317V3.53174Z"
    fill="black"
  />
</svg>`;
    }
  }

  render() {
    // create a video app
    const app = getApplicationByID("Video");
    return html`
      <style>
        /* Import the good style */
        ${this.styles}
      </style>
      <!-- es6 if statement filelink undefied -->
      ${this.filelink
        ? html`<video
              id="video"
              class="c-video__content c-app__content"
              autoplay
            >
              <source class="" src="${this.filelink}" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div id="video-controls" class="c-video__controls c-app__controls">
              <button id="play-pause" class="c-video__controls-play">
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.12817 3.53174L19.1282 12.5317L5.12817 21.5317V3.53174Z"
                    fill="black"
                  />
                </svg>
              </button>
              <input
                id="progress"
                class="c-video__controls-progress"
                type="range"
                min="0"
                max="100"
                value="0"
              />
              <div id="time" class="c-video__controls-time">0:00 / 0:00</div>
            </div>`
        : html`<div class="c-video__no-content">
            <img src="${app.icon(this.currentStyle)}" alt="Preview Logo" />

            <h2>Pas de ficher ouvert</h2>
            <p>Ouvrez une video pour afficher un résultat</p>
          </div>`}
    `;
  }
}
