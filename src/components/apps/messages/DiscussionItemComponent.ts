// DiscussionItemComponent.ts
import { html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { formatDate } from "./formatDate";
import { StyledElement } from "../../../utils/globalStyledElement";

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

@customElement("discussion-item-component")
export class DiscussionItemComponent extends StyledElement {
  @property({ type: Object }) discussion: Discussion = {
    name: "",
    notif: 0,
    profilePic: "",
    chats: [],
  };
  @state() currentStyle = "";

  connectedCallback(): void {
    super.connectedCallback();
    this.classList.add("c-discussion-item");
    this.updateStyles();
  }

  createRenderRoot() {
    return this;
  }

  updateStyles() {
    this.currentStyle = this.globalStyleController.style;
  }

  render() {
    const lastChat = this.discussion.chats[this.discussion.chats.length - 1];
    let content = "";

    if (lastChat) {
      if (lastChat.content) {
        content = lastChat.content;
      } else if (lastChat.fileType) {
        content = `${this.discussion.name} sent a ${lastChat.fileType}`;
      }
    }

    return html`
      <div class="c-discussion-item__img">
        <img
          class="c-discussion-item__profile"
          src="${this.discussion.profilePic ||
          "/content/" +
            this.currentStyle +
            "/messages/profilePictures/default.png"}"
          alt="profile picture"
        />
        ${this.discussion.notif > 0
          ? html`<div class="c-discussion-item__notif">
              ${this.discussion.notif}
            </div>`
          : ""}
      </div>
      <div class="c-discussion-item__infos">
        <div class="c-discussion-item__top-infos">
          <p class="c-discussion-item__name">${this.discussion.name}</p>
          <p class="c-discussion-item__date">
            ${lastChat ? formatDate(lastChat.timestamp) : ""}
          </p>
        </div>
        <div class="c-discussion-item__content">${content}</div>
      </div>
    `;
  }
}
