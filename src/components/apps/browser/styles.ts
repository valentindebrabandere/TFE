
import { css, CSSResult } from 'lit';
import "/src/assets/globalStyles/typoImports.css"

export const basic = css`
  .c-browser {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    width: 90vw;
    height: 80vh;
    will-change: transform;
    backface-visibility: hidden;
  }

  .c-browser__content {
    width: 100%;
    height: 100%;
    will-change: transform;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
  }

  .c-browser__iframe{
    will-change: transform;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
  }

  .c-browser__no-content{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: auto;
    width: 35vw;
    height: 30vw;
    will-change: transform;
    backface-visibility: hidden;
  }

  .c-browser__no-content img{ 
    margin-bottom: 25px;
  }
  .c-browser__no-content p{ 
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
      .c-browser {
        background-color: #2D2C2C;
      }

    `
};

export const styles:StyleObject[] = [styleOneBit, styleSkeuo,styleModernMac];
