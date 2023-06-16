// MessagesComponent.ts
import { html, css } from "lit";
import { customElement, state, property } from "lit/decorators.js";

import { StyledElement } from "../../../utils/globalStyledElement";
import { basic, styles } from "./styles";
import "./MessagesItemComponent";
import "./DiscussionItemComponent";

@customElement("messages-component")
export class Messages extends StyledElement {
  @property({ type: String, attribute: "filelink" }) filelink: string | undefined;

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
      const lastChatA = a.chats[a.chats.length - 1];
      const lastChatB = b.chats[b.chats.length - 1];
      return new Date(lastChatB.timestamp).getTime() - new Date(lastChatA.timestamp).getTime();
    });
  }

  updateStyles() {
    this.styles = this.applyStyles(styles, basic);
    this.currentStyle = this.globalStyleController.style;
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
              ${this.selectedDiscussion.chats.map(
                (chat:Object) => html`
                  <messages-item-component .chat="${chat}"></messages-item-component>
                `
              )}
            `
          : html`<p>Select a discussion to see the chats.</p>`}
      </div>
    `;
  }
}
