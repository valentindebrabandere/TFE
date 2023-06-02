import { html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { getApplicationByID } from '../../../utils/appManager';

import { StyledElement } from '../../../utils/globalStyledElement.ts';
import { openedAppsSubject, focusedAppUuidSubject } from '../../../utils/openedAppsProvider.ts';

@customElement('app-icon-component')
export class AppIcon extends StyledElement {
  @property({ type: String }) name: string = '';
  @state() currentStyle = "";
  @state() isActive = false;

  constructor() {
    super();
    this.classList.add('c-appicon');
    this.updateStyles();

    // update the active state of the app based on the opened apps
    openedAppsSubject.subscribe((openedApps) => {
      this.isActive = !!openedApps.find(openedApp => openedApp.id === this.name);
    });
  }

  openApp() {
    const app = getApplicationByID(this.name);
    const openedApps = openedAppsSubject.getValue();
  
    // Check if the app is already open
    const openedApp = openedApps.find(openedApp => openedApp.id === app.name);
  
    if (openedApp) {
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
  
  updateStyles() {
    //select the current style (globalStyledElement.ts)
    this.currentStyle = this.globalStyleController.style;
  }

  render() {
    const iconPath = getApplicationByID(this.name).icon(this.currentStyle);
    const appClass = this.isActive ? 'c-dock__app active' : 'c-dock__app';

    if (this.isActive){
      this.classList.add('active');
    }
    else{
      this.classList.remove('active');
    }

    return html`
      <div
        class="${appClass}"
        data-application-name="${this.name}"
        @click="${this.openApp}"
      >
        <img src="${iconPath}" class="c-dock__icon" alt="App Icon" />
      </div>
    `;
  }
}
