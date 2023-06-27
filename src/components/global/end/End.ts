import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";

import "./style.css";

@customElement("end-component")
export class End extends LitElement {
  constructor() {
    super();
    this.classList.add("c-end");
    this.classList.add("c-text");
  }

  connectedCallback() {
    super.connectedCallback();
  }

  createRenderRoot() {
    return this;
  }

  async updated() {
    this.sleep(1000);
    await this.inAnimation();
  }

  sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async inAnimation() {
    const text = this.querySelectorAll(".c-text__p") as NodeListOf<HTMLElement>;
    this.classList.add("hidden-fade");

    text.forEach((t) => {
      t.classList.add("hidden-fade");
      t.classList.add("hidden-from-top-px");
    });

    const cta = this.querySelector(".c-start__cta") as HTMLElement;
    cta.classList.add("hidden-from-top-px");
    cta.classList.add("hidden-fade");

    await this.sleep(100);

    this.classList.remove("hidden-fade");
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

  async outAnimation() {
    const text = this.querySelectorAll(".c-text__p") as NodeListOf<HTMLElement>;
    const cta = this.querySelector(".c-start__cta") as HTMLElement;
    const logo = this.querySelector(".c-text__logo") as HTMLElement;

    text.forEach((t) => {
      t.classList.add("hidden-fade");
    });

    cta.classList.add("hidden-fade");

    this.classList.add("hidden-fade");

    logo.style.opacity = ".5";

    await this.sleep(500);
    this.remove();
  }

  nextPanel() {
    let startComponent = document.querySelector("start-component") as any;
    if (startComponent) {
      this.outAnimation();
      startComponent.startCustom(0, 500);
    } else {
      console.log("start-component is not found in the DOM");
    }
  }

  render() {
    return html`
      <div class="c-text__main">
        <div class="c-text__text">
        <p class="c-text__p">Meri d'avoir joué le jeu !</p>
          <p class="c-text__p">
            Ce projet, c'est la conclusion de mes études. J'aimerais donc
            remercié tous les enseignant qui m'ont accompagné durant ces 4
            années.
          </p>
          <p class="c-text__p">
            Un merci spécial à l'équipe web, Jérome Coupé, Julien Moreau et
            Thomas Henrion, car a eux trois ils permette une vison très complète
            du developpement, chacun avec leur spécialité.
          </p>
          <p class="c-text__p">
            Merci à Christophe Beaujean pour la relecture et du scénario. A
            Amethys, Boris et Yuna pour leurs apparitions dans les fichiers
            d'ordinateur !
          </p>
          <p class="c-text__p">
            Merci à ma famille et mes amis pour l'aide apportée tout au long de
            ce travail.
          </p>
          <p class="c-text__p c-text__p---muted ">
            Travail de fin d'études réalisé en 2023 par Valentin de Brabandère
            pour son master en développement interactif à l’Institut des Arts de
            la Diffusion, section réalisation multimédia.
          </p>
        </div>
        <button @click="${this.nextPanel}" class="c-start__cta c-text__cta">
          <p class="c-text__arrow">→</p>
        </button>
        <img
          src="/public/images/components/intro/logobg.png"
          alt="Logo Lorem Ipson"
          class="c-start__logo c-text__logo"
        />
      </div>
    `;
  }
}
