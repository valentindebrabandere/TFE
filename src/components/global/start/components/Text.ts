import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("text-component")
export class Text extends LitElement {
  @property({ type: Function }) nextPanel: (() => void) | undefined;

  constructor() {
    super();
    this.classList.add("c-text");
  }

  connectedCallback() {
    super.connectedCallback();
  }

  createRenderRoot() {
    return this;
  }

  async updated() {
    await this.inAnimation();
  }

  sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async inAnimation() {
    const text = this.querySelectorAll(".c-text__p") as NodeListOf<HTMLElement>;

    text.forEach((t) => {
      t.classList.add("hidden-fade");
      t.classList.add("hidden-from-top-px");
    });

    const cta = this.querySelector(".c-start__cta") as HTMLElement;
    cta.classList.add("hidden-from-top-px");
    cta.classList.add("hidden-fade");

    await this.sleep(100);
    for (let i = 0; i < text.length; i++) {
      await this.sleep(250);
      text[i].classList.remove("hidden-from-top-px");
      text[i].classList.remove("hidden-fade");
    }

    await this.sleep(200);
    cta.classList.remove("hidden-from-top-px");
    cta.classList.remove("hidden-fade");
  }

  render() {
    return html`
      <div class="c-text__main">
        <div class="c-text__text">
          <p class="c-text__p">
            Nous sommes en 2037, mon grand-père, Mike Ipson, créateur de la
            multinationale technologique Lorem Ispon, vient de décéder.
          </p>
          <p class="c-text__p">
            Depuis toute petite, son passé m’a toujours fascinée. Après tout, il
            a quand même crée Lorem Ipson, l’une des entreprises la plus
            influente au monde.
          </p>
          <p class="c-text__p">
            À la maison, on a toujours évité le sujet, mais aujourd’hui, je vais
            tout savoir. J’ai retrouvé son ordinateur en rangeant son grenier.
            En cherchant bien, je suis sûr que je trouverai toutes les réponses
            à mes questions.
          </p>
          <p class="c-text__p c-text__p---muted ">
            Vous êtes la petite-fille de Mike Ipson, bonne recherche…
          </p>
        </div>
        <button @click="${this.nextPanel}" class="c-start__cta c-text__cta">
          <p class="c-text__arrow">→</p>
        </button>
        <img
          src="/images/components/intro/logobg.png"
          alt="Logo Lorem Ipson"
          class="c-start__logo c-text__logo"
        />
      </div>
    `;
  }
}
