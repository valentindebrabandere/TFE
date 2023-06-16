
import { css, CSSResult } from 'lit';
import "/src/assets/globalStyles/typoImports.css"

export const basic = css`
  /* CSS here */
  .c-messages {
    position: relative;
    display: flex;
    width: fit-content;
    width: 85vw;
    height: 70vh;
    overflow: hidden;
  }

  .c-messages__list {
    width: 30%;
    height: 100%;
    max-height: 100%;
    overflow-y: scroll;
  }

  .c-messages__list::-webkit-scrollbar {
    width: 10px;
  }

  .c-messages__content-container{
    width: 70%;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 100%;
  }
  .c-messages__content-container::-webkit-scrollbar{
    width: 10px;
  }

  /* Messages content */

  .c-messages-content__head {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    border-bottom: 1px solid #ddd;
    height: 75px;
    padding: 25px 25px 20px;
  }

  .c-messages-content__infos {
    display: flex;
    flex-direction: column;
    gap: 35px;
    align-items: flex-start;
  }

  .c-messages-content__from {
    font-weight: bold;
    margin: 0;
  }

  .c-messages-content__object {
    font-weight: bold;
    margin: 0;
  }

  .c-messages-content__date {
    font-size: 0.8rem;
    opacity: .7;
    margin: 0;
  }

  .c-messages__content {
    padding: 25px 25px;
    line-height: 1.5rem;
  }

  .c-messages__footer {
    display: flex;
    flex-direction: column;
    padding: 25px 25px;
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

  .c-messages__button {
    width: fit-content;
    height: 40px;
    margin-left:auto;
    margin-top: 10px;
    border: none;
    outline: none;
    background-color: #ddd;
    cursor: pointer;
  }

  /* Messages item */

  .c-messages-item{
    display: block;
    padding: 10px;
    cursor: pointer;
    background-color: white;
    border-bottom: 1px solid #ddd;
  }
  .c-messages-item[read] {
    background-color: #ddd;
  }

  .c-messages-item__head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }

  .c-messages-item__from {
    max-width: 50%;
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 0;
  }
  
  .c-messages-item__date {
    font-size: 0.8rem;
    opacity: .7;
    margin: 0;
  }

  .c-messages-item__object {
    font-weight: bold;
    margin: 10px 0;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .c-messages-item__content {
    font-size: 0.9rem;
    opacity: .7;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 0;
  }

`;

interface StyleObject {
    styleName: string;
    css: CSSResult;
}
  
const styleOneBit:StyleObject = {
    styleName: "oneBit",
    css: css`
    
    /* CSS here */

    `
};

const styleGrey:StyleObject = {
  styleName: "grey",
  css: css`
  
  /* CSS here */

  .c-messages-content__head {
    background: #cac6cb;
    box-shadow: inset -1px -1px 0 0 #464147, inset 1px 1px 0 0 white, inset -2px -2px 0 0 #a099a1, inset 2px 2px 0 0 #dedcde;
  }

  .c-messages__content {
    padding: 50px 25px;
  }

  .c-messages__footer {
    background: #cac6cb;
    box-shadow: inset -1px -1px 0 0 #464147, inset 1px 1px 0 0 white, inset -2px -2px 0 0 #a099a1, inset 2px 2px 0 0 #dedcde;
  }

  .c-messages__reply {
    background: #cac6cb;
    box-shadow: inset -1px -1px 0 0 white, inset 1px 1px 0 0 #464147, inset -2px -2px 0 0 #dedcde, inset 2px 2px 0 0 #cac6cb;
  }

  .c-messages__button {
    background: #cac6cb;
    box-shadow: inset -1px -1px 0 0 #464147, inset 1px 1px 0 0 white, inset -2px -2px 0 0 #a099a1, inset 2px 2px 0 0 #dedcde;
  }

  .c-messages__button:hover {
    box-shadow: inset -1px -1px 0 0 white, inset 1px 1px 0 0 #464147, inset -2px -2px 0 0 #dedcde, inset 2px 2px 0 0 #cac6cb;
  }


  /* Messages item */

  .c-messages-item{
    background: #cac6cb;
    box-shadow: inset -1px -1px 0 0 #464147, inset 1px 1px 0 0 white, inset -2px -2px 0 0 #a099a1, inset 2px 2px 0 0 #dedcde;
  }
  .c-messages-item[read] {
    box-shadow: inset -1px -1px 0 0 white, inset 1px 1px 0 0 #464147, inset -2px -2px 0 0 #dedcde, inset 2px 2px 0 0 #cac6cb;
  }

  `
};
const styleSkeuo:StyleObject = {
  styleName: "skeuo",
  css: css`
  
  /* CSS here */

  `
};
  
const styleModernMac:StyleObject = {
    styleName: "modernMac",
    css: css`
    
    `
};

export const styles:StyleObject[] = [styleOneBit, styleGrey, styleSkeuo,styleModernMac];
