
import { css, CSSResult } from 'lit';
import "/src/assets/globalStyles/typoImports.css"

export const basic = css`
  .c-aperçu {
    display: flex;
    flex-direction: column;
    width: 60vw;
    height: 60vh;
    background-color: #fff;
  }

  .aperçu__editor {
    width: 100%;
    height: 100%;
    flex-grow: 1;
    padding: 2rem 8%;
    border: none;
    outline: none;
    font-family: 'Arial', sans-serif;
    font-size: 16px;
    line-height: 1.4;
    overflow-y: auto;
    box-sizing: border-box;
  }

  .aperçu__editor > * {
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

    *,
    *::before,
    *::after {
      font-family: "Munro", system-ui, sans-serif;
      font-weight: normal;
    }
    `
};
  
const styleModernMac:StyleObject = {
    styleName: "modernMac",
    css: css`
    .c-menu-bar{
      backdrop-filter: blur(7px);
      -webkit-backdrop-filter: blur(7px); 
      background-color: #ffffff44;
    }
    *,
    *::before,
    *::after {
      font-family: system-ui, sans-serif;
      font-weight: normal;
      box-sizing:content-box;
    }
    `
};

export const styles:StyleObject[] = [styleOneBit, styleModernMac];
