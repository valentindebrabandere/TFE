import { html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import { basic, styles } from './styles.ts';

// utils imports
import { StyledElement } from '../../../utils/globalStyledElement.ts';
import { animDock } from './anim.ts';
import { dockApps, dockAppsActives } from "../../../utils/appManager.ts";


@customElement('dock-component')
export class DockComponent extends StyledElement {

  @state() styles = [basic, css``];

  async firstUpdated() {
    await this.updateComplete;
    animDock();
  }

  async connectedCallback() {
    super.connectedCallback();
    await this.updateComplete;
    this.updateStyles();
  }

  //need to be called to change the style
  updateStyles() {
    //select the current style (globalStyledElement.ts)
    this.styles = this.applyStyles(styles, basic);
    animDock();
  }

  render() {

    return html`
      <style>
        /* Import the good style */
        ${this.styles}
      </style>
      <div class="c-dock js-dock">
        <div class="c-dock__static js-dock__static">
          ${dockApps.map((app) => html`
            <app-icon-component name=${app.name}/>
          `)}
        </div>
        <div class="c-dock__active js-dock__active">
          ${dockAppsActives.map((app) => html`
              <app-icon-component name=${app.name}/>
            `)}
        </div>
      </div>
    `;
  }
}
