// MailItemComponent.ts
import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('mail-item-component')
export class MailItemComponent extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 10px;
      cursor: pointer;
      background-color: white;
      border-bottom: 1px solid #ddd;
    }
    :host([read]) {
      background-color: #ddd;
    }
  `;

  @property({ type: Object }) mail = {object:"string" , content:"string"};
  @property({ type: Boolean, reflect: true }) read = false;

  render() {
    return html`
      <div>
        <h4>${this.mail.object}</h4>
        <p>${this.mail.content || '(No preview available)'}</p>
      </div>
    `;
  }
}
