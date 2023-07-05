import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("intro-component")
export class Intro extends LitElement {

  @property({ type: Function }) nextPanel: (() => void) | undefined;

  constructor() {
    super();
    this.classList.add("c-intro");
  }

  connectedCallback() {
    super.connectedCallback();
  }

  sleep(ms: number){
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async updated() {
    await this.inAnimation();
  }
  
  async inAnimation() {
    const title = this.querySelector(".c-intro__title") as HTMLElement;
    const subtitle = this.querySelector(".c-intro__subtitle") as HTMLElement;
    const cta = this.querySelector(".c-start__cta") as HTMLElement;
    const logo = this.querySelector(".c-intro__logo") as HTMLElement;
    const footer = this.querySelector(".c-intro__footer") as HTMLElement;
  
    await this.sleep(500);
    logo.classList.remove("hidden-fade");
    title.classList.remove("hidden-from-top");
    
    await this.sleep(350)
    subtitle.classList.remove("hidden-from-top");
    
    await this.sleep(200);
    cta.classList.remove("hidden-from-top-px");
    cta.classList.remove("hidden-fade");

    await this.sleep(200);
    footer.classList.remove("hidden-fade");
    footer.classList.remove("hidden-from-bottom");
  }
  
  async outAnimation() {
    const title = this.querySelector(".c-intro__title") as HTMLElement;
    const subtitle = this.querySelector(".c-intro__subtitle") as HTMLElement;
    const cta = this.querySelector(".c-start__cta") as HTMLElement;
    const logo = this.querySelector(".c-intro__logo") as HTMLElement;
    const footer = this.querySelector(".c-intro__footer") as HTMLElement;

    title.classList.add("hidden-from-top");
    subtitle.classList.add("hidden-from-top");
    cta.classList.add("hidden-from-top-px");
    cta.classList.add("hidden-fade");
    logo.style.opacity = "0.3";
    footer.classList.add("hidden-fade");

    await this.sleep(400);
    this.nextPanel!();
  }
  

  createRenderRoot() {
    return this;
  }


  render() {
    return html`
      <div class="c-intro__main">
        <div class="c-start__title-container">
          <h1 class="c-start__title hidden-from-top c-intro__title">Lorem Ipson</h1>
        </div>
        <div class="c-intro__subtitle-container">
          <p class="c-intro__subtitle hidden-from-top">Laissez votre curiosité vous guider à travers la vie de Mike</p>
        </div>
        <button @click="${this.outAnimation}" class="c-start__cta hidden-fade hidden-from-top-px">Commencer l'aventure</button>
        <img src="/images/components/intro/logobg.png" alt="Logo Lorem Ipson" class="c-start__logo c-intro__logo hidden-fade">
      </div>
      <div class="c-intro__footer hidden-fade hidden-from-bottom">
        <p class="c-intro-footer__text">
        Travail de fin d’études réalisé dans le cadre d’un master en développement interactif à  l’Institut des Arts de la Diffusion, section réalisation multimédia.<br/><br/>TFE réalisé durant l’année scolaire 2022-2023 par Valentin de Brabandère
        </p>
        <img src="/images/components/intro/logoIad.png" alt="IAD" class="c-intro-footer__logo">
      </div>
    `;
  }
}
