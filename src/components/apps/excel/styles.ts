
import { css, CSSResult } from 'lit';
import "/src/assets/globalStyles/typoImports.css"

export const basic = css`
  /* CSS here */
  .c-excel {
    display: block;
    width: fit-content;
    height: fit-content;
    max-width: 60vw;
    max-height: 60vh;
    overflow-y: scroll;
  }

  .c-excel table {
    border-collapse: collapse;
    text-align: left;
    table-layout: fixed;
  }

  .c-excel th, .c-excel td {
    width: fit-content;
    padding: 2px 5px;
    border: 1px solid #ddd;
  }

  .c-excel th {
    background-color: #f4f4f4;
  }

  .c-excel tr:nth-child(even) {
    background-color: #f8f8f8;
  }

  :focus-visible {
    outline: 2px solid #000;
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

const styleGrey:StyleObject = {
  styleName: "grey",
  css: css`
  
  /* CSS here */

  .c-text-edit {
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
    
    `
};

export const styles:StyleObject[] = [styleOneBit, styleGrey, styleSkeuo,styleModernMac];
