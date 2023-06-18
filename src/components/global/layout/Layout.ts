import { html } from "lit";
import { StyledElement } from "../../../utils/globalStyledElement.ts";
import { customElement, state } from "lit/decorators.js";
import anime from 'animejs/lib/anime.es.js'; 
import "./style.css";

//utils imports
import {
  GlobalStyleController,
  stylesList,
} from "../../../utils/styleController.ts";

//images import
import logoLoremIpson from "./assets/loremIpsonIcon.png";
import iconDownn from "./assets/layout__btn-icon--down.png";
import iconUp from "./assets/layout__btn-icon--up.png";

@customElement("layout-component")
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

  private layout: HTMLElement | null = null;

  firstUpdated() {
    this.layout = this.renderRoot.querySelector(".js-layout");

    const parent = this.parentElement;
    if (parent) {
      parent.addEventListener("open-layout-event", this.openLayout.bind(this));
    }
  }

  changeStyleHandler(direction: string) {
    const screen: HTMLElement | null = document.querySelector('.js-screen');
    if (screen === null) return;
  
    if (direction === "next") {
      // Start the animation by scaling down the screen
      anime({
        targets: screen,
        scale: 0.8,
        duration: 250, // duration of animation in ms
        easing: 'easeInQuad',
        complete: () => {
          // When the scale down animation ends, change the style and instantly scale up the screen
          this.globalStyleController.changeStyle(direction);
          this.currentStyle = this.globalStyleController.style;
          this.currentStyleDate = this.globalStyleController.getDate();
          this.currentStyleName = this.globalStyleController.getName();
          
          // Update the disable state for the buttons
          const newIndex = this.globalStyleController.getStyleIndex();
          this.isDisabledPrev = newIndex === 0;
          this.isDisabledNext = newIndex === stylesList.length - 1;
    
          // Instantly scale up the screen and then animate scaling down to the original size
          anime({
            targets: screen,
            scale: 1.3,
            duration: 0, // duration of animation in ms
            complete: () => {
              anime({
                targets: screen,
                scale: 1,
                duration: 400, // duration of animation in ms
                easing: 'easeOutQuad',
              });
            }
          });
        }
      });
    } else if (direction === "back") {
      // Similar to the "next" direction but with different animation parameters.
      // This is just an example, you should replace this with your desired animation.
      anime({
        targets: screen,
        scale: 1.2,
        duration: 250, // duration of animation in ms
        easing: 'easeInQuad',
        complete: () => {
          // Instantly scale up the screen and then animate scaling down to the original size
          anime({
            targets: screen,
            scale: .8,
            duration: 0, // duration of animation in ms
            complete: () => {
              anime({
                targets: screen,
                scale: 1,
                duration: 400, // duration of animation in ms
                easing: 'easeOutQuad',
              });
            }
          });
          // When the scale down animation ends, change the style and instantly scale up the screen
          this.globalStyleController.changeStyle(direction);
          this.currentStyle = this.globalStyleController.style;
          this.currentStyleDate = this.globalStyleController.getDate();
          this.currentStyleName = this.globalStyleController.getName();
          
          // Update the disable state for the buttons
          const newIndex = this.globalStyleController.getStyleIndex();
          this.isDisabledPrev = newIndex === 0;
          this.isDisabledNext = newIndex === stylesList.length - 1;
    
        }
      });
    }
  }  
  

  openLayout(): void {
    const screenContainer: HTMLElement | null = document.querySelector(".c-screen__container");
  
    // Update the disable state for the buttons
    const newIndex = this.globalStyleController.getStyleIndex();
    this.isDisabledPrev = newIndex === 0;
    this.isDisabledNext = newIndex === stylesList.length - 1;
  
    if (this.layout === null || screenContainer === null) return;
    this.layout.style.display = "block";
    this.layout.style.pointerEvents = "auto";
    
    setTimeout(() => {
      if (this.layout === null || screenContainer === null) return;
      screenContainer.style.transform = "scale(0.7)";
      this.layout.style.transform = "scale(1)";
    }, 10); // give it a small delay
  }

  closeLayout(): void {
    const screenContainer: HTMLElement | null = document.querySelector(".c-screen__container");

    if (this.layout === null || screenContainer === null) return;
    this.layout.style.pointerEvents = "none";
    this.layout.style.transform = "scale(1.46)";
    screenContainer.style.transform = "scale(1)";
    setTimeout(() => {
      if (this.layout === null) return;
      this.layout.style.display = "none";
    }
    , 400);
  }

  render() {
    return html`
      <div class="c-layout js-layout">
        <div class="c-layout__display">
          <div class="c-layout__controls">
            <button
              class="c-layout__btn c-layout__btn--back js-layout__btn ${this
                .isDisabledNext
                ? "inactive"
                : ""}"
              @click=${() => this.changeStyleHandler("next")}
              ?disabled=${this.isDisabledNext}
            >
              <img
                src="${iconUp}"
                alt="Bouton pécédent"
                class="c-layout__btn-icon o-fluidimage"
              />
            </button>
            <button
              class="c-layout__btn c-layout__btn--back js-layout__btn ${this
                .isDisabledPrev
                ? "inactive"
                : ""}"
              @click=${() => this.changeStyleHandler("back")}
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
        <div class="c-layout__screen" @click=${() => this.closeLayout()}></div>
      </div>
    `;
  }
}
