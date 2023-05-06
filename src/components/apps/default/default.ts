// DefaultApp.ts
import { html, css } from 'lit';
import { customElement, state, property} from 'lit/decorators.js';

import { basic, styles } from './styles';

// utils imports
import { getApplicationByID } from '../../../utils/appManager';
import { StyledElement } from '../../../utils/globalStyledElement';


@customElement('default-app-component')
export class DefaultApp extends StyledElement {
  @property({ type: String }) name: string;

  @state() styles = [basic, css``];

  constructor() {
    super();
    this.name = '';
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
    const currentStyle = this.globalStyleController.style;
    const app = getApplicationByID(this.name);

    return html`
      <style>
        /* Import the good style */
        ${this.styles}
      </style>
      <div class="c-default">
        <img class="c-default__icon" src=${app.icon(currentStyle)} alt="App icon" />
        <h2 class="c-default__title">${this.name} application is updating</h2>
        <div class="c-default__animtxt">
          <p>Please wait </p>
          <span class="c-default__point c-default__point--1">.</span>
          <span class="c-default__point c-default__point--2">.</span>
          <span class="c-default__point c-default__point--3">.</span>
        </div>
      </div>
    `;
  }
}
