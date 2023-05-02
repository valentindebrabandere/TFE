import { html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import { dispatchOpenLayoutEvent } from '../../../utils/layoutUtils';

import { basic, styles } from './styles';
import { imageElements } from './images.ts';

// utils imports
import { StyledElement } from '../globalStyledElement';

// images import
const logoLoremIpson = imageElements.logoLoremIpson.src;
const wifiIcon = imageElements.wifiIcon.src;
const controlCenterIcon = imageElements.controlCenterIcon.src;
const searchIcon = imageElements.searchIcon.src;

@customElement('menu-component')
export class MenuComponent extends StyledElement {
  @state() time = new Date();
  timer: ReturnType<typeof setTimeout> | undefined = undefined;

  @state() styles = [basic, css``];

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
    this.styles = this.applyStyles(styles, basic);
  }

  render() {
    const formattedTime = `${this.time
      .getHours()
      .toString()
      .padStart(2, '0')}:${this.time
      .getMinutes()
      .toString()
      .padStart(2, '0')}`;

    const formattedDate = this.time.toLocaleDateString('en-US', {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
    });

    return html`
      <style>
        /* Import the good style */
        ${this.styles}
      </style>
      <div class="c-menu-bar">
        <ul class="c-menu-bar__left">
          <li class="c-menu-bar__item"> 
            <button @click=${this.callOpenLayout} class="c-menu-bar__btn js-menu-bar__logo">
              <img
                class="c-menu-bar__icon"
                src="${logoLoremIpson}"
                alt="logoLoremIpson"
              />
            </button>
          </li>
          <li class="c-menu-bar__item c-menubar__application">
            <button data-menu-bar="Files" class="c-menu-bar__btn">
              Files
            </button>
          </li>
          <li class="c-menu-bar__item">
            <button data-menu-bar="Edit" class="c-menu-bar__btn">
              Edit
            </button>
          </li>
          <li class="c-menu-bar__item">
            <button data-menu-bar="View" class="c-menu-bar__btn">
              View
            </button>
          </li>
          <li class="c-menu-bar__item">
            <button data-menu-bar="Go" class="c-menu-bar__btn">
              Go
            </button>
          </li>
          <li class="c-menu-bar__item">
            <button data-menu-bar="View" class="c-menu-bar__btn">
              Window
            </button>
          </li>
          <li class="c-menu-bar__item">
            <button data-menu-bar="Help" class="c-menu-bar__btn">
              Help
            </button>
          </li>
        </ul>
        <ul class="c-menu-bar__rigth">
          <li class="c-menu-bar__item">
            <button class="c-menu-bar__btn" data-menu-bar="Wifi">
              <img
                class="c-menu-bar__icon"
                src="${wifiIcon}"
                alt="icon Wifi"
              />
            </button>
          </li>
          <li class="c-menu-bar__item">
            <button class="c-menu-bar__btn" data-menu-bar="Search">
              <img
                class="c-menu-bar__icon"
                src="${searchIcon}"
                alt="icon Search"
              />
            </button>
          </li>
          <li class="c-menu-bar__item">
            <button
              class="c-menu-bar__btn"
              data-menu-bar="Control center"
            >
              <img
                class="c-menu-bar__icon"
                src="${controlCenterIcon}"
                alt="icon Control center"
              />
            </button>
          </li>
          <li class="c-menu-bar__item" data-menu-bar="Date">
            <button class="c-menu-bar__btn js-mennubar__btn--date c-mennubar__btn--date">
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
