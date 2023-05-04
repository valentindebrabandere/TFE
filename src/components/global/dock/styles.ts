
import { css, CSSResult } from 'lit';
import "/src/assets/globalStyles/typoImports.css"

export const basic = css`
/* -----------------------------
=dock
----------------------------- */

.c-dock{
  display: flex;
  align-self: center;
  gap: 10px;
  justify-content: center;
  align-items: center;

  width: fit-content;
  min-width: 500px;
  max-width: 90vw;
  height: 70px;
  padding: 0 20px;

  margin: 0 auto;
  margin-bottom: 6px;

  background-color: #000;
   
  z-index: 99;
}

.c-dock__static{
  width: fit-content;
  height: 100%;
}

.c-dock__active::before{
  content: "";
  width: 1.5px;
  height: 70%;
  background-color: #fff;
}

.c-dock__active{
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
  height: 100%;
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

    .c-dock{
      background: #fff;
      border: 2px solid #000;
      width: 100%;
      height: 45px;
    }

    .c-dock__active::before{
      width: 2px;
      height: 100%;
      background-color: #000;
    }
    `
};
  
const styleModernMac:StyleObject = {
    styleName: "modernMac",
    css: css`
        .c-dock{
          border-radius: 15px;
          background: #ffffff4a;

          backdrop-filter: blur(5px);
          -webkit-backdrop-filter: blur(5px);
          filter: drop-shadow(0px 9px 10px rgba(21, 21, 15, 0.5));
          -webkit-filter: drop-shadow(0px 9px 10px rgba(21, 21, 15, 0.5));
        }

        .c-dock__active::before{
          border-radius: 15px;
          background-color: #ffffff4b
        }


    `
};

export const styles:StyleObject[] = [styleOneBit, styleModernMac];
