import IpsonWindow from "./IpsonWindow.js";

export default class IpsonSlides extends IpsonWindow {
  constructor(windowId, currentStyle, file) {
    let iconPath =
      "/IpsonSystem/img/" + currentStyle + "/desktopIcons/slides.png";
    // construire la window sous-jacente : extends IpsonWindow
    super(windowId, "Slides", iconPath);
    this.file = file;
    this.nPages = parseInt(file.dataset.nPages);
  }

  // redefinir uniquement ce qui doit l'etre
  buildContent() {
    const slideHtml = document.createElement("div");
    this.slideHtml = slideHtml;
    slideHtml.classList.add("c-slides");
    //mise en place pour le next and previous
    this.slideArray = [];
    this.currentSlide = 0;

    let slideSrc;
    let slideContent;
    let rapportWH;

    //boucle qui passe par chaque slide pour l'ajouter dans l'application
    for (let i = 1; i < this.nPages + 1; i++) {
      slideSrc = "slide(" + i + ").jpg";
      let srcPath = "/IpsonSystem/img/constantImages/slideTest/" + slideSrc;
      slideContent = document.createElement("img");
      //recupérer la 1ere slide (pour le format)
      if (i == 1) {
        this.slideContent = slideContent;
        slideContent.classList.add("state__slide-focus");
      }
      slideContent.addEventListener("load", (e) => {
        const loadedImg = e.currentTarget;
        rapportWH = loadedImg.naturalWidth / loadedImg.naturalHeight;

        //vertical
        if (loadedImg === slideHtml.children[0]) {
          if (rapportWH < 1) {
            slideHtml.style.width = 60 * rapportWH + "vh";
            slideHtml.style.height = 60 + "vh";
          }
          //horizontal
          else {
            slideHtml.style.width = 70 + "vw";
            slideHtml.style.height = 70 / rapportWH + "vw";
          }
        }
      });
      slideContent.classList.add("c-slide__img");
      slideContent.src = srcPath;
      slideContent.number = i;
      slideHtml.appendChild(slideContent);
      this.slideArray.push(slideContent);
    }

    slideHtml.instance = this;
    slideHtml.setAttribute("data-type", "application");
    return slideHtml;
  }

  nextSlide() {
    let oldFirst = this.slideHtml.querySelector(".state__slide-focus");
    oldFirst.classList.remove("state__slide-focus");
    this.currentSlide++;
    if (this.currentSlide >= this.slideArray.length) {
      this.currentSlide = 0;
    }
    let newFirst = this.slideArray.at(this.currentSlide);
    newFirst.classList.add("state__slide-focus");
  }
  previousSlide() {
    let oldFirst = this.slideHtml.querySelector(".state__slide-focus");
    oldFirst.classList.remove("state__slide-focus");
    this.currentSlide--;
    if (this.currentSlide >= this.slideArray.length) {
      this.currentSlide = 0;
    }
    let newFirst = this.slideArray.at(this.currentSlide);
    newFirst.classList.add("state__slide-focus");
  }

  setFullScreen() {
    this.currentParent = this.slideHtml.parentElement;
  }

  fullScreen() {
    let screen = document.querySelector(".js-screen__overlay");

    if (this.slideHtml.classList.contains("state__fullscreen")) {
      this.currentParent.appendChild(this.slideHtml);
      screen.style.display = "none";
    } else {
      screen.style.display = "block";
      screen.appendChild(this.slideHtml);
    }
    this.slideHtml.classList.toggle("state__fullscreen");
  }

  handleKeyUp(evt) {
    switch (evt.key) {
      case "ArrowRight":
        this.nextSlide();
        break;
      case "ArrowLeft":
        this.previousSlide();
        break;
      case "f":
        this.fullScreen();
        break;
      default:
        return;
    }
  }
}
