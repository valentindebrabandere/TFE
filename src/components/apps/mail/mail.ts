// MailComponent.ts
import { html, css } from 'lit';
import { customElement, state, property } from 'lit/decorators.js';

import { StyledElement } from '../../../utils/globalStyledElement';
import { basic, styles } from './styles';
import './mailItemComponent.ts';

@customElement('mail-component')
export class Mail extends StyledElement {
  @property({ type: String, attribute: 'filelink' }) filelink: string | undefined;

  @state() mails: any[] = [];
  @state() selectedMail: any = null;
  @state() styles = [basic, css``]; // Update with styles for MailComponent
  @state() selectedMailContent: string = '';

  async connectedCallback() {
    super.connectedCallback();
    this.updateStyles();
    this.classList.add('c-mail');
    this.classList.add('c-app');
    if (this.filelink) {
      console.log(this.filelink)
      this.mails = await this.fetchMails(this.filelink);
    }
  }

  //need to be called to change the style
  updateStyles() {
    //select the current style (globalStyledElement.ts)
    this.styles = this.applyStyles(styles, basic); // Update with styles for MailComponent
  }

  async fetchMails(filelink: string): Promise<any[]> {
    if (!filelink) return this.mails;

    try {
      const response = await fetch(filelink);
      const mails = await response.json();
      return mails;
    } catch (error) {
      return this.mails;
    }
  }

  async selectMail(mail: any) {
    mail.read = true;
    this.selectedMail = mail;
    if (this.selectedMail.filelink) {
      this.selectedMailContent = await this.fetchFileContent(this.selectedMail.filelink);
    } else {
      this.selectedMailContent = this.selectedMail.content;
    }
  }

  async fetchFileContent(filelink: string): Promise<string> {
    const response = await fetch(filelink);
    const htmlContent = await response.text();
    return htmlContent;
  }

  render() {
    // create an mail app
    return html`
      <style>
        /* Import the good style */
        ${this.styles}
      </style>
      <div class="c-mail">
        <div class="c-mail__list">
          ${this.mails.map(mail => html`
            <mail-item-component 
              .mail="${mail}" 
              .read="${mail.read}" 
              @click="${() => this.selectMail(mail)}">
            </mail-item-component>
          `)}
        </div>
        <div class="c-mail__content">
          ${this.selectedMail ? html`
            <div>${this.selectedMailContent}</div>
          ` : html`
            <p>Select a mail to read.</p>
          `}
        </div>
      </div>
    `;
  }
}
