
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

  .c-apecu__no-content{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 35vw;
    height: 30vw;
  }

  .c-apecu__no-content p{ 
    opacity: 0.5;
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

const styleSkeuo:StyleObject = {
    styleName: "skeuo",
    css: css`
    
    /* CSS here */

    `
};
  
const styleModernMac:StyleObject = {
    styleName: "modernMac",
    css: css`
      .c-aperçu {
        background-color: #2D2C2C;
      }

    `
};

export const styles:StyleObject[] = [styleOneBit, styleSkeuo,styleModernMac];
