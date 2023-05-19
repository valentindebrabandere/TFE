import { html } from 'lit';
import { customElement } from 'lit/decorators.js';

import { animDock } from './anim.ts';
import '../appIcon/appIcon.ts';

// utils imports
import { StyledElement } from '../../../utils/globalStyledElement.ts';
import { dockApps, dockAppsActives, otherApps } from "../../../utils/appManager.ts";


// Create a dedicated event type
interface DockEventDetail {
  name: string;
}

type DockEvent = CustomEvent<DockEventDetail>;

@customElement('dock-component')
export class Dock extends StyledElement {

  constructor() {
    super();
    this.handleAddToDock = this.handleAddToDock.bind(this);
    this.handleRemoveFromDock = this.handleRemoveFromDock.bind(this);
  }

  async firstUpdated() {
    await this.updateComplete;
    animDock();
  }

  async connectedCallback() {
    super.connectedCallback();
    await this.updateComplete;
    this.updateStyles();
    this.addEventListener('addToDock', this.handleAddToDock as EventListener);
    this.addEventListener('removeFromDock', this.handleRemoveFromDock as EventListener);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('addToDock', this.handleAddToDock as EventListener);
    this.removeEventListener('removeFromDock', this.handleRemoveFromDock as EventListener);
  }

  handleAddToDock(e: DockEvent) {
    if (!dockAppsActives.find(app => app.name === e.detail.name)) {
      dockAppsActives.unshift({ name: e.detail.name });
      this.requestUpdate(); // force component to re-render
    }
}

  
  handleRemoveFromDock(e: DockEvent) {
    const index = dockAppsActives.findIndex(app => app.name === e.detail.name);
    if (index > -1) {
      dockAppsActives.splice(index, 1);
      this.requestUpdate(); // force component to re-render
    }
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
