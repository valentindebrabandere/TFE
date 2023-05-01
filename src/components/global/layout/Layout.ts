import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { basic } from './styles.ts';

//images import
import logoLoremIpson from './assets/loremIpsonIcon.png';
import iconDownn from './assets/layout__btn-icon--down.png'
import iconUp from './assets/layout__btn-icon--up.png'


@customElement('layout-component')
export class Layout extends LitElement {
  static get styles() {
    return [basic];
  }

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

  changeStyle(type: string) {
    console.log(type);
  }

  openLayout(): void {
    console.log('openLayout method called');
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
    console.log('closeLayout method called');
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
      <div class="c-layout js-layout">
        <div class="c-layout__display">
          <div class="c-layout__controls">
            <button
              class="c-layout__btn c-layout__btn--back js-layout__btn"
              @click=${() => this.changeStyle('back')}
            >
              <img
                src="${iconUp}"
                alt="Bouton pécédent"
                class="c-layout__btn-icon o-fluidimage"
              />
            </button>
            <button
              class="c-layout__btn c-layout__btn--next js-layout__btn"
              @click=${() => this.changeStyle('next')}
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
  
          <h2 class="c-layout__style js-layout__style">Modern Mac</h2>
        </div>
        <div class="c-layout__screen js-layout__screen" @click=${() => this.closeLayout()}></div>
      </div>
    `;
  }  
}
