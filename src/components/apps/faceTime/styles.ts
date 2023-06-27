import { css, CSSResult } from "lit";
import "/src/assets/globalStyles/typoImports.css";

export const basic = css`
  .c-faceTime {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: #fff;
    min-width: 300px;
    min-height: 500px;

    overflow: hidden;
  }

  .c-facetime__call{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 25px 40px;

    z-index: 1;
    max-width: 300px;
    flex:1;
    color: #fff;
  }

  .c-facetime__call h2{
    font-size: 1.5rem;
    font-weight: 300;
    margin: 0;
    text-align: center;
  }

  .c-facetime__call-contact{
    width: 75px;
    height: 75px;
    border-radius: 50%;
    border: 2px solid #fff;
  }

  .c-facetime__call-footer{
    display: flex;
    flex-direction: row;
    gap: 25px;
  }

  .c-facetime__btn{
    background-color: transparent;
    border: none;
    cursor: pointer;
    outline: none;
    color: #fff;
  }

  .c-facetime__btn-icon{
    transition: 0.2s ease-in-out;
  }

  .c-facetime__btn-icon:hover{
    scale: 1.1;
    transition: 0.2s ease-in-out;
  }

  .c-facetime__call-img{
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -1;
    object-fit: cover;
    scale: 1.1;
    pointer-events: none;
    filter: blur(5px) brightness(0.5);
  }

  .c-faceTime__user{
    position: absolute;
    top: 10px;
    right: 10px;

    width: 130px;
    height: auto;

    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
    pointer-events: auto;
    z-index: 1;
  }

  .c-faceTime__content {
    width: 100%;
    height: 100%;
    max-width: 60vw;
    max-height: 75vh;
    aspect-ratio: auto;
    object-fit: contain;
    pointer-events: none;

    scale: 1.1;
    z-index: -1;
  }

  .c-faceTime__no-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 35vw;
    height: 30vw;
    box-sizing: border-box;
    padding: 25px;
  }

  .c-faceTime__no-content p {
    opacity: 0.5;
  }

  .c-faceTime__controls {
    position: absolute;
    bottom: 25px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    box-sizing: border-box;
    flex-direction: column;
    align-items: center;

    gap: 10px;

    background-color: transparent;
  }

  .c-faceTime__controls > p {
    opacity: 0.5;
    color: #fff;
  }

`;

interface StyleObject {
  styleName: string;
  css: CSSResult;
}

export const styles: StyleObject[] = [];
