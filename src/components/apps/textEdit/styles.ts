
import { css, CSSResult } from 'lit';
import "/src/assets/globalStyles/typoImports.css"

export const basic = css`
  .c-text-edit {
    display: flex;
    flex-direction: column;
    width: 60vw;
    height: 60vh;
    background-color: #fff;
  }

  .text-edit__editor {
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

  .text-edit__editor > * {
    word-break: keep-all;
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

export const styles:StyleObject[] = [styleOneBit, styleSkeuo ,styleModernMac];
