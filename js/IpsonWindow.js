/**
 * Cette classe sera la base de toute les applications 
 */
export default class IpsonWindow {
  /**
   * Pour construire une AnyWindowBase, il faut lui donner
   * @param {string} windowId l'identifiant unique d'une instance d'application : ie: x12545, x5248, SFLujfwd, etc...
   * @param {string} applicationName Le nom de l'application dans cette fenetre : Word, Calculator, ...
   */
  constructor(windowId, applicationName, iconPath) {
    // les paramêtres réçus sont stoqués
    this.windowId = windowId;
    this.applicationName = applicationName;
    this.iconPath = iconPath;
  }

  /***********************************************************************************************************************
   * display CONSTRUCTION
   **********************************************************************************************************************/

  /**
   * Construction de toute une application
   */
  build() {
    // construction et enregistrement de la window de base
    this.display = this.buildWindow();
    this.display.style.top = myRandom(0, 15) + "vh";
    this.display.style.left = myRandom(0, 50) + "vw";
    // construction et enregistrement de l'application
    this.content = this.buildContent();
    // ajout de l'application dans le display de la window
    this.dockApp = document.createElement("div");
    this.dockApp.classList.add("c-dock__app");
    this.dockApp.classList.add("js-dock__app");
    this.dockApp.classList.add("c-dock__app--active");
    this.icon = document.createElement("img");
    this.icon.classList.add("c-dock__icon");
    this.icon.classList.add("js-dock__icon");
    this.icon.src = this.iconPath;
    this.dockApp.appendChild(this.icon);

    this.windowContent = this.display.querySelector(".js-window__content");
    this.windowContent.appendChild(this.content);

    this.head = this.display.querySelector(".js-window__head");
    this.head.setAttribute("data-drag", "dragger");
    this.activeDock = document.querySelector(".js-dock__active");
    this.container = document.querySelector(".js-container");
  }

  /**
   * Pareil pour toute les application
   * @return {displayDivElement}
   */
  buildWindow() {
    const windowDisplay = document.createElement("div");
    windowDisplay.classList.add("c-window");
    windowDisplay.innerHTML = `<div class="c-window__head js-window__head">
    <ul class="c-window__controls">
      <li>
        <button
        data-window-control="quit"
          class="c-window__control c-window__control--quit"
        >
          <svg   
            class="c-window__control-icon"
            width="11"
            height="11"
            viewBox="0 0 11 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.29468 1.55566L5.81547 5.07645M9.36575 8.62673L5.81547 5.07645M5.81547 5.07645L9.33429 1.55763M5.81547 5.07645L2.26322 8.6287"
              stroke="black"
              stroke-width="2"
            />
          </svg>
        </button>
      </li>
      <li>
        <button
          data-window-control="hide"
          class="c-window__control c-window__control--hide"
        >
          <svg
            class="c-window__control-icon"
            width="11"
            height="11"
            viewBox="0 0 11 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.409668 5.10791H10.4097"
              stroke="black"
              stroke-width="2"
            />
          </svg>
        </button>
      </li>
      <li>
        <button
          data-window-control="scale"
          class="c-window__control c-window__control--scale"
        >
          <svg
            class="c-window__control-icon"
            width="11"
            height="11"
            viewBox="0 0 11 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.32202 1.84436H8.8491V8.37143H2.32202V1.84436Z"
              stroke="black"
              stroke-width="2"
            />
          </svg>
        </button>
      </li>
    </ul>
  </div>
  <div class="c-window__content js-window__content"></div>
  </div>`;
    windowDisplay.instance = this;

    windowDisplay.setAttribute("data-type", "window");
    windowDisplay.setAttribute("data-drag", "draggable-dragger");
    return windowDisplay;
  }

  /**
   * Chaque application pourra faire son propre contenu
   */
  buildContent() {
    // Par défault, comme tes premiers tests
    const contentDisplay = document.createElement("img");
    contentDisplay.src = "/IpsonSystem/img/app1.png";

    return contentDisplay;
  }

  /***********************************************************************************************************************
   * IDEALEMENT, on peut faire la meme chose pour les autres parties : ie : Interactivité
   *
   * INTERACTIVITY
   **********************************************************************************************************************/

  addInteractivity() {
    this.addWindowInteractivity();
    this.addContentInteractivity();
  }

  /**
   * Pareil pour toute les window
   */

  addWindowInteractivity() {
    this.allBtn = this.display.querySelectorAll("[data-window-control]");
    this.scaleState;
    this.menuBar = document.querySelector(".c-menu-bar");

    this.icon.addEventListener("click", () => {
      this.removeStateHide();
    });

    this.allBtn.forEach((button) => {
      button.addEventListener("click", () => {
        this.windowControlAction(button.dataset.windowControl);
      });
    });
  }

  windowControlAction(action) {
    this.scaleState = this.display.classList.contains("state--big");
    switch (action) {
      case "quit":
        this.display.remove();
        break;

      case "hide":
        if (this.hideState == true) {
          this.removeStateHide();
        } else {
          this.addStateHide();
        }
        break;

      case "scale":
        if (this.scaleState == true) {
          this.removeStateScale();
        } else {
          this.addStateScale();
        }
        break;
    }
  }

  //States functions

  addStateHide() {
    //this.activeDock.appendChild(this.dockApp);
    this.activeDock.prepend(this.dockApp);
    this.display.setAttribute("data-drag", "static");
    this.display.style.display = "none";
    if (this.scaleState == true) {
      this.removeStateScale();
    }
  }

  removeStateHide() {
    this.activeDock.removeChild(this.dockApp);
    this.display.setAttribute("data-drag", "draggable");
    this.container.appendChild(this.display);
    this.display.style.display = "";
  }

  addStateScale() {
    this.oldWidth = this.content.offsetWidth;
    this.oldHeight = this.content.offsetHeight;
    this.containerWidth = this.container.offsetWidth;
    this.containerHeight = this.container.offsetHeight;
    this.oldTransform = this.display.style.transform;
    this.oldX = this.display.getAttribute("data-x");
    this.oldY = this.display.getAttribute("data-y");
    this.display.classList.add("state--big");
    this.display.classList.remove("state--hide");
    this.display.style.width = this.containerWidth + "px";
    this.display.style.height = this.containerHeight + "px";
    this.content.style.width = "100%";
    this.content.style.height = "100%";
    this.display.style.transform = "translate(0,0)";
    this.display.setAttribute("data-x", "0");
    this.display.setAttribute("data-y", "0");
    if (this.hideState == true) {
      this.removeStateHide();
    }
  }

  removeStateScale() {
    this.display.classList.remove("state--big");
    this.display.style.transform = this.oldTransform;
    this.display.setAttribute("data-x", this.oldX);
    this.display.setAttribute("data-y", this.oldY);
    this.display.style.height = "fit-content";
    this.display.style.width = "fit-content";
    this.content.style.width = this.oldWidth + "px";
    this.content.style.height = this.oldHeight + "px";
  }

  /**
   * Différent pour chaque window
   */
  addContentInteractivity() {
    // rien par défault
  }
}
