import { html, PropertyValues } from "lit";
import { customElement, property } from "lit/decorators.js";

// utils imports
import { StyledElement } from "../../../utils/globalStyledElement.ts";
import { removeOpenedApp } from "../../../utils/openedAppsProvider.ts";
import { eventBus } from "../../../utils/eventBus.ts";

@customElement("window-component")
export class Window extends StyledElement {
  @property({ type: String }) appUuid: string = "";
  @property({ type: String }) id: string = "";
  @property({ type: Number }) windowNumber: number = 0;
  @property({ type: Boolean }) focused = false;
  @property({ type: Boolean }) scaled = false;

  @property({ type: Number }) top: number = 0;
  @property({ type: Number }) left: number = 0;

  private uuid: string = "";

  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
    this.updateStyles();
    this.classList.add("c-window");
    this.setAttribute("data-drag", "draggable-dragger");

    eventBus.subscribe("restoreWindow", (data: any) => {
      if (data.uuid === this.uuid) {
        this.style.display = "flex";
      }
    });
  }

  firstUpdated() {
    this.uuid = this.appUuid;
    
    const topOffset = (this.windowNumber * 5) % 100;
    const leftOffset = (this.windowNumber * 3) % 100;
    this.style.top = `${10 + topOffset}%`;
    this.style.left = `${10 + leftOffset}%`;  
    
  }

  updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);
    if (changedProperties.has("appUuid")) {
      this.uuid = this.appUuid;
    }
    if (changedProperties.has("focused")) {
      if (this.focused) {
        this.style.zIndex = "200"; // Some high value to ensure it appears on top
      } else {
        this.style.zIndex = "100"; // Normal value
      }
    }
    if (changedProperties.has("top") && this.top !== undefined) {
      this.style.top = `${this.top || (this.windowNumber * 5) % 100}%`;
    }
    
    if (changedProperties.has("left") && this.left !== undefined) {
      this.style.left = `${this.left || (this.windowNumber * 3) % 100}%`;
    }
    
  }
  

  async handleQuitClick() {
    await this.updateComplete;
    //get attribute data-uiid
    removeOpenedApp(this.uuid);
  }

  handleHideClick() {
    // Hide the window
    this.style.display = "none";

    // Dispatch the event
    eventBus.dispatch("windowHidden", { uuid: this.uuid, id: this.id });
  }

  handleScaleClick() {

    this.scaled = !this.scaled;
    this.classList.toggle("c-window--scaled");

    const app = this.querySelector(".c-app");
    const containerHeight = document.querySelector(
      ".c-display-container"
    )?.clientHeight;

    const headHeight = this.querySelector(".js-window__head")?.clientHeight;
    if (app === null) return;

    if (containerHeight === undefined || headHeight === undefined) return;

    app?.setAttribute("style", `max-height: ${containerHeight - headHeight}px`);
    app?.classList.toggle("c-app--scaled");
    
    if (this.scaled) {
      const head = this.querySelector(".js-window__head");
      //remove data dragger
      head?.removeAttribute("data-drag");
    } else {
      const head = this.querySelector(".js-window__head");
      //add data dragger
      head?.setAttribute("data-drag", "dragger");
    }

    const appContent = this.querySelector(".c-app__content");

    if (appContent === null) return;
    //check if the content is vertical or horizontal
    appContent?.classList.toggle("c-app__content--scaled");
    appContent.clientHeight > appContent.clientWidth
      ? appContent?.classList.toggle("horizontal")
      : appContent?.classList.toggle("vertical");
  }

  render() {
    return html`
      <div data-drag="dragger" class="c-window__head js-window__head">
        <ul class="c-window__controls">
          <li>
            <button
              data-window-control="quit"
              class="c-window__control c-window__control--quit"
              @click=${() => this.handleQuitClick()}
            >
              <svg
                class="c-window__control-icon"
                width="11"
                height="11"
                viewBox="0 0 11 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.29468 1.55566L5.81547 5.07645M9.36575 8.62673L5.81547 5.07645M5.81547 5.07645L9.33429 1.55763M5.81547 5.07645L2.26322 8.6287"
                  stroke="black"
                  stroke-width="2"
                />
              </svg>
            </button>
          </li>
          <li>
            <button
              data-window-control="hide"
              class="c-window__control c-window__control--hide"
              @click=${this.handleHideClick}
            >
              <svg
                class="c-window__control-icon"
                width="11"
                height="11"
                viewBox="0 0 11 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.409668 5.10791H10.4097"
                  stroke="black"
                  stroke-width="2"
                />
              </svg>
            </button>
          </li>
          <li>
            <button
              data-window-control="scale"
              class="c-window__control c-window__control--scale"
              @click=${this.handleScaleClick}
            >
              <svg
                class="c-window__control-icon"
                width="11"
                height="11"
                viewBox="0 0 11 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.32202 1.84436H8.8491V8.37143H2.32202V1.84436Z"
                  stroke="black"
                  stroke-width="2"
                />
              </svg>
            </button>
          </li>
        </ul>
      </div>
    `;
  }
}
