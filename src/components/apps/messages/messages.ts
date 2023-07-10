// MessagesComponent.ts
import { html, css } from "lit";
import { customElement, state, property, query } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";

import { StyledElement } from "../../../utils/globalStyledElement";
import { basic, styles } from "./styles";
import "./messagesItemComponent";
import "./discussionItemComponent";

@customElement("messages-component")
export class Messages extends StyledElement {
  @property({ type: String, attribute: "filelink" }) filelink:
    | string
    | undefined;

  @state() discussions: any[] = [];
  @state() selectedDiscussion: any = null;
  @state() styles = [basic, css``];
  @state() currentStyle = "";
  @state() imagePreviewSrc: string | null = null;
  @query(".c-messages__content-container") chatContainer?: HTMLElement;

  static appName = "Messages";

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
        `/content/${this.currentStyle}/messages/messagesConfig.json`
      );
      this.sortDiscussions();
      this.selectDiscussion(this.discussions[0]);
    }

    this.addEventListener("showImagePreview", (event) => {
      const customEvent = event as CustomEvent;
      this.imagePreviewSrc = customEvent.detail.imageSrc;
    });
  }

  closeImagePreview() {
    this.imagePreviewSrc = null; // hide the image preview
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

  scrollToBottom() {
    if (this.chatContainer) {
      this.chatContainer.scrollTop = this.chatContainer.scrollHeight;
    }
  }

  selectDiscussion(discussion: any) {
    this.selectedDiscussion = discussion;
    this.scrollToBottom();

    setTimeout(() => {
      this.scrollToBottom();
    }, 20);
  }

  sortDiscussions() {
    this.discussions.sort((a, b) => {
      const lastMessageA = a.chats[a.chats.length - 1];
      const lastMessageB = b.chats[b.chats.length - 1];
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
    return `${day}.${month}.${year}`;
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
      ${this.imagePreviewSrc
        ? html`
            <div
              class="image-preview-overlay"
              @click="${this.closeImagePreview}"
            >
              <img
                src="${this.imagePreviewSrc}"
                alt="Image Preview"
                class="image-preview"
              />
            </div>
          `
        : ""}
      <div class="c-messages__list">
        ${this.discussions.map(
          (discussion) => html`
            <discussion-item-component
              class=${classMap({
                "c-discussion-item--selected":
                  this.selectedDiscussion === discussion,
              })}
              .discussion="${discussion}"
              @click="${() => this.selectDiscussion(discussion)}"
            ></discussion-item-component>
          `
        )}
      </div>

      <div class="c-messages__right">
        <div class="c-messages__header">
          <img
            class="c-messages__pp"
            src="${this.selectedDiscussion && this.selectedDiscussion.profilePic
              ? this.selectedDiscussion.profilePic
              : "/content/" +
                this.currentStyle +
                "/messages/profilePictures/default.png"}"
            alt=""
          />
          <p class="c-messages__title">
            ${this.selectedDiscussion ? this.selectedDiscussion.name : ""}
          </p>
          <button class="c-messages__button c-cta c-cta--blue">Détails</button>
        </div>

        <div class="c-messages__content-container">
          <div class="c-messages__chat">
            ${this.selectedDiscussion
              ? html`
                  <!-- Iterate through all the chats in the discussion -->
                  ${this.selectedDiscussion.chats.reduce(
                    (acc: any[], chat: any, index: number, chats: any[]) => {
                      // Get the current chat date
                      const currentChatDate = new Date(chat.timestamp);
                      // Get the next chat
                      const prevChat = chats[index - 1];
                      const prevChatDate = prevChat
                        ? new Date(prevChat.timestamp)
                        : null;
                      // Add date and time separator if it's the first chat or if the date has changed
                      if (
                        index === 0 ||
                        (index > 0 &&
                          currentChatDate.getDate() !==
                            new Date(chats[index - 1].timestamp).getDate())
                      ) {
                        acc.push(
                          html`<div
                            class="c-messages__slot c-messages__slot--day"
                          >
                            ${this.formatDate(currentChatDate)} à
                            ${this.formatTime(currentChatDate)}
                          </div>`
                        );
                      } else if (
                        prevChatDate &&
                        // If the difference between the current chat date and the previous chat date is greater than 1 hour
                        currentChatDate.getTime() - prevChatDate.getTime() >
                          60 * 60 * 1000
                      ) {
                        // Add time separator if the time difference between the current chat and the next one is more than 30 minutes
                        acc.push(
                          html`<div
                            class="c-messages__slot c-messages__slot--hour"
                          >
                            ${this.formatTime(currentChatDate)}
                          </div>`
                        );
                      }
                      // Add the chat
                      acc.push(
                        html`<messages-item-component
                          .chat="${chat}"
                        ></messages-item-component>`
                      );
                      return acc;
                    },
                    []
                  )}
                `
              : html`<p>Select a discussion to see the chats.</p>`}
          </div>
        </div>
        <div class="c-messages__footer">
          <div class="c-messages__reply" contenteditable></div>
          <button class="c-messages__button c-cta c-cta--primary">Reply</button>
        </div>
      </div>
    `;
  }
}
