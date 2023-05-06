import { html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { getApplicationByID } from '../../../utils/appManager';

import { StyledElement } from '../../../utils/globalStyledElement.ts';


import { basic, styles } from './styles.ts';

@customElement('app-icon-component')
export class Appicon extends StyledElement {
    @property({ type: String }) name: string = '';
    @property({ type: Boolean }) dock: boolean = false;

    @state() styles = [basic, css``];

  constructor() {
    super();
    this.classList.add('c-appicon');
    this.updateStyles();
  }

    //need to be called to change the style
  updateStyles() {
    //select the current style (globalStyledElement.ts)
    this.styles = this.applyStyles(styles, basic);
  }

  openApp() {
    const app = getApplicationByID(this.name);
    const openAppEvent = new CustomEvent('addOpenedApp', {
      detail: { id: app.name, component: app.component },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(openAppEvent);
  }

  render() {
    const currentStyle = this.globalStyleController.style;
    const iconPath = getApplicationByID(this.name).icon(currentStyle);

    return html`
        <style>
            /* Import the good style */
            ${this.styles}
        </style>
      ${this.dock
        ? html`
            <div
              class="c-dock__app"
              data-application-name="${this.name}"
              @click="${this.openApp}"
            >
              <img src="${iconPath}" class="c-dock__icon" alt="App Icon" />
            </div>
          `
        : html`
            <div
              class="c-desktop__app"
              data-application-name="${this.name}"
              @click="${this.openApp}"
            >
              <img src="${iconPath}" class="c-desktop__icon" alt="App Icon" />
            </div>
          `}
    `;
  }
}
