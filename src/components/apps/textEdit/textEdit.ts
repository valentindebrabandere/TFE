// DefaultApp.ts
import { html, css } from 'lit';
import { customElement, state, property } from 'lit/decorators.js';

import { basic, styles } from './styles';

// utils imports
import { StyledElement } from '../../../utils/globalStyledElement';

import '../default/default';

@customElement('text-edit-component')
export class TextEdit extends StyledElement {
  @property({ type: String }) appname: string;
  @property({ type: String, attribute: 'filelink' }) filelink: string|undefined;

  @state() content: string = '';
  @state() styles = [basic, css``];

  constructor() {
    super();
    this.appname = '';
  }

  connectedCallback() {
    console.log(this.filelink)
    super.connectedCallback();
    this.updateStyles();
    this.classList.add('c-text-edit');
  }

  //need to be called to change the style
  updateStyles() {
    //select the current style (globalStyledElement.ts)
    this.styles = this.applyStyles(styles, basic);
  }

  async updated(changedProperties: Map<string, any>) {
    if (changedProperties.has('fileLink')) {
      if (this.filelink === undefined) {
        return;
      }
      this.content = await this.fetchFileContent(this.filelink);
    }
  }

  async fetchFileContent(fileLink: string): Promise<string> {
    try {
      const response = await fetch(fileLink);
      const content = await response.text();
      return content;
    } catch (error) {
      console.error('Error fetching file content:', error);
      return '';
    }
  }

  render() {
    // create a text-edit app
    return html`
      <style>
        /* Import the good style */
        ${this.styles}
      </style>
        <textarea class="text-edit__editor" .value="${this.content}" placeholder="Type your text here..."></textarea>
    `;
  }
}
