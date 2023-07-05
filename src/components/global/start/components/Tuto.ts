import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("tuto-component")
export class Tuto extends LitElement {

  @property({ type: Function }) nextPanel: (() => void) | undefined;

  constructor() {
    super();
    this.classList.add("c-tuto");
    this.classList.add("c-start-element");
  }

  connectedCallback() {
    super.connectedCallback();
  }

  async updated() {
    await this.inAnimation();
  }

  sleep(ms: number){
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async inAnimation() {
    const title = this.querySelector(".c-tuto__title") as HTMLElement;
    title.classList.add("hidden-from-top");
    const tutos = this.querySelectorAll(".c-tuto__tuto") as NodeListOf<HTMLElement>;
    tutos.forEach((tuto) => {
      tuto.classList.add("hidden-fade");
      tuto.classList.add("hidden-from-top-px");
    });
    const cta = this.querySelector(".c-start__cta") as HTMLElement;
    cta.classList.add("hidden-from-top-px");
    cta.classList.add("hidden-fade");
    
    await this.sleep(100);
    title.classList.remove("hidden-from-top");
    
    await this.sleep(100);
    for (let i = 0; i < tutos.length; i++) {
      await this.sleep(200);
      tutos[i].classList.remove("hidden-from-top-px");
      tutos[i].classList.remove("hidden-fade");
    }
    
    await this.sleep(200);
    cta.classList.remove("hidden-from-top-px");
    cta.classList.remove("hidden-fade");
  }
  
  async outAnimation() {
    const title = this.querySelector(".c-tuto__title") as HTMLElement;
    const tutos = this.querySelectorAll(".c-tuto__tuto") as NodeListOf<HTMLElement>;
    const cta = this.querySelector(".c-start__cta") as HTMLElement;
    const logo = this.querySelector(".c-tuto__logo") as HTMLElement;

    title.classList.add("hidden-from-top");
    for (let i = 0; i < tutos.length; i++) {
      tutos[i].classList.add("hidden-fade");
    }
    cta.classList.add("hidden-from-top-px");
    cta.classList.add("hidden-fade");

    logo.style.opacity = "0.2";

    await this.sleep(400);
    this.nextPanel!();
  }


  createRenderRoot() {
    return this;
  }


  render() {
    return html`
      <div class="c-tuto__main">
        <div class="c-start__title-container">
          <h1 class="c-start__title c-tuto__title">Quelques infos avant de partir</h1>
        </div>
          <ul class="c-tuto__tutos">
            <li class="c-tuto__tuto">
              <h2 class="c-tuto__tuto-title">Suivre l’aventure</h2>
              <p class="c-tuto__tuto-text">Les informations importantes vous seront présentées. Ensuite, le <strong>journal.txt</strong> qui est sur le bureau, complètera  l’histoire. Une fois lu, il vous sera proposé de passer à l’époque suivante. </p>
            </li>
            <li class="c-tuto__tuto">
              <h2 class="c-tuto__tuto-title">Soyez curieux</h2>
              <p class="c-tuto__tuto-text">Différents éléments sont cachés dans les dossiers ou dans la <strong>corbeille</strong>. Si vous ne voulez rien manquer ou satisfaire votre curiosité, fouillez !</p>
            </li>
            <li class="c-tuto__tuto">
              <h2 class="c-tuto__tuto-title">Vous êtes pressé ?</h2>
              <p class="c-tuto__tuto-text">En cliquant sur le <strong>logo en haut à droite</strong>, vous arriverez sur le menu des styles. Avec celui-ci, vous pouvez vous déplacer librement sans forcément suivre l’histoire.</p>
            </li>
          </ul>
        <button @click="${this.outAnimation}" class="c-start__cta">Commencer l'aventure</button>
        <img src="/images/components/intro/logobg.png" alt="Logo Lorem Ipson" class="c-start__logo c-tuto__logo">
      </div>
    `;
  }
}
