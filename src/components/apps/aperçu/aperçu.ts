// Apercu.ts
import { html, css } from 'lit';
import { customElement, state, property } from 'lit/decorators.js';

import { basic, styles } from './styles';

// utils imports
import { StyledElement } from '../../../utils/globalStyledElement';

@customElement('aperçu-component')
export class Aperçu extends StyledElement {
  @property({ type: String, attribute: 'filelink' }) filelink: string|undefined;

  @state() content: string = '';
  @state() styles = [basic, css``];

  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
    this.updateStyles();
    this.classList.add('c-aperçu');
  }
  
  //need to be called to change the style
  updateStyles() {
    //select the current style (globalStyledElement.ts)
    this.styles = this.applyStyles(styles, basic);
  }

  getFileIcon(style: string) {
    if (this.filelink) {
      return this.filelink;
    }
    // If filelink is undefined, fall back to the default icon
    const fileIconPath = `/images/fileIcons/${style}/${Aperçu.name}.png`;
    return fileIconPath;
  }

  render() {
    // create a aperçu app
    return html`
      <style>
        /* Import the good style */
        ${this.styles}
      </style>
        <!-- es6 if statement filelink undefied -->
        ${this.filelink ? 
        html`<img class="c-apercu__content" src="${this.filelink}" alt="Preview" />` 
        : html`<div class="c-apecu__no-content">
          <h2>Pas de ficher ouvert</h2>
          <p>Ouvrez une image pour afficher un résultat</p>
        </div>`}
    `;
  }
}
