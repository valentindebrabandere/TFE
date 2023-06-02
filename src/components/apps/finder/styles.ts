
import { css, CSSResult } from 'lit';
import "/src/assets/globalStyles/typoImports.css"

export const basic = css`
  .c-finder {
    display: flex;
    width: 40vw;
    height: 40vh;
    background-color: #fff;
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

    .c-finder {
      background-color: #FFF;
    }

    `
};

const styleGrey:StyleObject = {
  styleName: "grey",
  css: css`
  
  /* CSS here */

  .c-finder {
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
    
    .c-finder {
      background-color: #2D2C2C;
    }

    `
};

export const styles:StyleObject[] = [styleOneBit, styleGrey, styleSkeuo ,styleModernMac];
