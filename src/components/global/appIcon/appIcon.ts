import { html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { getApplicationByID } from '../../../utils/appManager';

import { StyledElement } from '../../../utils/globalStyledElement.ts';
import { openedAppsSubject, focusedAppUuidSubject } from '../../../utils/openedAppsProvider.ts';


import { basic, styles } from './styles.ts';

@customElement('app-icon-component')
export class AppIcon extends StyledElement {
    @property({ type: String }) name: string = '';

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
    const openedApps = openedAppsSubject.getValue();
  
    // Check if the app is already open
    const openedApp = openedApps.find(openedApp => openedApp.id === app.name);
  
    if (openedApp) {
      console.log(`${app.name} focused`);
      // Set this app as the focused app
      focusedAppUuidSubject.next(openedApp.uuid);
    } else {
      const openAppEvent = new CustomEvent('addOpenedApp', {
        detail: { id: app.name, component: app.component },
        bubbles: true,
        composed: true,
      });
      this.dispatchEvent(openAppEvent);
    }
  }
  

  render() {
    const currentStyle = this.globalStyleController.style;
    const iconPath = getApplicationByID(this.name).icon(currentStyle);

    return html`
      <style>
          /* Import the good style */
          ${this.styles}
      </style>
      <div
        class="c-dock__app"
        data-application-name="${this.name}"
        @click="${this.openApp}"
      >
        <img src="${iconPath}" class="c-dock__icon" alt="App Icon" />
      </div>
    `;
  }
}
