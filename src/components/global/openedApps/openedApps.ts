import { LitElement, html, css } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import { customElement } from 'lit/decorators.js';
import { Subscription } from 'rxjs';
import { openedAppsSubject } from '../../../utils/openedAppsProvider'; 

import type { OpenedApp } from '../../../utils/openedAppsProvider';

import './assets/dynamicElement';

@customElement('opened-apps-component')
export class OpenedApps extends LitElement {

  
  static styles = css`
  .c-opened-apps {
    position: absolute;
    display: block;
    height: 100%;
    width: 100%;
    z-index: 100;
    padding: 0;
    pointer-events: none;
  }
  `;
  
  private subscription: Subscription;
  private openedApps: OpenedApp[] = [];
  
  constructor() {
    super();
    this.subscription = openedAppsSubject.subscribe((apps) => {
      this.openedApps = apps;
      this.requestUpdate();
    });
    this.classList.add('c-opened-apps');
  }

  disconnectedCallback() {
    this.subscription.unsubscribe();
    super.disconnectedCallback();
  }

  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <style>
        ${OpenedApps.styles}
      </style>
      ${repeat(
        this.openedApps,
        (app) => app.uuid, 
        (app, i) => html`
          <window-component .appUuid=${app.uuid} .windowNumber=${i}>
            <dynamic-element .componentClass=${app.component} .options=${{ filelink: app.filelink, childItems: app.childItems }}/>
          </window-component>
        `
      )}
    `;
  }  
  
}
