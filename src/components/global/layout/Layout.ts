import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { basic } from './styles.ts';

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
                src="img/layout/layout__btn-icon--up.png"
                alt="Bouton pécédent"
                class="c-layout__btn-icon o-fluidimage"
              />
            </button>
            <button
              class="c-layout__btn c-layout__btn--next js-layout__btn"
              @click=${() => this.changeStyle('next')}
            >
              <img
                src="img/layout/layout__btn-icon--down.png"
                alt="Bouton pécédent"
                class="c-layout__btn-icon c-layout__btn-icon--invert o-fluidimage"
              />
            </button>
          </div>
          <div class="c-layout__icon">
            <img
              class="o-fluidimage"
              src="img/layout/loremIpsonIcon.png"
              alt="Logo neumorphique Lorem Ipson"
            />
          </div>
  
          <h2 class="c-layout__style js-layout__style">Modern Mac</h2>
        </div>
        <div class="c-layout__screen js-layout__screen"></div>
      </div>
    `;
  }  
}
