import { html } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import { animDock } from './anim.ts';
import '../appIcon/appIcon.ts';

// utils imports
import { StyledElement } from '../../../utils/globalStyledElement.ts';
import { getDockApps, dockAppsActives } from "../../../utils/appManager.ts";


@customElement('dock-component')
export class Dock extends StyledElement {

  @state() currentStyle = "";

  async firstUpdated() {
    await this.updateComplete;
    this.updateStyles();
  }

  async connectedCallback() {
    super.connectedCallback();
    await this.updateComplete;
    this.updateStyles();
  }

  //need to be called to change the style
  async updateStyles() {
    //select the current style (globalStyledElement.ts)
    this.currentStyle = this.globalStyleController.style;
    await this.updateComplete; // wait for any pending updates to complete
    animDock();
  }

  render() {
    const dockApps = getDockApps(this.globalStyleController.style);
    
    return html`
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
