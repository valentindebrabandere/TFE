
import { css, CSSResult } from 'lit';

export const basic = css`
  /* CSS here */
  .c-numbers {
    display: block;
    width: fit-content;
    height: fit-content;
    max-width: 60vw;
    max-height: 60vh;
    overflow: auto;
  }

  .c-numbers table {
    border-collapse: collapse;
    text-align: left;
    table-layout: fixed;
  }

  .c-numbers th, .c-numbers td {
    width: fit-content;
    padding: 2px 5px;
    border: 1px solid #ddd;
  }

  .c-numbers th {
    background-color: #f4f4f4;
  }

  .c-numbers tr:nth-child(even) {
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
