// preview.ts
import { html, css } from 'lit';
import { customElement, state, property } from 'lit/decorators.js';

import { basic, styles } from './styles';

// utils imports
import { StyledElement } from '../../../utils/globalStyledElement';
import { getApplicationByID } from "../../../utils/appManager";


@customElement('preview-component')
export class Preview extends StyledElement {
  @property({ type: String, attribute: 'filelink' }) filelink: string|undefined;

  @state() content: string = '';
  @state() styles = [basic, css``];
  @state() currentStyle = '';
  static appName = 'Preview';

  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
    this.updateStyles();
    this.classList.add('c-preview');
    this.classList.add('c-app');
  }
  
  //need to be called to change the style
  updateStyles() {
    //select the current style (globalStyledElement.ts)
    this.styles = this.applyStyles(styles, basic);
    this.currentStyle = this.globalStyleController.style;
  }

  getFileIcon(style: string) {
    if (this.filelink) {
      return this.filelink;
    }
    // If filelink is undefined, fall back to the default icon
    const fileIconPath = `/images/fileIcons/${style}/${Preview.name}.png`;
    return fileIconPath;
  }

  render() {
    // create a preview app
    const app = getApplicationByID("Preview");
    return html`
      <style>
        /* Import the good style */
        ${this.styles}
      </style>
        <!-- es6 if statement filelink undefied -->
        ${this.filelink ? 
        html`<img class="c-preview__content c-app__content" src="${this.filelink}" alt="Preview" />` 
        : html`<div class="c-preview__no-content">
          <img src="${app.icon(this.currentStyle)}" alt="Preview Logo" />
          <h2>Pas de ficher ouvert</h2>
          <p>Ouvrez une image pour afficher un résultat</p>
        </div>`}
    `;
  }
}
