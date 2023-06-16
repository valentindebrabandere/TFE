// MessagesComponent.ts
import { html, css } from "lit";
import { customElement, state, property } from "lit/decorators.js";

import { StyledElement } from "../../../utils/globalStyledElement";
import { basic, styles } from "./styles";
import "./MessagesItemComponent";
import {formatDate} from "./formatDate";

@customElement("messages-component")
export class Messages extends StyledElement {
  @property({ type: String, attribute: "filelink" }) filelink:
    | string
    | undefined;

  @state() messagess: any[] = [];
  @state() selectedMessages: any = null;
  @state() styles = [basic, css``];
  @state() selectedMessagesContent: string = "";
  @state() currentStyle = "";

  async connectedCallback() {
    super.connectedCallback();
    this.updateStyles();
    this.classList.add("c-messages");
    this.classList.add("c-app");
    if (this.filelink) {
      this.messagess = await this.fetchMessagess(this.filelink);
      this.sortMessagess();
      this.selectMessages(this.messagess[0]);
    } else {
      this.messagess = await this.fetchMessagess(
        `/content/${this.currentStyle}/messages/messages.json`
      );
      this.selectMessages(this.messagess[0]);
      this.sortMessagess();
    }
  }

  updateStyles() {
    this.styles = this.applyStyles(styles, basic);
    this.currentStyle = this.globalStyleController.style;
  }

  async fetchMessagess(filelink: string): Promise<any[]> {
    if (!filelink) return this.messagess;
    try {
      const response = await fetch(filelink);
      const messagess = await response.json();
      return messagess;
    } catch (error) {
      return this.messagess;
    }
  }

  async selectMessages(messages: any) {
    messages.read = true;
    this.selectedMessages = messages;
    if (this.selectedMessages.filelink) {
      this.selectedMessagesContent = await this.fetchFileContent(
        this.selectedMessages.filelink
      );
    } else {
      this.selectedMessagesContent = this.selectedMessages.content;
    }
  }

  sortMessagess() {
    this.messagess.sort((a, b) => {
      const dateA = new Date(a.date + "T" + a.hour);
      const dateB = new Date(b.date + "T" + b.hour);
      return dateB.getTime() - dateA.getTime();
    });
  }

  async fetchFileContent(filelink: string): Promise<string> {
    const response = await fetch(filelink);
    const htmlContent = await response.text();
    return htmlContent;
  }

  render() {
    return html`
      <style>
        ${this.styles}
      </style>

      <div class="c-messages__list">
        ${this.messagess.map(
          (messages) => html`
            <messages-item-component
              .messages="${messages}"
              .read="${messages.read}"
              @click="${() => this.selectMessages(messages)}"
            >
            </messages-item-component>
          `
        )}
      </div>
      <div class="c-messages__content-container">
        ${this.selectedMessages
          ? html`
              <div class="c-messages-content__head">
                <div class="c-messages-content__infos">
                  <p class="c-messages-content__from">${this.selectedMessages.from}</p>
                  <h3 class="c-messages-content__object">
                    ${this.selectedMessages.object}
                  </h3>
                </div>
                <p class="c-messages-content__date">
                  ${this.selectedMessages.hour} - ${formatDate(this.selectedMessages.date)}
                </p>
              </div>
              ${this.selectedMessages.filelink
                ? html`<div
                    .innerHTML="${this.selectedMessagesContent}"
                    class="c-messages__content"
                  ></div>`
                : html`<div class="c-messages__content">
                    ${this.selectedMessagesContent}
                  </div>`}
              <div class="c-messages__footer">
                <div class="c-messages__reply" contenteditable></div>
                <button class="c-messages__button">Reply</button>
              </div>
            `
          : html`<p>Select a messages to read.</p>`}
      </div>
    `;
  }
}
