
import { css, CSSResult } from 'lit';
import "/src/assets/globalStyles/typoImports.css"

export const basic = css`
/* -----------------------------
=menu-bar
----------------------------- */

ul{
  list-style: none;
  margin: 0;
  padding: 0;
}

.c-menu-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
  width: auto;
  height: 25px;
  padding: 0 10px;
  background-color: #fff;
  z-index: 999;
}

.c-menu-bar__left {
  display: flex;
  align-items: center;
  gap: 12px;
  height: 100%;
}

.c-menu-bar__rigth {
  display: flex;
  align-items: center;
  gap: 5px;
  height: 100%;
}

.c-menu-bar__item {
  height: 100%;
}

.c-menubar__application>button {
  font-weight: 600;
}

.c-menu-bar__btn {
  display: flex;
  align-items: center;
  border: none;
  background: none;
  height: 100%;
}

.c-menu-bar__icon {
  height: 85%;
  width: auto;
}

.c-mennubar__btn--date {
  font-weight: 500;
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

    *,
    *::before,
    *::after {
      font-family: "Munro", system-ui, sans-serif;
      font-weight: normal;
    }
    `
};
  
const styleModernMac:StyleObject = {
    styleName: "modernMac",
    css: css`
    .c-menu-bar{
      backdrop-filter: blur(7px);
      -webkit-backdrop-filter: blur(7px); 
      background-color: #ffffff44;
    }
    *,
    *::before,
    *::after {
      font-family: system-ui, sans-serif;
      font-weight: normal;
      box-sizing:content-box;
    }
    `
};

export const styles:StyleObject[] = [styleOneBit, styleModernMac];
