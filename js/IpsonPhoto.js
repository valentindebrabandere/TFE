import IpsonWindow from "./IpsonWindow.js";

export default class IpsonPhoto extends IpsonWindow {
  constructor(windowId, currentStyle, file) {
    let iconPath = "/IpsonSystem/img/" + currentStyle + "/dockIcons/photo.png";
    // construire la window sous-jacente : extends IpsonWindow
    super(windowId, "photo", iconPath);
    this.file = file;
  }

  // redefinir uniquement ce qui doit l'etre
  buildContent() {
    const photoHTML = document.createElement("div");
    const photoContent = document.createElement("img");
    if (this.file.extention != null) {
      photoContent.src = this.file.iconImg.src;
      let rapportWH = photoContent.naturalWidth / photoContent.naturalHeight;

      if (rapportWH < 1) {
        photoHTML.style.width = 60 * rapportWH + "vh";
        photoHTML.style.height = 60 + "vh";
      } else {
        photoHTML.style.width = 40 + "vw";
        photoHTML.style.height = 40 / rapportWH + "vw";
      }
    } else {
      photoContent.src =
        "https://source.unsplash.com/random?cb=" + Math.random();
      photoHTML.style.width = myRandom(40, 60) + "vw";
      photoHTML.style.height = myRandom(40, 60) + "vh";
    }
    photoContent.classList.add("o-fluidimage");
    photoHTML.appendChild(photoContent);
    this.photoHTML = photoHTML;

    photoHTML.classList.add("c-photo");
    photoHTML.instance = this;
    photoHTML.setAttribute("data-type", "application");

    return photoHTML;
  }

  setFullScreen() {
    this.currentParent = this.photoHTML.parentElement;
  }

  fullScreen() {
    let screen = document.querySelector(".js-screen__overlay");

    if (this.photoHTML.classList.contains("state__fullscreen")) {
      this.currentParent.appendChild(this.photoHTML);
      screen.style.display = "none";
    } else {
      screen.style.display = "block";
      screen.appendChild(this.photoHTML);
    }
    this.photoHTML.classList.toggle("state__fullscreen");
  }

  handleKeyUp(evt) {
    switch (evt.key) {
      case "f":
        this.fullScreen();
        break;
      default:
        return;
    }
  }
}
