import { html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import { basic, styles } from './styles.ts';

// utils imports
import { StyledElement } from '../../../utils/globalStyledElement.ts';
import { animDock } from '../anim.ts';
import { dockApps, dockAppsActives } from "../../../utils/appManager.ts";


@customElement('dock-component')
export class DockComponent extends StyledElement {

  @state() styles = [basic, css``];

  firstUpdated() {
    animDock();
  }

  connectedCallback() {
    super.connectedCallback();
    this.updateStyles()
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
            <app-icon-component style="height: 100%;" name=${app.name} dock=${true} />
          `)}
        </div>
        <div class="c-dock__active js-dock__active">
          ${dockAppsActives.map((app) => html`
              <app-icon-component style="height: 100%;" name=${app.name} dock=${true} />
            `)}
        </div>
      </div>
    `;
  }
  // render() {
  //   const currentStyle = this.globalStyleController.style;

  //   return html`
  //     <style>
  //       /* Import the good style */
  //       ${this.styles}
  //     </style>
  //     <div class="c-dock js-dock">
  //       <div class="c-dock__static js-dock__static">
  //         <div
  //           data-application-name="Finder"
  //           class="c-dock__app js-dock__app c-dock__app--active"
  //         >
  //           <img
  //             class="c-dock__icon js-dock__icon"
  //             src="images/appIcons/${currentStyle}/finder.png"
  //           />
  //         </div>
  //         <div
  //           class="c-dock__app js-dock__app"
  //           data-application-name="System preferences"
  //         >
  //           <img
  //             class="c-dock__icon js-dock__icon"
  //             src="images/appIcons/${currentStyle}/preferences.png"
  //           />
  //         </div>
  //         <div
  //           data-application-name="App Store"
  //           class="c-dock__app js-dock__app"
  //         >
  //           <img
  //             class="c-dock__icon js-dock__icon"
  //             src="images/appIcons/${currentStyle}/appStore.png"
  //           />
  //         </div>
  //         <div data-application-name="Camera" class="c-dock__app js-dock__app">
  //           <img
  //             class="c-dock__icon js-dock__icon"
  //             src="images/appIcons/${currentStyle}/camera.png"
  //           />
  //         </div>
  //         <div data-application-name="Photos" class="c-dock__app js-dock__app">
  //           <img
  //             class="c-dock__icon js-dock__icon"
  //             src="images/appIcons/${currentStyle}/photo.png"
  //           />
  //         </div>
  //         <div class="c-dock__app js-dock__app" data-application-name="Mail">
  //           <img
  //             class="c-dock__icon js-dock__icon"
  //             src="images/appIcons/${currentStyle}/mail.png"
  //           />
  //         </div>
  //         <div
  //           class="c-dock__app js-dock__app"
  //           data-application-name="Calculator"
  //         >
  //           <img
  //             class="c-dock__icon js-dock__icon"
  //             src="images/appIcons/${currentStyle}/calculator.png"
  //           />
  //         </div>
  //         <div data-application-name="Chrome" class="c-dock__app js-dock__app">
  //           <img
  //             class="c-dock__icon js-dock__icon"
  //             src="images/appIcons/${currentStyle}/chrome.png"
  //           />
  //         </div>
  //         <div data-application-name="Figma" class="c-dock__app js-dock__app">
  //           <img
  //             class="c-dock__icon js-dock__icon"
  //             src="images/appIcons/${currentStyle}/figma.png"
  //           />
  //         </div>
  //       </div>
  //       <div class="c-dock__active js-dock__active">
  //         <div data-application-name="Trash" class="c-dock__app js-dock__app">
  //           <img
  //             class="c-dock__icon js-dock__icon"
  //             src="images/appIcons/${currentStyle}/trash.png"
  //           />
  //         </div>
  //       </div>
  //     </div>
  //   `;
  // }
}
