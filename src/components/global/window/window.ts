import { html, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';

// utils imports
import { StyledElement } from '../../../utils/globalStyledElement.ts';
import { removeOpenedApp } from '../../../utils/openedAppsProvider.ts'


@customElement('window-component')
export class Window extends StyledElement {

  @property({ type: String }) appUuid: string = '';
  @property({ type: Number }) windowNumber: number = 0;
  @property({ type: Boolean }) focused = false;

  private uuid: string = '';

  constructor() {
    super();
  }
  
  connectedCallback() {
    super.connectedCallback();
    this.updateStyles();
    this.classList.add('c-window');
    this.setAttribute('data-drag', 'draggable-dragger');
  }

  firstUpdated() {
    this.uuid = this.appUuid;
  
    const topOffset = (this.windowNumber * 5) % 100;
    const leftOffset = (this.windowNumber * 3) % 100;
    this.style.top = `${10+topOffset}%`;
    this.style.left = `${10+leftOffset}%`;
  }
  

  updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);
    if (changedProperties.has('appUuid')) {
      this.uuid = this.appUuid;
    }
    if (changedProperties.has('focused')) {
      if (this.focused) {
        this.style.zIndex = '200';  // Some high value to ensure it appears on top
      } else {
        this.style.zIndex = '100';  // Normal value
      }
    }
  }

  async handleQuitClick() {
    await this.updateComplete;
    //get attribute data-uiid
    removeOpenedApp(this.uuid);
  }
  
  handleHideClick() {
    console.log('hide window')
  }

  handleScaleClick() {
    console.log('scale window')
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    // Perform any necessary cleanup here.
  }

  render() {
    return html`
      <div data-drag="dragger" class="c-window__head js-window__head">
        <ul class="c-window__controls">
          <li>
            <button
              data-window-control="quit"
              class="c-window__control c-window__control--quit"
              @click=${() => this.handleQuitClick()}
            >
              <svg   
                  class="c-window__control-icon"
                  width="11"
                  height="11"
                  viewBox="0 0 11 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.29468 1.55566L5.81547 5.07645M9.36575 8.62673L5.81547 5.07645M5.81547 5.07645L9.33429 1.55763M5.81547 5.07645L2.26322 8.6287"
                    stroke="black"
                    stroke-width="2"
                  />
                </svg>
            </button>
          </li>
          <li>
            <button
              data-window-control="hide"
              class="c-window__control c-window__control--hide"
              @click=${this.handleHideClick}
            >
              <svg
                  class="c-window__control-icon"
                  width="11"
                  height="11"
                  viewBox="0 0 11 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.409668 5.10791H10.4097"
                    stroke="black"
                    stroke-width="2"
                  />
                </svg>
            </button>
          </li>
          <li>
            <button
              data-window-control="scale"
              class="c-window__control c-window__control--scale"
              @click=${this.handleScaleClick}
            >
              <svg
                  class="c-window__control-icon"
                  width="11"
                  height="11"
                  viewBox="0 0 11 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.32202 1.84436H8.8491V8.37143H2.32202V1.84436Z"
                    stroke="black"
                    stroke-width="2"
                  />
                </svg>
            </button>
          </li>
        </ul>
      </div>
    `;
  }
}
