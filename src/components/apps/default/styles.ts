
import { css, CSSResult } from 'lit';
import "/src/assets/globalStyles/typoImports.css"

export const basic = css`
.c-default{
  width: 35vw;
  height: 30vw;
  background-color: #fff;
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
  padding: 0 24px;
  padding-bottom: 24px;
}

.c-default__icon{
  width: 100px;
  height: 100px;
  margin-bottom: 12px;
}

.c-default__title{
  margin: 0;
}

.c-default__animtxt > p{
  margin: 0;
}

.c-default__animtxt {
  display: flex;
  align-items: center;
}

.c-default__point {
  display: inline-block;
  animation: dot-animation 1s infinite;
}

.c-default__point--1 {
  animation-delay: 0s;
}

.c-default__point--2 {
  animation-delay: 0.2s;
}

.c-default__point--3 {
  animation-delay: 0.4s;
}

@keyframes dot-animation {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
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

const styleGrey:StyleObject = {
    styleName: "grey",
    css: css`
    
    /* CSS here */
    .c-default{
      background-color: #DEDEDE;
    }

    `
};

const styleSkeuo:StyleObject = {
  styleName: "skeuo",
  css: css`
  
  /* CSS here */
  .c-default__animtxt {
    display: flex;
    align-items: center;
    opacity: .7;
  }

  `
};
  
const styleModernMac:StyleObject = {
    styleName: "modernMac",
    css: css`
    .c-default__animtxt {
      display: flex;
      align-items: center;
      opacity: .7;
    }
    `
};

export const styles:StyleObject[] = [styleOneBit, styleGrey, styleSkeuo, styleModernMac];
