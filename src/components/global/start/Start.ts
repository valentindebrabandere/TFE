import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "./style.css";
import "./components/Intro.ts"

@customElement("start-component")
export class Start extends LitElement {

  constructor() {
    super();
    this.classList.add("c-start");
  }

  connectedCallback() {
    super.connectedCallback();
  }

  createRenderRoot() {
    return this;
  }


  render() {
    return html`
      <intro-component/>
    `;
  }
}
