import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("intro-component")
export class Intro extends LitElement {

  constructor() {
    super();
    this.classList.add("c-intro");
  }

  connectedCallback() {
    super.connectedCallback();
  }

  createRenderRoot() {
    return this;
  }


  render() {
    return html`
      <div class="c-intro__main">
        <div class="c-intro__title-container">
          <h1 class="c-intro__title">Lorem Ipson</h1>
        </div>
        <div class="c-intro__subtitle-container">
          <p class="c-intro__subtitle">Laissez votre curiosité vous guider à travers la vie de Mike</p>
        </div>
        <button class="c-intro__cta">Commencer l'aventure</button>
        <img src="/public/images/components/intro/logobg.png" alt="Logo Lorem Ipson" class="c-intro__logo">
      </div>
      <div class="c-intro__footer">
        <p class="c-intro-footer__text">
        Travail de fin d’études réalisé dans le cadre d’un master en developpement interactif à  l’Institut des Arts de la Diffusion, section realisation multimédia.<br/><br/>TFE réalisé durant l’année scolaire 2022-2023 par Valentin de Brabandère
        </p>
        <img src="/public/images/components/intro/logoIad.png" alt="IAD" class="c-intro-footer__logo">
      </div>
    `;
  }
}
