import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('dynamic-element')
export class DynamicElement extends LitElement {
  @property({ type: Object }) componentClass: any;

  private componentAdded = false;

  createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    if (!this.componentAdded) {
      const instance = new this.componentClass();
      this.renderRoot.appendChild(instance);
      this.componentAdded = true;
    }
  }
}
