
import { css, CSSResult } from 'lit';
import "/src/assets/globalStyles/typoImports.css"

export const basic = css`

    .c-appicon{
      position: relative;
      display: inline-block;
      height: 100%;
    }

    .c-dock__app{
      height: 100%;
    }

    .c-dock__icon{
      height: 90%;
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


    `
};
  
const styleModernMac:StyleObject = {
    styleName: "modernMac",
    css: css`

    /* CSS here */

    .c-dock__icon{
      position: relative;
      transform-origin: bottom center;
      transition: transform 0.2s ease-in-out;
    }

    .c-appicon--active::before{
      content: "";
      position: absolute;
      bottom: 3px;
      left: 50%;
      transform: translate3d(-50%,-50%,0);
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background-color: #ffffffab;
    }

    `
};

export const styles:StyleObject[] = [styleOneBit, styleModernMac];
