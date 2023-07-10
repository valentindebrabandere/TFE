import { css, CSSResult } from "lit";

export const basic = css`
  .c-video {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: #fff;
  }

  .c-video__content {
    width: 100%;
    height: 100%;
    max-width: 60vw;
    max-height: 75vh;
    aspect-ratio: auto;
    object-fit: contain;
  }

  .c-video__no-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 35vw;
    height: 30vw;
  }

  .c-video__no-content p {
    opacity: 0.5;
  }

  .c-video__controls {
    position: relative;
    box-sizing: border-box;
    background-color: #fff;
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .c-video__controls-play,
  .c-video__controls-stop {
    background-color: #fff;
    border: none;
    padding: 2px;
    color: #000;
    cursor: pointer;
  }

  .c-video__controls-progress {
    width: 50%;
    cursor: pointer;
  }

  .c-video__controls-time {
    padding: 10px;
  }
`;

interface StyleObject {
  styleName: string;
  css: CSSResult;
}

const styleOneBit: StyleObject = {
  styleName: "grey",
  css: css`
    /* CSS here */

    .c-video {
      background-color: #dcd8dd;
    }

    .c-video__controls {
      background: #cac6cb;
      box-shadow: inset -1px -1px 0 0 #464147, inset 1px 1px 0 0 white,
        inset -2px -2px 0 0 #a099a1, inset 2px 2px 0 0 #dedcde;
    }

    .c-video__controls-play {
      background: #cac6cb;
      border: 1px solid #000;
      box-shadow: inset -1px -1px 0 0 #464147, inset 1px 1px 0 0 white,
        inset -2px -2px 0 0 #a099a1, inset 2px 2px 0 0 #dedcde;
    }
    .c-video__controls-play:hover {
      box-shadow: inset -1px -1px 0 0 white, inset 1px 1px 0 0 #464147,
        inset -2px -2px 0 0 #dedcde, inset 2px 2px 0 0 #cac6cb;
    }

    .c-video__controls-time {
      box-shadow: inset -1px -1px 0 0 white, inset 1px 1px 0 0 #464147,
        inset -2px -2px 0 0 #dedcde, inset 2px 2px 0 0 #cac6cb;
    }

    .c-video__controls-progress {
      background: transparent;
      height: 20px;
      -webkit-appearance: none;
      appearance: none; /* Add standard appearance property */
    }
    
    /* Webkit (Chrome, Safari) */
    .c-video__controls-progress::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none; /* Add standard appearance property */
      width: 20px;
      height: 20px;
      transform: translateY(-5px);
      background: #cac6cb;
      box-shadow: inset -1px -1px 0 0 #464147, inset 1px 1px 0 0 white,
        inset -2px -2px 0 0 #a099a1, inset 2px 2px 0 0 #dedcde;
    }
    
    /* Mozilla Firefox */
    .c-video__controls-progress::-moz-range-thumb {
      width: 20px;
      height: 20px;
      background: #cac6cb;
      box-shadow: inset -1px -1px 0 0 #464147, inset 1px 1px 0 0 white,
        inset -2px -2px 0 0 #a099a1, inset 2px 2px 0 0 #dedcde;
      border-radius: 0;
    }
    
    .c-video__controls-progress::-webkit-slider-runnable-track {
      height: 10px;
      -webkit-appearance: none;
      appearance: none; /* Add standard appearance property */
      border: none;
      background: #000;
      box-shadow: inset -1px -1px 0 0 #464147, inset 1px 1px 0 0 white,
        inset -2px -2px 0 0 #a099a1, inset 2px 2px 0 0 #dedcde;
    }
    
    /* Mozilla Firefox */
    .c-video__controls-progress::-moz-range-track {
      height: 10px;
      border: none;
      background: #000;
      box-shadow: inset -1px -1px 0 0 #464147, inset 1px 1px 0 0 white,
        inset -2px -2px 0 0 #a099a1, inset 2px 2px 0 0 #dedcde;
    }    

  `,
};

const styleSkeuo: StyleObject = {
  styleName: "skeuo",
  css: css`
    /* CSS here */
  `,
};

const styleModernMac: StyleObject = {
  styleName: "modernMac",
  css: css`
    .c-video {
      background-color: #2d2c2c;
    }
  `,
};

export const styles: StyleObject[] = [styleOneBit, styleSkeuo, styleModernMac];
