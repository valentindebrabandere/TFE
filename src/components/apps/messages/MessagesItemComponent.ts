// MessagesItemComponent.ts
import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import {formatDate} from "./formatDate";


@customElement("messages-item-component")
export class MessagesItemComponent extends LitElement {
  @property({ type: Object }) messages = {
    object: "",
    content: "",
    from: "",
    date: "",
    hour: "",
  };
  @property({ type: Boolean, reflect: true }) read = false;

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
        <p class="c-messages-item__from">${this.messages.from}</p>
        <p class="c-messages-item__date">${this.messages.hour} - ${formatDate(this.messages.date)}</p>
      </div>
      <h4 class="c-messages-item__object">${this.messages.object}</h4>
      <p class="c-messages-item__content">
        ${this.messages.content || "(No preview available)"}
      </p>
    `;
  }
}
