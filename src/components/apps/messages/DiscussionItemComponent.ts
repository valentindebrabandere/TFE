// DiscussionItemComponent.ts
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import {formatDate} from './formatDate';

interface Chat {
  send: boolean;
  timestamp: string;
  content: string | null;
  fileType: string;
  filelink: string;
  type: string;
}

interface Discussion {
  name: string;
  notif: number;
  profilePic: string;
  chats: Chat[];
}

@customElement('discussion-item-component')
export class DiscussionItemComponent extends LitElement {
  @property({ type: Object }) discussion: Discussion = {
    name: "",
    notif: 0,
    profilePic: "",
    chats: []
  };

  connectedCallback(): void {
    super.connectedCallback();
    this.classList.add("c-discussion-item");
  }

  createRenderRoot() {
    return this;
  }

  render() {
    const lastChat = this.discussion.chats[this.discussion.chats.length - 1];
    let content = '';

    if (lastChat) {
      if (lastChat.content) {
        content = lastChat.content;
      } else if (lastChat.fileType) {
        content = `${this.discussion.name} sent a ${lastChat.fileType}`;
      }
    }

    return html`
      <div class="c-discussion-item__head">
        <img class="c-discussion-item__profile" src="${this.discussion.profilePic || "content/messages/profilesPicures/default.png"}" alt="profile picture">
        <p class="c-discussion-item__name">${this.discussion.name}</p>
        <p class="c-discussion-item__date">${lastChat ? formatDate(lastChat.timestamp) : ""}</p>
      </div>
      <div class="c-discussion-item__content">
        ${content}
      </div>
      <div class="c-discussion-item__notif">
        ${this.discussion.notif > 0 ? this.discussion.notif : ""}
      </div>
    `;
  }


}
