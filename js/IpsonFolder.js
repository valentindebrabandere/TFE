import IpsonWindow from "./IpsonWindow.js";

export default class IpsonFolder extends IpsonWindow {
  constructor(windowId, currentStyle, parent) {
    let iconPath =
      "/IpsonSystem/img/" + currentStyle + "/desktopIcons/folder.png";
    // construire la window sous-jacente : extends IpsonWindow
    super(windowId, "folder", iconPath);
    this.parent = parent;
    this.filesContains = parent.filesContains;
  }

  // redefinir uniquement ce qui doit l'etre
  buildContent() {
    const folder = document.createElement("div");
    folder.style.width = "40vw";
    folder.style.height = "60vh";
    folder.classList.add("c-folder__window");
    folder.setAttribute("data-type", "folderWindow");
    folder.type = "folderWindow";
    folder.parent = this.parent;
    this.filesContains.forEach((file) => {
      folder.appendChild(file);
      file.style.display = "flex";
      file.setAttribute("data-x", 0);
      file.setAttribute("data-y", 0);
      file.style.transform = "translate3D(0,0,0)";
      file.style.left = myRandom(5, 30) + "vw";
      file.style.top = myRandom(5, 50) + "vh";
    });
    folder.instance = this;

    return folder;
  }

  addContentInteractivity() {}

  //function that ask for keboard event
  handleKeyUp() {}
}
