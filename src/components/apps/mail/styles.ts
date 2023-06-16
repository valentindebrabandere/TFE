
import { css, CSSResult } from 'lit';
import "/src/assets/globalStyles/typoImports.css"

export const basic = css`
  /* CSS here */
  .c-mail {
    position: relative;
    display: flex;
    width: fit-content;
    width: 85vw;
    height: 60vh;
    overflow: hidden;
  }

  .c-mail__list {
    width: 30%;
    height: 100%;
    max-height: 100%;
    overflow-y: scroll;
  }

  .c-mail__list::-webkit-scrollbar {
    width: 10px;
  }

  .c-mail__content-container{
    width: 70%;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 100%;
  }
  .c-mail__content-container::-webkit-scrollbar{
    width: 10px;
  }

  /* Mail content */

  .c-mail-content__head {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    border-bottom: 1px solid #ddd;
    height: 75px;
    padding: 25px 25px 20px;
  }

  .c-mail-content__infos {
    display: flex;
    flex-direction: column;
    gap: 35px;
    align-items: flex-start;
  }

  .c-mail-content__from {
    font-weight: bold;
    margin: 0;
  }

  .c-mail-content__object {
    font-weight: bold;
    margin: 0;
  }

  .c-mail-content__date {
    font-size: 0.8rem;
    opacity: .7;
    margin: 0;
  }

  .c-mail__content {
    padding: 25px 25px;
    line-height: 1.5rem;
  }

  .c-mail__footer {
    display: flex;
    flex-direction: column;
    padding: 25px 25px;
    border-top: 1px solid #ddd;
  }

  .c-mail__reply {
    width: 100%;
    height: 100%;
    min-height: 75px;
    padding: 10px;
    border: 1px solid #ddd;
    box-sizing: border-box;
    outline: none;
    resize: none;
  }

  .c-mail__button {
    width: fit-content;
    height: 40px;
    margin-left:auto;
    margin-top: 10px;
    border: none;
    outline: none;
    background-color: #ddd;
    cursor: pointer;
  }

  /* Mail item */

  .c-mail-item{
    display: block;
    padding: 10px;
    cursor: pointer;
    background-color: white;
    border-bottom: 1px solid #ddd;
  }
  .c-mail-item[read] {
    background-color: #ddd;
  }

  .c-mail-item__head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }

  .c-mail-item__from {
    max-width: 50%;
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 0;
  }
  
  .c-mail-item__date {
    font-size: 0.8rem;
    opacity: .7;
    margin: 0;
  }

  .c-mail-item__object {
    font-weight: bold;
    margin: 10px 0;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .c-mail-item__content {
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

  .c-mail-content__head {
    background: #cac6cb;
    box-shadow: inset -1px -1px 0 0 #464147, inset 1px 1px 0 0 white, inset -2px -2px 0 0 #a099a1, inset 2px 2px 0 0 #dedcde;
  }

  .c-mail__content {
    padding: 50px 25px;
  }

  .c-mail__footer {
    background: #cac6cb;
    box-shadow: inset -1px -1px 0 0 #464147, inset 1px 1px 0 0 white, inset -2px -2px 0 0 #a099a1, inset 2px 2px 0 0 #dedcde;
  }

  .c-mail__reply {
    background: #cac6cb;
    box-shadow: inset -1px -1px 0 0 white, inset 1px 1px 0 0 #464147, inset -2px -2px 0 0 #dedcde, inset 2px 2px 0 0 #cac6cb;
  }

  .c-mail__button {
    background: #cac6cb;
    box-shadow: inset -1px -1px 0 0 #464147, inset 1px 1px 0 0 white, inset -2px -2px 0 0 #a099a1, inset 2px 2px 0 0 #dedcde;
  }

  .c-mail__button:hover {
    box-shadow: inset -1px -1px 0 0 white, inset 1px 1px 0 0 #464147, inset -2px -2px 0 0 #dedcde, inset 2px 2px 0 0 #cac6cb;
  }


  /* Mail item */

  .c-mail-item{
    background: #cac6cb;
    box-shadow: inset -1px -1px 0 0 #464147, inset 1px 1px 0 0 white, inset -2px -2px 0 0 #a099a1, inset 2px 2px 0 0 #dedcde;
  }
  .c-mail-item[read] {
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
