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

  panels = [
    () => html`<intro-component .nextPanel="${this.nextPanel.bind(this)}"/>`,
    () => html`<tuto-component .nextPanel="${this.nextPanel.bind(this)}"/>`,
    () => html`<text-component .nextPanel="${this.nextPanel.bind(this)}"/>`
  ];


  constructor() {
    super();
    this.classList.add("c-start");
  }

  connectedCallback() {
    super.connectedCallback();
    this.requestCameraAccess(); // Add this line
  }

  async requestCameraAccess() {
    try {
      // This will prompt the user for camera access
      await navigator.mediaDevices.getUserMedia({ video: true });
    } catch (err) {
      // If the user denies access, this error will be thrown
      console.log('Camera access denied');
      // Set some global state to indicate camera access was denied
      this.cameraAccessDenied = true;
    }
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
        this.remove();
      }, 1000);
    }
  }


  render() {
    return this.panels[this.currentPanelIndex]();  
  }
}
