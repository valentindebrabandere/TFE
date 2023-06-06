import { html, css } from 'lit';
import { customElement, state, property } from 'lit/decorators.js';
import Papa from 'papaparse';

import { StyledElement } from '../../../utils/globalStyledElement';

import { basic, styles } from './styles';

@customElement('excel-component')
export class Excel extends StyledElement {
  @property({ type: String, attribute: 'filelink' }) filelink: string | undefined;

  @state() content: Array<Record<string, unknown>> = [{}];
  @state() styles = [basic, css``];  // Update with styles for ExcelComponent

  connectedCallback() {
    super.connectedCallback();
    this.updateStyles();
    this.classList.add('c-excel');
    if (this.filelink) {
      this.fetchFileContent(this.filelink);
    }
  }

  //need to be called to change the style
  updateStyles() {
    //select the current style (globalStyledElement.ts)
    this.styles = this.applyStyles(styles, basic);  // Update with styles for ExcelComponent
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
    if (!filelink) return [{}];
  
    try {
      const response = await fetch(filelink);
      const csvContent = await response.text();
      const parsedContent = Papa.parse(csvContent, { header: true });
      return parsedContent.data;
    } catch (error) {
      return [{}];
    }
  }

  render() {
    // create an excel app
    return html`
      <style>
        /* Import the good style */
        ${this.styles}
      </style>
      <table>
        <thead>
          <tr>
            ${Object.keys(this.content[0] || {}).map(header => html`<th>${header}</th>`)}
          </tr>
        </thead>
        <tbody>
          ${this.content.map(row => html`
            <tr>
              ${Object.values(row).map(cell => html`<td>${cell}</td>`)}
            </tr>
          `)}
        </tbody>
      </table>
    `;
  }
}
