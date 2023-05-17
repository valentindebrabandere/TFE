
import { css, CSSResult } from 'lit';
import "/src/assets/globalStyles/typoImports.css"

export const basic = css`
  .c-aperçu {
    display: flex;
    flex-direction: column;
    background-color: #fff;
  }

  .c-apercu__content{
    width: 100%;
    height: 100%;
    max-width: 60vw;
    max-height: 60vh;
    aspect-ratio: auto;
    object-fit: contain;
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
