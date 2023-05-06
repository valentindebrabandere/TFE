import { LitElement } from 'lit';
import { GlobalStyleController } from './styleController';

export class StyledElement extends LitElement {
  protected globalStyleController = new GlobalStyleController(this);

  connectedCallback() {
    super.connectedCallback();
    this.globalStyleController.elements.push(this);
    this.addEventListener('style-changed', this.onStyleChanged.bind(this));
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.globalStyleController.elements = this.globalStyleController.elements.filter(
      (el) => el !== this
    );
    this.removeEventListener('style-changed', this.onStyleChanged.bind(this));
  }

  onStyleChanged() {
    this.updateStyles();
  }

  updateStyles() {
    // This method should be implemented in the derived class
  }

  createRenderRoot() {
    return this;
  }

  applyStyles(stylesArray: any[], basicStyle: any) {
    const styleIndex = stylesArray.findIndex(
      (style) => style.styleName === this.globalStyleController.style
    );
    return [basicStyle, stylesArray[styleIndex].css];
  }
}
