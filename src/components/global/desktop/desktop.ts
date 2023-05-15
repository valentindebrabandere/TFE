import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

import type { FileItem } from '../file/file.ts';


@customElement('desktop-component')
export class Desktop extends LitElement {
  static styles = css`
    .c-desktop {
      position: absolute;
      display: block;
      height: 100%;
      width: 100%;
      padding: 0;
      pointer-events: none;
    }
  `;
  
  private desktopItems: FileItem[] = [];
  
  constructor() {
    super();
    this.classList.add('c-desktop');

    // Fetch the JSON file from the public folder
    fetch('/content/modernMac/desktop/desktopConfig.json')
      .then(response => response.json())
      .then(data => {
        this.desktopItems = data.childItems;
        this.requestUpdate();  // Update the component when the data is loaded
      });
  }

  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <style>
        ${Desktop.styles}
      </style>
      ${this.desktopItems.map(
        (item) => html`
          <file-component
            appname="${item.appname}"
            filename="${item.filename}"
            filelink="${item.filelink}"
            .childItems="${item.childItems}"
          ></file-component>
        `
      )}
    `;
  }
}
