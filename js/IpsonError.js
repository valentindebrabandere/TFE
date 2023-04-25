export default class IpsonError {
  /**
   * Pour construire une AnyWindowBase, il faut lui donner
   * @param {string} applicationName Le nom de l'application dans cette fenetre : Word, Calculator, ...
   */
  constructor(applicationName, iconPath, currentStyle) {
    // les paramêtres réçus sont stoqués
    this.applicationName = applicationName;
    this.iconPath = iconPath;
  }

  /***********************************************************************************************************************
   * display CONSTRUCTION
   **********************************************************************************************************************/

  build() {
    this.display = document.createElement("div");
    this.display.classList.add("c-app-error", "js-app-error");
    this.display.innerHTML = `
      <img
        src="../IpsonSystem/img/dockIcons/appStore.png"
        alt="Aplication icon"
        class="c-app-error__icon js-app-error__icon"
      />
      <h2 class="c-app-error__title js-app-error__title">Impossible d'ouvrir l'App Store</h2>
      <p class="c-app-error__text js-app-error__text">
        L'application est encore en cours de développement.
      </p>
      <div class="c-app-error__allbtns">
        <button class="c-app-error__btn js-app-error__btn">D'accord</button>
        <button
          class="c-app-error__btn js-app-error__btn c-app-error__btn--bleu"
        >
          D'accord en bleu
        </button>
      </div>`;

    this.display.instance = this;
    this.display.setAttribute("data-type", "error");
    this.display.setAttribute("data-drag", "not-draggable");

    this.icon = this.display.querySelector(".js-app-error__icon");
    this.icon.src = this.iconPath;

    this.title = this.display.querySelector(".js-app-error__title");
    this.title.textContent =
      "Impossible d'ouvrir l'application " + this.applicationName;

    this.text = this.display.querySelector(".js-app-error__text");
    this.text.textContent =
      this.applicationName + " est encore en cours de développement";

    this.overlayContainer = document.querySelector(".js-screen__overlay");
    this.overlayContainer.appendChild(this.display);
    this.overlayContainer.style.display = "block";

    this.allBtns = this.display.querySelectorAll(".js-app-error__btn");
    this.allBtns.forEach((btn) => {
      btn.addEventListener("click", (evt) => {
        this.display.remove();
        this.overlayContainer.style.display = "none";
      });
    });
  }
}
