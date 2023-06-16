// MessagesItemComponent.ts
import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import {formatDate} from "./formatDate";

@customElement("messages-item-component")
export class MessagesItemComponent extends LitElement {
  @property({ type: Object }) chat = {
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
    return html`
      <div class="c-messages-item__head">
        <p class="c-messages-item__from">${this.chat.send ? 'Me' : 'Them'}</p>
        <p class="c-messages-item__date">${formatDate(this.chat.timestamp)}</p>
      </div>
      <div class="c-messages-item__content">
        ${this.chat.content || "(No content available)"}
      </div>
    `;
  }
}
