
import { css, CSSResult } from 'lit';
import "/src/assets/globalStyles/typoImports.css"

export const basic = css`

    .c-file{
      position: absolute;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 70px;
      height: 70px;
    }

    .c-file__icon{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
    }
    
    .c-file__icon--image{
        width: 85%;
        aspect-ratio: 1/1;
    }
    
    .c-file__name{
        font-size: calc(10/16*1rem);
        font-weight: 400;
        color: #000;
        max-width: 62px;
        word-wrap: break-word;
        margin: 0;
        margin-top: 5px;
        text-align: center;
    }

`;

// -----------------------------

interface StyleObject {
    styleName: string;
    css: CSSResult;
}
  
const styleOneBit:StyleObject = {
    styleName: "oneBit",
    css: css`
    
    /* CSS here */
    .c-file__icon{
      filter: drop-shadow(1px 2px 3px rgba(0,0,0,0.2));
    }
  
    .c-file__icon--image{
      border: 2px solid #000;
    }
    
    .c-file__name{
      font-size: calc(14/16*1rem);
  
      color: #000;
    }

    `
};
  
const styleModernMac:StyleObject = {
    styleName: "modernMac",
    css: css`

    /* CSS here */

      .c-file__icon{
        filter: drop-shadow(1px 2px 3px rgba(0,0,0,0.2));
    }
    
    .c-file__icon--image{
        border: 2px solid #fff;
    }
    
    .c-file__name{
        color: #fff;
        text-shadow: 1px 1px 3px rgba(0,0,0,0.3);
    }

    `
};

export const styles:StyleObject[] = [styleOneBit, styleModernMac];
