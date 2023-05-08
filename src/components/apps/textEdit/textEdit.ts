// DefaultApp.ts
import { html, css } from 'lit';
import { customElement, state, property} from 'lit/decorators.js';

import { basic, styles } from './styles';

// utils imports
import { StyledElement } from '../../../utils/globalStyledElement';

import '../default/default';



@customElement('text-edit-component')
export class TextEdit extends StyledElement {
  @property({ type: String }) name: string;

  @state() styles = [basic, css``];

  constructor() {
    super();
    this.name = '';
  }

  connectedCallback() {
    super.connectedCallback();
    this.updateStyles();
    this.classList.add('c-text-edit');
  }

  //need to be called to change the style
  updateStyles() {
    //select the current style (globalStyledElement.ts)
    this.styles = this.applyStyles(styles, basic);
  }

  render() {
    // create a text-editEditeditEdite eddit app
    return html`
      <style>
        /* Import the good style */
        ${this.styles}
      </style>
        <textarea class="text-edit__editor" placeholder="Type your text here..."></textarea>
    `;
  }

}
