import { css, CSSResult } from 'lit';

export const basic = css`
.c-window{
  position: absolute;
  display: flex;
  flex-direction: column-reverse;
  width: fit-content;
  height: fit-content; 
  
  overflow: hidden;
  pointer-events: auto;
}

.c-window__head{
    width: 100%;
    height: 40px;
    background-color: #000;
}

.c-window__content{
    width: 100%;
    height: 100%;
}

.c-window__controls{
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    width: fit-content;
    height: 100%;
    list-style: none;
    margin: 0 15px;
    padding: 0;
}

.c-window__control{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 12px;
    height: 12px;
    border: none;
    border-radius: 50%;
    padding: 0;
    overflow: hidden;
}

/* -----------------------------
=states
----------------------------- */

 .state--big{
    left: 0 !important;
    top:0 !important;
}
`;

interface StyleObject {
    styleName: string;
    css: CSSResult;
}
  
const styleOneBit:StyleObject = {
    styleName: "oneBit",
    css: css`
    .c-window {
      background: #C0C0C0;
      border: 2px solid #000;
    }
  
    .c-window__head {
      background: #fff;
      border-bottom: 2px solid #000;
    }
  
    .c-window__controls {
      height: 100%;
      margin: 0 10px;
    }
  
    .c-window__controls>li {
      display: flex;
      align-items: center;
      height: 100%;
    }
  
    .c-window__control {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 20px;
      width: 20px;
      border: 2px solid #000;
      ;
      border-radius: 0;
      padding: 2px;
    }
  
    .c-window__control-icon {
      display: block;
      width: 100%;
      height: auto;
      opacity: 100%;
    }`
};
  
const styleModernMac:StyleObject = {
    styleName: "modernMac",
    css: css`
    .c-window{
      border-radius: 10px;
    
      filter: drop-shadow(0px 9px 10px rgba(21, 21, 15, 0.5));
      -webkit-filter: drop-shadow(0px 9px 10px rgba(21, 21, 15, 0.5));
    }
  
    .c-window__head{
      background-color: #3D3C3C;
    }
  
     .c-window__controls:hover .c-window__control-icon{
       transform: translate3d(0,0,0) rotate(0);
       transition: transform 0.25s ease-in-out;
     }
  
    .c-window__control{
      display: flex;
      justify-content: center;
      align-items: center;
    }
  
    .c-window__control-icon{
      display: block;
      width: 70%;
      height: auto;
      opacity: 70%;
      // transform: translate3d(0,12px,0) rotate(-145deg);
      // transition: transform 0.25s ease-in-out;
    }
  
    .c-window__control--quit{
      background-color: #E0463C;
      border: solid 1px #bd3c33;
    }
    .c-window__control--hide{
      background-color: #D9A623;
      border: solid 1px #b58a1e;
    }
    .c-window__control--scale{
      background-color: #73BE59;
      border: solid 1px #528840;
    }`
};

export const styles:StyleObject[] = [styleOneBit, styleModernMac];
