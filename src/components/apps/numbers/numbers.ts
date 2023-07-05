import { html, css } from 'lit';
import { customElement, state, property } from 'lit/decorators.js';
import Papa from 'papaparse';

import { StyledElement } from '../../../utils/globalStyledElement';

import { basic, styles } from './styles';

@customElement('numbers-component')
export class Numbers extends StyledElement {
  @property({ type: String, attribute: 'filelink' }) filelink: string | undefined;

  @state() content: Array<Record<string, unknown>> = Array(20).fill(0).map(() => {
    let record: Record<string, unknown> = {};
    for (let i = 0; i < 20; i++) {
      record[`column${i}`] = '';
    }
    return record;
  });
  @state() styles = [basic, css``]; // Update with styles for NumbersComponent

  static appName = 'Numbers';

  connectedCallback() {
    super.connectedCallback();
    this.updateStyles();
    this.classList.add('c-numbers');
    this.classList.add('c-app');
    this.classList.add('c-app__content');
    if (this.filelink) {
      this.fetchFileContent(this.filelink);
    }
  }

  //need to be called to change the style
  updateStyles() {
    //select the current style (globalStyledElement.ts)
    this.styles = this.applyStyles(styles, basic); // Update with styles for NumbersComponent
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
    // create an numbers app
    return html`
      <style>
        /* Import the good style */
        ${this.styles}
      </style>
      <table class="c-numbers__table">
        <thead>
          <tr>
            ${Object.keys(this.content[0] || {}).map(
              header => html`<th contenteditable spellcheck=false>${header}</th>`
            )}
          </tr>
        </thead>
        <tbody>
          ${this.content.map(row =>
            html`
              <tr>
                ${Object.values(row).map(cell => html`<td contenteditable>${cell}</td>`)}
              </tr>
            `
          )}
        </tbody>
      </table>
    `;
  }
}
