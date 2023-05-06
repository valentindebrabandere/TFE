// dynamic-element.ts
import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';


@customElement('dynamic-element')
export class DynamicElement extends LitElement {
  @property({ type: Object }) componentClass: any;

  connectedCallback() {
    super.connectedCallback();
    const instance = new this.componentClass();
    this.renderRoot.appendChild(instance);
  }
}
