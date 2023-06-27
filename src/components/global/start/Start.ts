import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import "./style.css";
import "./components/Intro.ts"
import "./components/Tuto.ts"
import "./components/Text.ts"

import { newStyleDisplay } from "../../../utils/newStyleDisplay.ts";

@customElement("start-component")
export class Start extends LitElement {
  
  @property({ type: Number }) currentPanelIndex = 0;
  @property({ type: Boolean }) cameraAccessDenied = false; 
  @property({ type: Number }) initialDelay = 0; 
  @property({ type: Number }) initialPanel = 0; 
  
  panels = [
    () => html`<intro-component .nextPanel="${this.nextPanel.bind(this)}"/>`,
    () => html`<tuto-component .nextPanel="${this.nextPanel.bind(this)}"/>`,
    () => html`<text-component .nextPanel="${this.nextPanel.bind(this)}"/>`,
  ];


  constructor() {
    super();
    this.classList.add("c-start");
  }

  startCustom(panel: number, delay?: number,) {
    this.style.display = "block";
    setTimeout(() => {
      this.currentPanelIndex = panel;
      this.requestUpdate();
    }, delay);
  }
  
  createRenderRoot() {
    return this;
  }

  nextPanel() {
    if (this.currentPanelIndex < this.panels.length - 1) {
      this.currentPanelIndex++;
      this.requestUpdate();
    } else {
      newStyleDisplay();
      setTimeout(() => {
        this.style.display = "none";
      }, 1000);
    }
  }


  render() {
    return this.panels[this.currentPanelIndex]();  
  }
}
