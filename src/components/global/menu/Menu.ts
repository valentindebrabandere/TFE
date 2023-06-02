import { html } from "lit";
import { customElement, state } from "lit/decorators.js";

import { dispatchOpenLayoutEvent } from "../../../utils/layoutUtils";

// utils imports
import { StyledElement } from "../../../utils/globalStyledElement";

@customElement("menu-component")
export class Menu extends StyledElement {
  @state() time = new Date();
  timer: ReturnType<typeof setTimeout> | undefined = undefined;

  @state() currentStyle = "";

  connectedCallback() {
    super.connectedCallback();
    this.updateTime();
    this.timer = setInterval(() => {
      this.updateTime();
    }, 60000); // Update every 60,000 ms (1 minute)
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    clearInterval(this.timer);
  }

  updateTime() {
    this.time = new Date();
  }

  callOpenLayout() {
    dispatchOpenLayoutEvent(this);
  }

  //need to be called to change the style
  updateStyles() {
    //select the current style (globalStyledElement.ts)
    this.currentStyle = this.globalStyleController.style;
  }

  render() {
    this.updateStyles();
    const formattedTime = `${this.time
      .getHours()
      .toString()
      .padStart(2, "0")}:${this.time.getMinutes().toString().padStart(2, "0")}`;

    const formattedDate = this.time.toLocaleDateString("en-US", {
      weekday: "short",
      day: "2-digit",
      month: "short",
    });

    return html`
      <link rel="stylesheet" href="/src/components/global/menu/basic.css" />
      <link
        rel="stylesheet"
        href="/src/components/global/menu/styles/${this.currentStyle}.css"
      />
      <div class="c-menu-bar">
        <ul class="c-menu-bar__left">
          <li class="c-menu-bar__item">
            <button
              @click=${this.callOpenLayout}
              class="c-menu-bar__btn js-menu-bar__logo"
            >
              <img
                class="c-menu-bar__icon"
                src="/images/components/menu/${this
                  .currentStyle}/logoLoremIpson.png"
                alt="logoLoremIpson"
              />
            </button>
          </li>
          <li class="c-menu-bar__item c-menubar__application">
            <button data-menu-bar="Files" class="c-menu-bar__btn">Files</button>
          </li>
          <li class="c-menu-bar__item">
            <button data-menu-bar="Edit" class="c-menu-bar__btn">Edit</button>
          </li>
          <li class="c-menu-bar__item">
            <button data-menu-bar="View" class="c-menu-bar__btn">View</button>
          </li>
          <li class="c-menu-bar__item">
            <button data-menu-bar="Go" class="c-menu-bar__btn">Go</button>
          </li>
          <li class="c-menu-bar__item">
            <button data-menu-bar="View" class="c-menu-bar__btn">Window</button>
          </li>
          <li class="c-menu-bar__item">
            <button data-menu-bar="Help" class="c-menu-bar__btn">Help</button>
          </li>
        </ul>
        <ul class="c-menu-bar__rigth">
          ${this.currentStyle !== "oneBit" && this.currentStyle !== "grey"
            ? html`
                <li class="c-menu-bar__item">
                  <button class="c-menu-bar__btn" data-menu-bar="Wifi">
                    <img
                      class="c-menu-bar__icon"
                      src="/images/components/menu/${this
                        .currentStyle}/wifiIcon.png"
                      alt="icon Wifi"
                    />
                  </button>
                </li>
                <li class="c-menu-bar__item">
                  <button class="c-menu-bar__btn" data-menu-bar="Search">
                    <img
                      class="c-menu-bar__icon"
                      src="/images/components/menu/${this
                        .currentStyle}/searchIcon.png"
                      alt="icon Search"
                    />
                  </button>
                </li>
                <li class="c-menu-bar__item">
                  <button class="c-menu-bar__btn" data-menu-bar="Control center">
                    <img
                      class="c-menu-bar__icon"
                      src="/images/components/menu/${this
                        .currentStyle}/controlCenterIcon.png"
                      alt="icon Control center"
                    />
                  </button>
                </li>
              `
            : ""}
          <li class="c-menu-bar__item" data-menu-bar="Date">
            <button
              class="c-menu-bar__btn js-mennubar__btn--date c-mennubar__btn--date"
            >
              ${formattedDate}
            </button>
          </li>
          <li class="c-menu-bar__item">
            <button
              class="c-menu-bar__btn js-mennubar__btn--hour"
              data-menu-bar="Hour"
            >
              ${formattedTime}
            </button>
          </li>
        </ul>
      </div>
    `;
  }
}
