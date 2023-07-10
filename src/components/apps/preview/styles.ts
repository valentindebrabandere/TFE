
import { css, CSSResult } from 'lit';

export const basic = css`
  .c-preview {
    display: flex;
    flex-direction: column;
    background-color: #fff;
  }

  .c-preview__content{
    width: 100%;
    height: 100%;
    max-width: 60vw;
    max-height: 75vh;
    aspect-ratio: auto;
    object-fit: contain;
  }

  .c-preview__no-content{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 35vw;
    height: 30vw;
  }

  .c-preview__no-content p{ 
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
      .c-preview {
        background-color: #2D2C2C;
      }

    `
};

export const styles:StyleObject[] = [styleOneBit, styleSkeuo,styleModernMac];
