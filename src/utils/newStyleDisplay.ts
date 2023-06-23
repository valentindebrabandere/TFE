
import type { StyleObject } from "./styleController";
import { stylesList } from "./styleController";

export function newStyleDisplay(style?: StyleObject) {

    if (!style) {
        let index = stylesList.findIndex((element) => element.call == "oneBit");
        style = stylesList[index];
    }

    let styleMenu = document.querySelector(".c-style-menu") as HTMLElement;
    let styleMenuName = document.querySelector(".c-style-menu__name");
    let styleMenuDate = document.querySelector(".c-style-menu__date");
    let styleMenuChapter = document.querySelector(".c-style-menu__chapter");
  
    if (!styleMenu || !styleMenuName || !styleMenuDate || !styleMenuChapter) return;
    styleMenu.style.display = "flex";
  
    styleMenuName.textContent = style.name;
    styleMenuDate.textContent = style.date.toString();
    styleMenuChapter.textContent = style.chapter;

    styleMenu.classList.remove("c-style-menu--hidden");

    
  
    removeStyleMenu();
  }
  

export function removeStyleMenu() {
  let styleMenu = document.querySelector(".c-style-menu");
  setTimeout(() => {
    if (!styleMenu) return;
    styleMenu?.classList.add("c-style-menu--hidden");
  }, 1000);
}
