// Finder.ts
import { html, css } from 'lit';
import { customElement, state, property } from 'lit/decorators.js';

import { basic, styles } from './styles';
import { StyledElement } from '../../../utils/globalStyledElement';

import type { FileItem } from '../../global/file/file.ts';

@customElement('finder-component')
export class Finder extends StyledElement {
  @property({ type: String, attribute: 'filelink' }) filelink: string|undefined;
  @property({ type: Array }) childItems: FileItem[] = [];
  @state() styles = [basic, css``];

  constructor() {
    super();
    this.classList.add('c-finder');
  }

  connectedCallback() {
    super.connectedCallback();
    this.updateStyles();
  }
  
  //need to be called to change the style
  updateStyles() {
    //select the current style (globalStyledElement.ts)
    this.styles = this.applyStyles(styles, basic);
  }

  render() {
    return html`
      <style>
        ${this.styles}
      </style>
      <div class="finder__content">
        ${this.childItems.map(
          (item) => html`
            <file-component
              appname="${item.appname}"
              filename="${item.filename}"
              filelink="${item.filelink}"
              .childItems="${item.childItems}"
            ></file-component>
          `
        )}
      </div>
    `;
  }
}
