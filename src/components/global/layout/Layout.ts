import { html } from 'lit';
import { StyledElement } from '../../../utils/globalStyledElement.ts';
import { customElement, state } from 'lit/decorators.js';
import './style.css';

//utils imports
import { GlobalStyleController, stylesList } from '../../../utils/styleController.ts';


//images import
import logoLoremIpson from './assets/loremIpsonIcon.png';
import iconDownn from './assets/layout__btn-icon--down.png'
import iconUp from './assets/layout__btn-icon--up.png'


@customElement('layout-component')
export class Layout extends StyledElement {

  @state() currentStyle = this.globalStyleController.style;
  @state() currentStyleDate = this.globalStyleController.getDate();
  @state() currentStyleName = this.globalStyleController.getName();
  @state() isDisabledPrev = false;
  @state() isDisabledNext = false;


  protected globalStyleController = new GlobalStyleController(this);

  constructor() {
    super();
  }

  private layout: HTMLElement|null = null;
  

  firstUpdated() {
    this.layout = this.renderRoot.querySelector('.js-layout');

    const parent = this.parentElement;
    if (parent) {
      parent.addEventListener('open-layout-event', this.openLayout.bind(this));
    }
  }

  changeStyleHandler(direction: string) {
    this.globalStyleController.changeStyle(direction);
    this.currentStyle = this.globalStyleController.style;
    this.currentStyleDate = this.globalStyleController.getDate();
    this.currentStyleName = this.globalStyleController.getName();
    
    // Update the disable state for the buttons
    const newIndex = this.globalStyleController.getStyleIndex();
    this.isDisabledPrev = newIndex === 0;
    this.isDisabledNext = newIndex === stylesList.length - 1;
  }


  openLayout(): void {
    const screen: HTMLElement|null = document.querySelector('.js-screen');
  
    // Update the disable state for the buttons
    const newIndex = this.globalStyleController.getStyleIndex();
    this.isDisabledPrev = newIndex === 0;
    this.isDisabledNext = newIndex === stylesList.length - 1;
  
    if(this.layout === null || screen === null) return;
    this.layout.style.pointerEvents = 'auto';
    this.layout.style.transform = 'scale(1)';
    screen.style.transform = 'scale(0.7)';
  }
  
  closeLayout(): void {
    const screen: HTMLElement|null = document.querySelector('.js-screen');
    
    if (this.layout === null || screen === null) return;
    this.layout.style.pointerEvents = 'none';
    this.layout.style.transform = 'scale(1.5)';
    screen.style.transform = 'scale(1)';
  }
  
  

  render() {
    return html`
      <div class="c-layout js-layout">
        <div class="c-layout__display">
          <div class="c-layout__controls">
          <button
              class="c-layout__btn c-layout__btn--back js-layout__btn ${this.isDisabledNext ? 'inactive' : ''}"
              @click=${() => this.changeStyleHandler('next')}
              ?disabled=${this.isDisabledNext}
            >
              <img
                src="${iconUp}"
                alt="Bouton pécédent"
                class="c-layout__btn-icon o-fluidimage"
              />
            </button>
            <button
              class="c-layout__btn c-layout__btn--back js-layout__btn ${this.isDisabledPrev ? 'inactive' : ''}"
              @click=${() => this.changeStyleHandler('back')}
              ?disabled=${this.isDisabledPrev}
            >
              <img
                src="${iconDownn}"
                alt="Bouton pécédent"
                class="c-layout__btn-icon c-layout__btn-icon--invert o-fluidimage"
              />
            </button>
          </div>
          <div class="c-layout__icon">
            <img
              class="o-fluidimage"
              src="${logoLoremIpson}"
              alt="Logo neumorphique Lorem Ipson"
            />
          </div>
          <h2 class="c-layout__name">${this.currentStyleName}</h2>
          <p class="c-layout__date">${this.currentStyleDate}</p>
        </div>
          <div class="c-layout__cache-container">
            <div class="c-layout__cache"></div>
          </div>
        <div class="c-layout__screen" @click=${() => this.closeLayout()}>
        </div>
      </div>
    `;
  }  
}
