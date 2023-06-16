// MessagesItemComponent.ts
import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

export interface Chat {
  send: boolean;
  timestamp: string;
  content: string | null;
  fileType: 'image' | 'vocal' | 'video' | null;
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

  connectedCallback(): void {
    super.connectedCallback();
    this.classList.add("c-messages-item");
  }

  createRenderRoot() {
    return this;
  }

  render() {
    let content = html`<p>${this.chat.content || "(No content available)"}</p>`;

    if (this.chat.filelink) {
      switch (this.chat.fileType) {
        case 'image':
          content = html`<img class="c-message-item__image" src="${this.chat.filelink}" alt="Chat Image" />`;
          break;
        case 'vocal':
          content = html`<audio controls>
                            <source src="${this.chat.filelink}" type="audio/mpeg">
                            Your browser does not support the audio element.
                         </audio>`;
          break;
        case 'video':
          content = html`<video width="320" height="240" controls>
                            <source src="${this.chat.filelink}" type="video/mp4">
                            Your browser does not support the video tag.
                         </video>`;
          break;
        default:
          content = html`<p>Unsupported file type</p>`;
      }
    }

    return html`
      <div class="c-messages-item__content ${this.chat.send ? 'c-messages-item__content--send' : 'c-messages-item__content--received'}">
        ${content}
      </div>
    `;
  }
}
