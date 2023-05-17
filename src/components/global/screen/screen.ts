import { html } from 'lit';
import { customElement } from 'lit/decorators.js';

import '../menu/menu';
import  '../openedApps/openedApps';
import '../dock/dock';
import '../desktop/desktop';

// utils imports
import { StyledElement } from '../../../utils/globalStyledElement';


@customElement('screen-component')
export class Screen extends StyledElement {

  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
    this.classList.add('c-screen');
    
  }

  disconnectedCallback() {
    super.disconnectedCallback();

  }

  //need to be called to change the style
  updateStyles() {
    //select the current style (globalStyledElement.ts)
  }

  render() {
    this.updateStyles();

    const currentStyle = this.globalStyleController.style;

    return html`
      <link rel="stylesheet" href="./basic.css">
      <link rel="stylesheet" href="./${currentStyle}.css">
      <div class="c-screen__overlay">
      </div>
      <menu-component></menu-component>
      <div class="o-container">
        <opened-apps-component></opened-apps-component>
        <desktop-component></desktop-component>
      </div>
      <dock-component></dock-component> 
    `;
  }
}
