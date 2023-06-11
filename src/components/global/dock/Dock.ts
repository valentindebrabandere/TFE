import { html } from "lit";
import { customElement, state } from "lit/decorators.js";

import { animDock } from "./anim.ts";
import "../appIcon/appIcon.ts";

// utils imports
import { StyledElement } from "../../../utils/globalStyledElement.ts";
import { getDockApps } from "../../../utils/appManager.ts";
import {
  getApplicationByID,
  dockAppsActives,
} from "../../../utils/appManager.ts";
import { eventBus } from "../../../utils/eventBus.ts";

@customElement("dock-component")
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

    eventBus.subscribe("windowHidden", (data: any) => {
      let app = getApplicationByID(data.id);
      // Create a copy of the app object with the uuid property
      app = {...app, uuid: data.uuid};
      dockAppsActives.unshift(app);
      app.isHidden = true;
      this.requestUpdate();
    });
    

    eventBus.subscribe("restoreWindow", (data: any) => {
      const index = dockAppsActives.findIndex(app => app.uuid === data.uuid);
      if (index !== -1) {
        dockAppsActives[index].isHidden = false; // If you want to update the isHidden property before removal
        dockAppsActives.splice(index, 1);
        this.requestUpdate(); // Trigger a re-render
      }
    });
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
          ${dockApps.map(
            (app) => html` <app-icon-component name=${app.name} /> `
          )}
        </div>
        <div class="c-dock__active js-dock__active">
          ${dockAppsActives.map((app) => {
            return app.name !== "Corbeille"
              ? html`
                  <app-icon-component
                    name=${app.name}
                    .uuid=${app.uuid}
                    .isHidden=${app.isHidden}
                  />
                `
              : html` <app-icon-component name=${app.name} /> `;
          })}
        </div>
      </div>
    `;
  }
}
