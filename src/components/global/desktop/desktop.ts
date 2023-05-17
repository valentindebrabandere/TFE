import { html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

import type { FileItem } from '../file/file.ts';
import { StyledElement } from '../../../utils/globalStyledElement.ts';
import '../file/file.ts';


@customElement('desktop-component')
export class Desktop extends StyledElement {

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
    this.updateStyles();
  }

    //need to be called to change the style
    updateStyles() {
      //select the current style (globalStyledElement.ts)
      const currentStyle = this.globalStyleController.style;
    
      // Fetch the JSON file from the public folder
      fetch(`/content/${currentStyle}/desktop/desktopConfig.json`)
        .then(response => {
          // Check if the response is ok (status in the range 200-299)
          if (!response.ok) {
            console.log("Desktop empty")
          }
          return response.json();
        })
        .then(data => {
          this.desktopItems = data.childItems || [];
          this.requestUpdate();  // Update the component when the data is loaded
        })
        .catch(error => {
          console.log("Desktop empty or not existing here", error);
          this.desktopItems = [];
          this.requestUpdate();
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
              style="top: ${item.position?.top}; left: ${item.position?.left};"
            />
          `
        )}
      `;
    }
}
