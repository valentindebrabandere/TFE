// MessagesComponent.ts
import { html, css } from "lit";
import { customElement, state, property } from "lit/decorators.js";

import { StyledElement } from "../../../utils/globalStyledElement";
import { basic, styles } from "./styles";
import "./MessagesItemComponent";
import "./DiscussionItemComponent";

@customElement("messages-component")
export class Messages extends StyledElement {
  @property({ type: String, attribute: "filelink" }) filelink:
    | string
    | undefined;

  @state() discussions: any[] = [];
  @state() selectedDiscussion: any = null;
  @state() styles = [basic, css``];
  @state() currentStyle = "";

  async connectedCallback() {
    super.connectedCallback();
    this.updateStyles();
    this.classList.add("c-messages");
    this.classList.add("c-app");
    if (this.filelink) {
      this.discussions = await this.fetchDiscussions(this.filelink);
      this.sortDiscussions();
      this.selectDiscussion(this.discussions[0]);
    } else {
      this.discussions = await this.fetchDiscussions(
        `/content/${this.currentStyle}/messages/messages.json`
      );
      this.selectDiscussion(this.discussions[0]);
      this.sortDiscussions();
    }
  }

  async fetchDiscussions(filelink: string): Promise<any[]> {
    if (!filelink) return this.discussions;
    try {
      const response = await fetch(filelink);
      const discussions = await response.json();
      return discussions;
    } catch (error) {
      return this.discussions;
    }
  }

  selectDiscussion(discussion: any) {
    this.selectedDiscussion = discussion;
  }

  sortDiscussions() {
    this.discussions.sort((a, b) => {
      const lastMessageA = a.chats
        .slice()
        .reverse()
        .find((item: any) => item.type === "message");
      const lastMessageB = b.chats
        .slice()
        .reverse()
        .find((item: any) => item.type === "message");
      return (
        new Date(lastMessageB?.timestamp).getTime() -
        new Date(lastMessageA?.timestamp).getTime()
      );
    });
  }

  updateStyles() {
    this.styles = this.applyStyles(styles, basic);
    this.currentStyle = this.globalStyleController.style;
  }

  // Helper functions to format date and time
  formatDate(dateTime: Date) {
    const year = dateTime.getFullYear();
    const month = (dateTime.getMonth() + 1).toString().padStart(2, "0");
    const day = dateTime.getDate().toString().padStart(2, "0");
    return `${day}-${month}-${year}`;
  }

  formatTime(dateTime: Date) {
    const hour = dateTime.getHours().toString().padStart(2, "0");
    const minute = dateTime.getMinutes().toString().padStart(2, "0");
    return `${hour}:${minute}`;
  }

  render() {
    return html`
      <style>
        ${this.styles}
      </style>
      
      <div class="c-messages__list">
        ${this.discussions.map(
          (discussion) => html`
            <discussion-item-component
              .discussion="${discussion}"
              @click="${() => this.selectDiscussion(discussion)}"
            ></discussion-item-component>
          `
        )}
      </div>
      
      <div class="c-messages__content-container">
        ${this.selectedDiscussion
          ? html`
              <!-- Iterate through all the chats in the discussion -->
              ${this.selectedDiscussion.chats.reduce((acc: any[], chat: any, index: number, chats: any[]) => {
                // Get the current chat date
                const currentChatDate = new Date(chat.timestamp);
                // Get the next chat
                const nextChat = chats[index + 1];
                // Get the next chat date
                const nextChatDate = nextChat ? new Date(nextChat.timestamp) : null;
                // Add date and time separator if it's the first chat or if the date has changed
                if (index === 0 || (index > 0 && currentChatDate.getDate() !== new Date(chats[index - 1].timestamp).getDate())) {
                  acc.push(html`<div class="c-messages__day">${this.formatDate(currentChatDate)} ${this.formatTime(currentChatDate)}</div>`);
                } else if (nextChatDate && nextChatDate.getTime() - currentChatDate.getTime() > 30 * 60 * 1000) { // Add time separator if the time difference between the current chat and the next one is more than 30 minutes
                  acc.push(html`<div class="c-messages__slot">${this.formatTime(nextChatDate)}</div>`);
                }
                // Add the chat
                acc.push(html`<messages-item-component .chat="${chat}"></messages-item-component>`);
                return acc;
              }, [])}
            `
          : html`<p>Select a discussion to see the chats.</p>`}
      </div>
    `;
  }
  
}
