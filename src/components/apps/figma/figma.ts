// DefaultApp.ts
import { html, css } from 'lit';
import { customElement, state, property} from 'lit/decorators.js';

import { basic, styles } from './styles';

// utils imports
import { StyledElement } from '../../../utils/globalStyledElement';

import '../default/default';



@customElement('figma-app')
export class Figma extends StyledElement {
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

  static styles = css`
    /* DefaultApp.scss styles go here */
  `;

  render() {
    return html`
      <div class="c-app">
        <default-app-component name="${this.name}"></default-app-component>
      </div>
    `;
  }

}
