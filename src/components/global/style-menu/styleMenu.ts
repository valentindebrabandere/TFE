// style-menu-component.ts
import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

import "./style.css"

@customElement('style-menu-component')
export class StyleMenu extends LitElement {
  
  constructor() {
    super();
  }

  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <div class="c-style-menu c-style-menu--hidden">
        <div class="c-style-menu__item-container">
          <p class="c-style-menu__date c-style-menu__item c-style-menu__item--hidden ">...</p>
        </div>
        <div class="c-style-menu__item-container">
          <h2 class="c-style-menu__name c-style-menu__item c-style-menu__item--hidden ">...</h2>
        </div>
        <div class="c-style-menu__item-container">
          <p class="c-style-menu__chapter c-style-menu__item c-style-menu__item--hidden ">...</p>
        </div>
      </div>
    `;
  }
}
