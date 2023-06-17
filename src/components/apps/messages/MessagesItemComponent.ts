// MessagesItemComponent.ts
import { html, LitElement, PropertyValues } from "lit";
import { customElement, property } from "lit/decorators.js";
import {
  createAudioElement,
  updateProgress,
  playOrPauseAudio,
} from "./audioUtils";

export interface Chat {
  send: boolean;
  timestamp: string;
  content: string | null;
  fileType: "image" | "vocal" | "video" | "text" | null;
  filelink: string | null;
}

@customElement("messages-item-component")
export class MessagesItemComponent extends LitElement {
  @property({ type: Object }) chat: Chat = {
    send: false,
    timestamp: "",
    content: null,
    fileType: null,
    filelink: null,
  };
  @property({ type: Boolean }) isPlaying = false;
  @property({ type: Number }) playbackProgress = 0;

  audio: HTMLAudioElement | undefined;

  connectedCallback(): void {
    super.connectedCallback();
    this.classList.add("c-messages-item");
    if (this.chat.fileType === "text") {
      this.classList.add("c-messages-item--text");
    }
    if (this.chat.fileType === "image") {
      this.classList.add("c-messages-item--image");
    }
    if (this.chat.fileType === "vocal") {
      this.classList.add("c-messages-item--vocal");
    }
    if (this.chat.send) {
      this.classList.add("c-messages-item--send");
    } else {
      this.classList.add("c-messages-item--receive");
    }
    if (this.chat.fileType === "vocal" && this.chat.filelink) {
      this.audio = createAudioElement(this.chat.filelink);
      this.audio.addEventListener("timeupdate", () =>
        this.updateAudioProgress()
      );
    }
  }

  updateAudioProgress(): void {
    if (this.audio) {
      this.playbackProgress = updateProgress(this.audio);
    }
  }

  play(): void {
    if (this.audio) {
      this.isPlaying = playOrPauseAudio(this.audio, this.isPlaying);
    }
  }

  updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);
    if (changedProperties.has("chat")) {
      this.classList.remove("c-messages-item--text");
      this.classList.remove("c-messages-item--image");
      this.classList.remove("c-messages-item--vocal");
      this.classList.remove("c-messages-item--send");
      this.classList.remove("c-messages-item--receive");
      if (this.chat.fileType === "text") {
        this.classList.add("c-messages-item--text");
      }
      if (this.chat.fileType === "vocal") {
        this.classList.add("c-messages-item--vocal");
      }
      if (this.chat.fileType === "image") {
        this.classList.add("c-messages-item--image");
      }
      if (this.chat.send) {
        this.classList.add("c-messages-item--send");
      } else {
        this.classList.add("c-messages-item--receive");
      }
    }
  }

  createRenderRoot() {
    return this;
  }

  showPreview(event: MouseEvent) {
    // Dispatch a custom event with the image source
    const imageSrc = (event.target as HTMLImageElement).src;
    this.dispatchEvent(
      new CustomEvent("showImagePreview", {
        detail: { imageSrc },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    let content = html`<p>${this.chat.content || "(No content available)"}</p>`;

    if (this.chat.filelink) {
      switch (this.chat.fileType) {
        case "image":
          content = html` <img
            class="c-messages-item__image"
            src="${this.chat.filelink}"
            alt="Chat Image"
            @click="${this.showPreview}"
          />`;
          break;
        case "vocal":
          content = html`
              <button class="c-message-vocal__button" @click="${this.play}">
                ${this.isPlaying
                  ? html` <svg
                      class="c-message-vocal__icon"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10 4H6V20H10V4Z"/>
                      <path d="M18 4H14V20H18V4Z"/>
                    </svg>`
                  : html`
                      <svg
                        class="c-message-vocal__icon"
                        viewBox="0 0 25 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5.12817 3.53174L19.1282 12.5317L5.12817 21.5317V3.53174Z"
                        />
                      </svg>
                    `}
              </button>

              <div class="c-message-vocal__progress-bar">
                <div
                  class="c-message-vocal__progress"
                  style="width: ${this.playbackProgress * 100}%"
                ></div>
              </div>
          `;
          break;
        case "video":
          content = html`<video
            class="c-messages-item__video"
            width="320"
            height="240"
            controls
          >
            <source src="${this.chat.filelink}" type="video/mp4" />
            Your browser does not support the video tag.
          </video>`;
          break;
        default:
          content = html`<p>Unsupported file type</p>`;
      }
    }

    return html` ${content} `;
  }
}
