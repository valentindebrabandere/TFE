// TextEdit.ts
import { html, css } from 'lit';
import { customElement, state, property } from 'lit/decorators.js';
import { Notif } from "../../global/notif/notif";

import { basic, styles } from './styles';

// utils imports
import { StyledElement } from '../../../utils/globalStyledElement';

@customElement('text-edit-component')
export class TextEdit extends StyledElement {
  @property({ type: String, attribute: 'filelink' }) filelink: string|undefined;

  @state() content: string = '';
  @state() styles = [basic, css``];
  @state() currentStyle = "";

  connectedCallback() {
    super.connectedCallback();
    this.updateStyles();
    this.classList.add('c-text-edit');
    this.classList.add('c-app');
    this.notifCheck();
  }

  notifCheck(){

      if(this.filelink?.includes("journal.html")){
        if(this.filelink?.includes("modernMac")){
          return;
        }
      //create a notification
      setTimeout(() => {
        let newNotif = Notif.createNewNotification("Style", "Aller au style suivant", "");
        let display = document.querySelector(".c-notif-container");
        display?.appendChild(newNotif);
      }, 5000);

    }

  }
  
  //need to be called to change the style
  updateStyles() {
    //select the current style (globalStyledElement.ts)
    this.styles = this.applyStyles(styles, basic);
  }

  async updated(changedProperties: Map<string, any>) {
    if (changedProperties.has('filelink')) {
      if (this.filelink === undefined) {
        return;
      }
      this.content = await this.fetchFileContent(this.filelink);
    }
    // Set focus on the contenteditable div after updating the content
    const editor = this.querySelector('.c-text-edit__editor') as HTMLElement;
    if (editor) {
      editor.focus();
    }
  }

  async fetchFileContent(filelink: string): Promise<string> {
    try {
      const response = await fetch(filelink);
      const content = await response.text();
      return content;
    } catch (error) {
      return '';
    }
  }

  updateContent(content: string) {
    this.content = content;
  }

  render() {
    // create a text-edit app
    return html`
      <style>
        /* Import the good style */
        ${this.styles}
      </style>
       <div
        class="c-text-edit__editor"
        contenteditable
        spellcheck=false
        data-placeholder="Entrez votre texte ici..."
        .innerHTML="${this.content}"
      ></div>
    `;
  }
}
