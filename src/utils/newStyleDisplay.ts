import type { StyleObject } from "./styleController";
import { stylesList } from "./styleController";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function newStyleDisplay(style?: StyleObject) {
  if (!style) {
    let index = stylesList.findIndex((element) => element.call == "oneBit");
    style = stylesList[index];
  }

  const styleMenu = document.querySelector(".c-style-menu") as HTMLElement;
  const name = document.querySelector(".c-style-menu__name");
  const date = document.querySelector(".c-style-menu__date");
  const chapter = document.querySelector(".c-style-menu__chapter");
  const items = document.querySelectorAll(".c-style-menu__item");

  if (!styleMenu || !name || !date || !chapter) return;
  styleMenu.style.display = "flex";
  name.textContent = style.name;
  date.textContent = style.date.toString();
  chapter.textContent = style.chapter;

  styleMenu.classList.remove("c-style-menu--hidden");

  await sleep(400);
  name.classList.remove("c-style-menu__item--hidden");

  await sleep(200);
  date.classList.remove("c-style-menu__item--hidden");

  await sleep(100); // Adjusted the timing to maintain the original rhythm
  chapter.classList.remove("c-style-menu__item--hidden");
  
  await sleep(1500);
  styleMenu.classList.add("c-style-menu--hidden");
  items.forEach((item) => {
    item.classList.add("c-style-menu__item--hidden");
  });

}
