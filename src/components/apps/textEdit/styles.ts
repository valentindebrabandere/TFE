
import { css, CSSResult } from 'lit';

export const basic = css`
  .c-text-edit {
    display: flex;
    flex-direction: column;
    width: 60vw;
    height: 60vh;
    background-color: #fff;
  }

  .c-text-edit__editor {
    width: 100%;
    height: 100%;
    flex-grow: 1;
    padding: 2rem 8%;
    border: none;
    outline: none;
    font-size: 16px;
    line-height: 1.4;
    overflow-y: auto;
    box-sizing: border-box;
  }

  .c-text-edit__editor > * {
    word-break: keep-all;
}

.c-text-edit__editor[data-placeholder]:empty::before {
  content: attr(data-placeholder);
  color: gray;
  pointer-events: none;
}

  p{
    margin-top: 0;
  }

  h2{
    margin-bottom: 6px;
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

    ::selection {
      background-color: black;
      color: white;
    }

    `
};

const styleGrey:StyleObject = {
  styleName: "grey",
  css: css`
  
  /* CSS here */

  .c-text-edit {
    background-color: #DEDEDE;
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
