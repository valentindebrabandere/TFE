import { html } from 'lit';
import { StyledElement } from '../../../utils/globalStyledElement.ts';
import { customElement, state } from 'lit/decorators.js';
import { basic } from './styles.ts';

//utils imports
import { GlobalStyleController } from '../../../utils/styleController.ts';


//images import
import logoLoremIpson from './assets/loremIpsonIcon.png';
import iconDownn from './assets/layout__btn-icon--down.png'
import iconUp from './assets/layout__btn-icon--up.png'


@customElement('layout-component')
export class Layout extends StyledElement {

  @state() currentStyle = this.globalStyleController.style;
  @state() currentStyleDate = this.globalStyleController.getDate();
  @state() currentStyleName = this.globalStyleController.getName();

  protected globalStyleController = new GlobalStyleController(this);

  constructor() {
    super();
  }

  private layout: HTMLElement|null = null;
  private allLayoutBtn: NodeListOf<HTMLElement>|null = null;
  

  firstUpdated() {
    this.layout = this.renderRoot.querySelector('.js-layout');
    this.allLayoutBtn = this.renderRoot.querySelectorAll('.js-layout__btn');

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
  }

  openLayout(): void {
    const screen: HTMLElement|null = document.querySelector('.js-screen');

    if(this.layout === null || screen === null) return;
    this.layout.style.pointerEvents = 'auto';
    this.layout.style.transform = 'scale(1)';
    screen.style.transform = 'scale(0.7)';
  
    if(this.allLayoutBtn === null) return;
      this.allLayoutBtn.forEach((btn) => {
      btn.removeAttribute('disabled');
    });
  }

  closeLayout(): void {
    const screen: HTMLElement|null = document.querySelector('.js-screen');
  
    if (this.layout === null || screen === null) return;
    this.layout.style.pointerEvents = 'none';
    this.layout.style.transform = 'scale(1.5)';
    screen.style.transform = 'scale(1)';
  
    if (this.allLayoutBtn === null) return;
    this.allLayoutBtn.forEach((btn) => {
      btn.setAttribute('disabled', '');
    });
  }
  

  render() {
    return html`
      <style>${basic}</style>
      <div class="c-layout js-layout">
        <div class="c-layout__display">
          <div class="c-layout__controls">
            <button
              class="c-layout__btn c-layout__btn--back js-layout__btn"
              @click=${() => this.changeStyleHandler('back')}
            >
              <img
                src="${iconUp}"
                alt="Bouton pécédent"
                class="c-layout__btn-icon o-fluidimage"
              />
            </button>
            <button
              class="c-layout__btn c-layout__btn--next js-layout__btn"
              @click=${() => this.changeStyleHandler('next')}
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
        <div class="c-layout__screen" @click=${() => this.closeLayout()}></div>
      </div>
    `;
  }  
}
