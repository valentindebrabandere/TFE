import { html, css } from 'lit';
import { customElement, state, property } from 'lit/decorators.js';
import Papa from 'papaparse';

import { StyledElement } from '../../../utils/globalStyledElement';

import { basic, styles } from './styles';

@customElement('mail-component')
export class Mail extends StyledElement {
  @property({ type: String, attribute: 'filelink' }) filelink: string | undefined;

  @state() content: Array<Record<string, unknown>> = Array(20).fill(0).map(() => {
    let record: Record<string, unknown> = {};
    for (let i = 0; i < 20; i++) {
      record[`column${i}`] = '';
    }
    return record;
  });
  @state() styles = [basic, css``]; // Update with styles for MailComponent

  connectedCallback() {
    super.connectedCallback();
    this.updateStyles();
    this.classList.add('c-mail');
    this.classList.add('c-app');
    if (this.filelink) {
      this.fetchFileContent(this.filelink);
    }
  }

  //need to be called to change the style
  updateStyles() {
    //select the current style (globalStyledElement.ts)
    this.styles = this.applyStyles(styles, basic); // Update with styles for MailComponent
  }

  async updated(changedProperties: Map<string, any>) {
    if (changedProperties.has('filelink')) {
      if (this.filelink === undefined) {
        return;
      }
      this.content = await this.fetchFileContent(this.filelink);
    }
  }

  async fetchFileContent(filelink: string): Promise<Array<Record<string, unknown>>> {
    if (!filelink) return this.content;

    try {
      const response = await fetch(filelink);
      const csvContent = await response.text();
      const parsedContent = Papa.parse(csvContent, { header: true });
      return parsedContent.data as Array<Record<string, unknown>>; // Explicitly cast to the expected type
    } catch (error) {
      return this.content;
    }
  }

  render() {
    // create an mail app
    return html`
      <style>
        /* Import the good style */
        ${this.styles}
      </style>
      
    `;
  }
}
