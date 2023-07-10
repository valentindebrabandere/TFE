import { css, CSSResult } from "lit";

export const basic = css`
  /* CSS here */
  .c-messages {
    position: relative;
    display: flex;
    width: 70vw;
    height: 70vh;
    overflow: hidden;
  }

  .c-messages__list {
    width: 30%;
    height: 100%;
    max-height: 100%;
    overflow-y: scroll;
    border-right: 1px solid #e0e0e0;
  }

  .c-messages__list::-webkit-scrollbar {
    display: none;
  }

  .c-messages__right {
    width: 70%;
    min-height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }

  .c-messages__header {
    display: flex;
    align-items: center;
    height: 7.5%;
    justify-content: space-between;
    padding: 10px 25px;
    margin-bottom: auto;
    border-bottom: 1px solid #ddd;
  }

  .c-messages__pp {
    width: 50px;
    height: 50px;
    border-radius: 20%;
    margin-right: 18px;
    box-shadow: 0 2px 2px #000;
  }

  .c-messages__footer {
    display: flex;
    align-items: center;
    padding: 15px 25px;
    gap: 10px;
    border-top: 1px solid #ddd;
  }

  .c-messages__reply {
    width: 100%;
    height: 100%;
    min-height: 20px;
    max-height: 100px;
    overflow-y: auto;
    padding: 10px;
    border: 1px solid #ddd;
    box-sizing: border-box;
    outline: none;
    resize: none;
  }

  .c-messages__reply::-webkit-scrollbar {
    display: none;
  }

  .c-messages__content-container {
    overflow-y: auto;
  }

  .c-messages__content-container::-webkit-scrollbar {
    display: none;
  }

  .c-messages__chat {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 25px;
  }

  .c-messages__slot {
    margin: 15px auto;
    font-size: 0.9rem;
    opacity: 0.7;
  }

  .c-messages__slot--day {
    margin: 25px auto;
  }

  /* message item */

  .c-messages-item {
    display: inline-block;
    width: fit-content;
    margin-bottom: 5px;
    max-width: 50%;
    border-radius: 10px;
  }

  .c-messages-item--text {
    padding: 10px 15px;
    line-height: 1.5;
    background: #ddd;
  }

  .c-messages-item__image {
    max-width: 100%;
    max-height: 450px;
    object-fit: cover;
    overflow: hidden;
    border-radius: 10px;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  }

  .image-preview-overlay {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.8);
    z-index: 2;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  
  .image-preview {
    max-width: 90%;
    max-height: 90%;
  }

  .c-messages-item--vocal {
    padding: 10px 15px;
    background: #ddd;
    display: flex;
    align-items: center;
    width: 60%;
    max-width: 400px;
  }

  .c-message-vocal__button {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: transparent;
    overflow: hidden;
    box-sizing: border-box;
    color: white;
    cursor: pointer;
}

.c-message-vocal__icon{
    fill: black;
    width: 20px;
    height: 20px;
}


  .c-message-vocal__progress-bar {
    flex-grow: 1;
    height: 5px;
    background-color: #ddd;
    margin-left: 15px;
    border-radius: 5px;
    overflow: hidden;
  }

  .c-message-vocal__progress {
    height: 5px;
    background-color: #007BFF;
  }
  
  .c-messages-item p {
    margin: 0;
  }

  .c-messages-item--send {
    margin-left: auto;
  }

  .c-messages-item--received {
    margin-right: auto;
  }

  /* discussion */

  .c-discussion-item {
    position: relative;
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
    padding: 10px 10px;
    box-sizing: border-box;
    border-bottom: 1px solid #e0e0e0;
    cursor: pointer;
    transition: padding-left 0.2s ease-in-out;
  }

  .c-discussion-item p {
    margin: 0;
  }

  .c-discussion-item:hover {
    background: #e0e0e0;
  }

  .c-discussion-item__infos {
    display: flex;
    flex-direction: column;
    gap: 6px;
    width: 100%;
    max-width: calc(100% - 60px);
  }

  .c-discussion-item__top-infos {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  .c-discussion-item__img {
    position: relative;
  }

  .c-discussion-item__profile {
    width: 50px;
    height: 50px;
    border-radius: 20%;
    box-shadow: 0 2px 2px #000;
  }

  .c-discussion-item__name {
    font-weight: 500;
    color: #000000;
    text-shadow: 0 -0.5px 1px rgba(0, 0, 0, 0.4);
  }

  .c-discussion-item__date {
    font-size: 0.9rem;
    font-weight: 400;
    color: #000000;
    margin-left: 3px !important;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .c-discussion-item__content {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 0.9rem;
  }

  .c-discussion-item__notif {
    position: absolute;
    top: 10%;
    left: 85%;
    transform: translate(-50%, -50%);
    width: 20px;
    height: 20px;
    border-radius: 50%;
    color: #ffffff;
    background: #ff0000;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
    font-weight: 500;
  }
`;

interface StyleObject {
  styleName: string;
  css: CSSResult;
}

const styleSkeuo: StyleObject = {
  styleName: "skeuo",
  css: css`
    /* CSS here */

    .c-messages__list {
      background-color: #ffffff;
      filter: drop-shadow(-3px 0px 3px rgba(0, 0, 0, 0.75));
    }

    .c-messages__right {
      background-color: #e1e8f2;
    }

    .c-messages__header {
      z-index: 1;
      background-image: -webkit-linear-gradient(#c6d1e5 0%, #6a7ea3 100%);
    }

    .c-messages__title {
      font-size: 1.2rem;
      color: #ffffff;
      font-weight: 500;
      text-shadow: 0 -1px 1px rgba(0, 0, 0, 0.4);
    }

    .c-messages__footer{
      border: 1px solid #9c9c9c;
      background-image: -webkit-linear-gradient(
        #ffffff 0%,
        #f1f1f1 30%,
        #eaeaea 45%,
        #dfdfdf 60%,
        #e7e7e7 100%
      );
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.25),
      inset 0px -20px 15px -15px rgba(0, 0, 0, 0.3);
    }

    .c-messages__reply{
      background-color: #ffffff;
      border-radius: 25px;
      padding: 15px 20px;
      border: 1px solid #9c9c9c;
      box-shadow: inset 0 -1px 3px rgba(0, 0, 0, 0.45);
    }

    /* message item */

    .c-messages-item--text, .c-messages-item--vocal {
      font-family: ".LucidaGrandeUI", "Lucida Grande", "Lucida sans unicode";
      color: black;
      font-size: 1rem;
      padding: 12px 18px;

      background-image: -webkit-linear-gradient(
        #ffffff 0%,
        #f1f1f1 30%,
        #eaeaea 45%,
        #e5e5e5 60%,
        #f7f7f7 100%
      );
      border-radius: 25px;
      box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.35),
        0px 5px 5px rgba(0, 0, 0, 0.1),
        inset 0px -5px 10px rgba(255, 255, 255, 0.4),
        inset 0px 2px 5px rgba(0, 0, 0, 0.2);
      text-shadow: 0 1px 1px rgba(255, 255, 255, 0.7);
    }

    .c-messages-item--text.c-messages-item--send, .c-messages-item--vocal.c-messages-item--send {
      background-image: -webkit-linear-gradient(
        #b6db7c 0%,
        #aed96e 18%,
        #8dcb52 39%,
        #86cd57 70%,
        #a3d971 91.72%,
        #b2e07c 100%
      );
      box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.35),
        0px 5px 5px rgba(0, 0, 0, 0.1),
        inset 0px -5px 10px rgba(255, 255, 255, 0.4),
        inset 0px 5px 10px rgba(255, 255, 255, 0.4),
        inset 0px 2px 5px rgba(0, 0, 0, 0.2);
    }

    /* message item vocal */
    .c-messages-item--vocal {
      padding: 10px 15px 10px 10px;
    }
  
    .c-message-vocal__button {
      width: 40px;
      height: 40px;
      color: #fff;
      border: 1px solid #9C9C9C;
      border-color: #705ebb;
      background-image: -webkit-linear-gradient(#acc5e9 0%, #a3c0f2 18%,
              #61a0ed 39%, #55a3f2 70%,
              #82c2f1 91.72%, #9AD2F2 100%);
      box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.35);
      }
  
  .c-message-vocal__icon{
    fill: white;
    width: 20px;
    height: 20px;
    filter: drop-shadow(0px 1px 1px rgba(0, 0, 0, 0.5));
  }

  .c-message-vocal__progress-bar {
    height: 10px;
    overflow: hidden;
    box-shadow: inset 0px 1px 1px rgba(0, 0, 0, 0.2),
     0px 1px 3px rgba(0, 0, 0, 0.4);
  }

  .c-message-vocal__progress {
    height: 100%;
    background-image: -webkit-linear-gradient(#acc5e9 0%, #a3c0f2 18%,
      #61a0ed 39%, #55a3f2 70%,
      #82c2f1 91.72%, #9AD2F2 100%);
    box-shadow: inset 0px 1px 1px rgba(0, 0, 0, 0.2);
  }

    /* discussion */

    .c-discussion-item {
      border: 1px solid #9c9c9c;
      background-image: -webkit-linear-gradient(
        #ffffff 0%,
        #f1f1f1 30%,
        #eaeaea 45%,
        #dfdfdf 60%,
        #d7d7d7 100%
      );
      transition: box-shadow 0.2s ease-in-out, background-image 0.2s ease-in-out;
    }

    .c-discussion-item--selected{
      background-image: -webkit-linear-gradient(
        #dddddd 0%,
        #d1d1d1 30%,
        #cacaca 45%,
        #bebebe 60%,
        #b7b7b7 100%
      );
      transition: box-shadow 0.2s ease-in-out, background-image 0.2s ease-in-out;
    }

    .c-discussion-item:hover {
      background-image: -webkit-linear-gradient(
        #eeeeee 0%,
        #e1e1e1 30%,
        #dadada 45%,
        #cecece 60%,
        #c7c7c7 100%
      );
      box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.2);
      transition: box-shadow 0.2s ease-in-out, background-image 0.2s ease-in-out;
    }

    .c-discussion-item__notif {
      border: 1.5px solid #ffffff;
      box-sizing: border-box;
      box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.5),
        inset 0 5px 7px rgba(255, 255, 255, 0.5),
        inset 0 -2px 4px rgba(0, 0, 0, 0.2);
    }
  `,
};

const styleModernMac: StyleObject = {
  styleName: "modernMac",
  css: css``,
};

export const styles: StyleObject[] = [styleSkeuo, styleModernMac];
