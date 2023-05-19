import { html } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import '../menu/menu';
import  '../openedApps/openedApps';
import '../dock/dock';
import '../desktop/desktop';

// utils imports
import { StyledElement } from '../../../utils/globalStyledElement';


@customElement('screen-component')
export class Screen extends StyledElement {

  @state() currentStyle = "";

  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
  }

  disconnectedCallback() {
    super.disconnectedCallback();

  }

  //need to be called to change the style
  updateStyles() {
    //select the current style (globalStyledElement.ts)
    this.currentStyle = this.globalStyleController.style;
  }


  render() {
    this.updateStyles();
  
    return html`
      <div class="${this.currentStyle} c-screen js-screen">
        <link rel="stylesheet" href="/src/components/global/screen/screen.css">
        <link rel="stylesheet" href="/src/components/global/screen/styles/${this.currentStyle}.css">
        <div class="c-screen__overlay"></div>
        <menu-component></menu-component>
        <div class="o-container">
          <opened-apps-component></opened-apps-component>
          <desktop-component></desktop-component>
        </div>
        <dock-component></dock-component> 
      </div>
    `;
  }
  
}
