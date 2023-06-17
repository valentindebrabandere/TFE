import { css, CSSResult } from "lit";
import "/src/assets/globalStyles/typoImports.css";

export const basic = css`
  /* CSS here */
  .c-messages {
    position: relative;
    display: flex;
    width: fit-content;
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
    width: 10px;
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
  }

  .c-messages__footer {
    display: flex;
    align-items: center;
    padding: 25px 25px;
    gap: 10px;
    border-top: 1px solid #ddd;
  }

  .c-messages__reply {
    width: 100%;
    height: 100%;
    min-height: 75px;
    padding: 10px;
    border: 1px solid #ddd;
    box-sizing: border-box;
    outline: none;
    resize: none;
  }

  .c-messages__content-container {
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 25px;
  }

  .c-messages__content-container::-webkit-scrollbar {
    width: 10px;
  }

  .c-messages__slot {
    margin: 15px auto;
    font-size: 0.9rem;
    opacity: 0.7;
  }

  /* message item */

  .c-messages-item {
    display: inline-block;
    width: fit-content;
    background: #ddd;
    padding: 10px 15px;
    max-width: 80%;
    border-radius: 10px;
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
  }

  .c-discussion-item__name {
    font-weight: 500;
    color: #000000;
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
      border-radius: 5px;
      border: 1px solid #9c9c9c;
      box-shadow: inset 0 -1px 3px rgba(0, 0, 0, 0.45);
    }

    /* message item */

    .c-messages-item {
      font-family: ".LucidaGrandeUI", "Lucida Grande", "Lucida sans unicode";
      color: black;
      font-size: 1rem;
      padding: 12px 18px;
      display: inline-block;

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

    .c-messages-item--send {
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
        inset 0px 2px 5px rgba(0, 0, 0, 0.2);
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
      transition: box-shadow 0.2s ease-in-out;
    }

    .c-discussion-item:hover {
      border: 1px solid #9c9c9c;
      background-image: -webkit-linear-gradient(
        #ffffff 0%,
        #f1f1f1 30%,
        #eaeaea 45%,
        #dfdfdf 60%,
        #d7d7d7 100%
      );
      box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.2);
      transition: box-shadow 0.2s ease-in-out;
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
