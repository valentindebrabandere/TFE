// MailItemComponent.ts
import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import {formatDate} from "./formatDate";


@customElement("mail-item-component")
export class MailItemComponent extends LitElement {
  @property({ type: Object }) mail = {
    object: "",
    content: "",
    from: "",
    date: "",
    hour: "",
  };
  @property({ type: Boolean, reflect: true }) read = false;

  connectedCallback(): void {
    super.connectedCallback();
    this.classList.add("c-mail-item");
  }

  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <div class="c-mail-item__head">
        <p class="c-mail-item__from">${this.mail.from}</p>
        <p class="c-mail-item__date">${this.mail.hour} - ${formatDate(this.mail.date)}</p>
      </div>
      <h4 class="c-mail-item__object">${this.mail.object}</h4>
      <p class="c-mail-item__content">
        ${this.mail.content || "(No preview available)"}
      </p>
    `;
  }
}
