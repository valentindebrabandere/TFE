import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('dynamic-element')
export class DynamicElement extends LitElement {
  @property({ type: Function }) componentClass: any;
  @property({ type: Object }) options: any = {};

  private componentAdded = false;

  createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    if (!this.componentAdded) {
      const instance = new this.componentClass();
      instance.filelink = this.options.filelink;
      instance.childItems = this.options.childItems;
      this.renderRoot.appendChild(instance);
      this.componentAdded = true;
    }    
  }  
}
