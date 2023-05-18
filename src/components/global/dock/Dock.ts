import { html } from 'lit';
import { customElement } from 'lit/decorators.js';

import { animDock } from './anim.ts';
import '../appIcon/appIcon.ts';

// utils imports
import { StyledElement } from '../../../utils/globalStyledElement.ts';
import { dockApps, dockAppsActives } from "../../../utils/appManager.ts";


@customElement('dock-component')
export class Dock extends StyledElement {

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
    animDock();
  }

  render() {

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
