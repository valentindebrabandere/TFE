// import IpsonCalculator from "./IpsonCalculator.js";
import IpsonError from "./IpsonError.js";
import IpsonPhoto from "./IpsonPhoto.js";
import IpsonSlides from "./IpsonSlides.js";
import IpsonFolder from "./IpsonFolder.js";

var onFocus;
const container = document.querySelector(".js-container");
const screen = document.querySelector(".js-screen");
const layout = document.querySelector(".js-layout");
const dock = document.querySelector(".js-dock");
const dockActive = document.querySelector(".js-dock__active");
const dockStatic = document.querySelector(".js-dock__static");
const style1 = {};
style1.name = "Modern Mac";
style1.call = "modernMac";
const style2 = {};
style2.name = "One Bit";
style2.call = "1bit";
var currentStyle = style1;

systemStart();

//================
//= System Start
//================

function systemStart() {
  applyStyle(style1);
  setDesktop();
  animDock();
  // addIteractivityToLayout();

  let staticApps = dockStatic.querySelectorAll(".js-dock__app");
  staticApps.forEach((app) => {
    app.addEventListener("click", openNewApp);
  });
}

//================
//= Desktop
//================

//mise en place du desktop
//propriétés des éléments, sélection
//ouvrir l'application au dblclick
function setDesktop() {
  container.addEventListener("mousedown", function () {
    let previousSelection = document.querySelector(
      "[data-selection= selected]"
    );
    let previousOpenSelection = document.querySelector(
      "[data-selection= open]"
    );
    if (previousSelection) {
      removeSelect(previousSelection);
    }
    if (previousOpenSelection) {
      removeOpenSelect(previousOpenSelection);
    }
  });

  let allDeskelements = container.querySelectorAll(".js-desktop__element");
  allDeskelements.forEach((element) => {
    element.style.left = myRandom(5, 85) + "vw";
    element.style.top = myRandom(5, 70) + "vh";
    element.p = element.querySelector(".js-desktop__name");
    element.extention = element.dataset.extention;
    element.name = element.p.textContent;
    element.p.textContent = element.name + element.extention;
    element.icon = element.querySelector(".js-desktop__icon");
    element.iconImg = element.querySelector(".js-desktop__icon-img");
    element.type = element.dataset.type;
    element.addEventListener("mouseup", function (evt) {
      addSelect(evt);
    });
    if ((element.type = "folder")) {
      setFolder(element);
    }
    element.addEventListener("dblclick", function (evt) {
      openNewApp(evt);
      addOpenSelect(evt);
    });
  });
}

function removeSelect(previousSelection) {
  previousSelection.icon.classList.remove("sate__selected-icon");
  previousSelection.p.classList.remove("sate__selected-p");
  previousSelection.removeAttribute("data-selection", "selected");
}

function addSelect(evt) {
  let element = evt.currentTarget;
  element.icon.classList.add("sate__selected-icon");
  element.p.classList.add("sate__selected-p");
  element.setAttribute("data-selection", "selected");
}

function removeOpenSelect(previousSelection) {
  previousSelection.removeAttribute("data-selection");
  previousSelection.icon.classList.remove("sate__selected-icon");
  previousSelection.p.classList.remove("sate__selected-p--open");
}

function addOpenSelect(evt) {
  let element = evt.currentTarget;
  removeSelect(element);
  element.icon.classList.add("sate__selected-icon");
  element.p.classList.add("sate__selected-p--open");
  element.setAttribute("data-selection", "open");
}

//proprités propres à un dossier
function setFolder(folder) {
  folder.filesContains = [];
}

//================
//= Layout
//================

//Met en place le fonctionnemnt du layout
function addIteractivityToLayout() {
  //activer le layout de changment de style au dbl click
  let allLayoutBtn = document.querySelectorAll(".js-layout__btn");
  let logoIpson = document.querySelector(".js-menu-bar__logo");
  logoIpson.addEventListener("click", function () {
    layout.style.pointerEvents = "auto";
    layout.style.transform = "scale(1)";
    screen.style.transform = "scale(0.7)";
    allLayoutBtn.forEach((btn) => {
      btn.removeAttribute("disabled");
    });
  });
  //ajouter le changment de style au click du btn
  layout.style.transform = "scale(1.5)";
  allLayoutBtn.forEach((btn) => {
    btn.addEventListener("mouseup", function () {
      if (currentStyle == style1) {
        applyStyle(style2);
      } else {
        applyStyle(style1);
      }
      //changer le nom qui s'affiche lorsqu'on change de style
      let displayStyle = document.querySelector(".js-layout__style");
      displayStyle.textContent = currentStyle.name;
    });
  });
  let layoutScreen = document.querySelector(".js-layout__screen");

  layoutScreen.addEventListener("mouseup", function () {
    layout.style.pointerEvents = "none";
    layout.style.transform = "scale(1.5)";
    screen.style.transform = "scale(1)";
    allLayoutBtn.forEach((btn) => {
      btn.setAttribute("disabled", "");
    });
  });
}

//================
//= OpenApp
//================

//Fait ouvrir les app ou erreur si l'app n'existe pas
function openNewApp(evt) {
  let app = evt.currentTarget;
  let appName = app.dataset.applicationName;

  if (appName == "Calculator") {
    createCalculator();
  } else if (appName == "Photos") {
    createPhoto(app);
  } else if (appName == "Folder") {
    createFolder(app);
  } else if (appName == "Slides") {
    createSlides(app);
  } else {
    let iconPath = app.querySelector(".js-dock__icon").getAttribute("src");
    const appError = new IpsonError(appName, iconPath, currentStyle.call);
    appError.build();
  }
}

//mets en place le focus et ajoute l'app sur l'écran
function setNewApp(app) {
  app.display.setAttribute("data-focus", "onFocus");
  app.display.classList.add("state__on-focus");
  container.appendChild(app.display);
  app.display.addEventListener("mousedown", componentGetFocus);
  onFocus = container.querySelector('[data-focus="onFocus"]');
}

//================
//= Create calculator app
//================

function createCalculator() {
  checkFocus();

  const calculator = new IpsonCalculator("fenetre1579", currentStyle.call);
  calculator.build();
  // derriere build(), il va se passer buildWindow() et buildContent().
  // buildContent() est redifini sur IpsonCalculator
  // permettant de créer le contenu html de la calculator sans devoir réecrire le code de MyWindow

  // on peut aussi ajouter des interactions
  calculator.addInteractivity();
  // derriere addInteractivity(), il va se passer addWindowInteractivity() et addContentInteractivity()
  // addWindowInteractivity() va permettre de deplacer, fermer, minimiser toute fenetre
  // addContentInteractivity() va permettre l'interaction propre à la calculator
  setNewApp(calculator);
}

//================
//= Create Photo App
//================

function createPhoto(app) {
  checkFocus();

  const photo = new IpsonPhoto("fenetre1479", currentStyle.call, app);
  photo.build();
  // derriere build(), il va se passer buildWindow() et buildContent().
  // buildContent() est redifini sur IpsonCalculator
  // permettant de créer le contenu html de la calculator sans devoir réecrire le code de MyWindow

  // on peut aussi ajouter des interactions
  photo.addInteractivity();
  photo.setFullScreen();

  // derriere addInteractivity(), il va se passer addWindowInteractivity() et addContentInteractivity()
  // addWindowInteractivity() va permettre de deplacer, fermer, minimiser toute fenetre
  // addContentInteractivity() va permettre l'interaction propre à la calculator

  setNewApp(photo);
}

//================
//= Create IsponSlide App
//================

function createSlides(app) {
  checkFocus();

  const slides = new IpsonSlides("fenetre1479", currentStyle.call, app);
  slides.build();
  // derriere build(), il va se passer buildWindow() et buildContent().
  // buildContent() est redifini sur IpsonCalculator
  // permettant de créer le contenu html de la calculator sans devoir réecrire le code de MyWindow

  // on peut aussi ajouter des interactions
  slides.addInteractivity();
  slides.setFullScreen();
  // derriere addInteractivity(), il va se passer addWindowInteractivity() et addContentInteractivity()
  // addWindowInteractivity() va permettre de deplacer, fermer, minimiser toute fenetre
  // addContentInteractivity() va permettre l'interaction propre à la calculator

  setNewApp(slides);
}

//================
//=Create Folder App
//================

function createFolder(app) {
  checkFocus();
  const folder = new IpsonFolder("fenetre1479", currentStyle.call, app);
  folder.build();
  // derriere build(), il va se passer buildWindow() et buildContent().
  // buildContent() est redifini sur IpsonCalculator
  // permettant de créer le contenu html de la calculator sans devoir réecrire le code de MyWindow

  // on peut aussi ajouter des interactions
  folder.addInteractivity();
  // derriere addInteractivity(), il va se passer addWindowInteractivity() et addContentInteractivity()
  // addWindowInteractivity() va permettre de deplacer, fermer, minimiser toute fenetre
  // addContentInteractivity() va permettre l'interaction propre à la calculator

  setNewApp(folder);
}

//================
//=handleKeyUp
//================

//listen to the keboard event on the active element
document.addEventListener("keyup", (evt) => {
  if (onFocus != null) {
    onFocus.instance.handleKeyUp(evt);
  }
});

//================
//= Focus
//================

function checkFocus() {
  if (onFocus != null) {
    onFocus.classList.remove("state__on-focus");
    onFocus.classList.add("state__no-focus");

    onFocus.dataset.focus = "noFocus";
  }
}

//select the active element
function componentGetFocus(evt) {
  //onFocus = the precent focused element
  //evt.currentTarget = new one
  //remove focus state from the old one and add it to the new one
  onFocus.classList.remove("state__on-focus");
  onFocus.classList.add("state__no-focus");
  //to get the class (z index ans design diffrences if I want)
  onFocus.dataset.focus = "noFocus";
  evt.currentTarget.dataset.focus = "onFocus";
  //dataSet is to get the element in forcus
  evt.currentTarget.classList.remove("state__no-focus");
  evt.currentTarget.classList.add("state__on-focus");
  onFocus = evt.currentTarget;
  //onFocus become the new one
}

//================
//= Changement de style
//================

function applyStyle(myNewStyle) {
  let allCSS = document.querySelectorAll("[data-css-style]");
  allCSS.forEach((css) => {
    let href = css.href;
    let newHref = href.replace(currentStyle.call, myNewStyle.call);
    css.setAttribute("href", newHref);
    css.dataset.cssStyle = myNewStyle;
  });

  let allIMG = document.querySelectorAll("img");
  allIMG.forEach((img) => {
    let src = img.src;
    let newSrc = src.replace(currentStyle.call, myNewStyle.call);
    img.setAttribute("src", newSrc);
  });

  let screen = document.querySelector(".c-screen");

  screen.classList.remove("style-" + currentStyle.call);
  screen.classList.add("style-"+myNewStyle.call);

  currentStyle = myNewStyle;
}

//================
//= Dock
//================
//dock animation

//observe uand une icone est ajoutée au dock afin de l'ajouter au cycle d'animation
let observer = new MutationObserver((reccordedMutations) => {
  reccordedMutations.forEach((mutation) => {
    mutation.addedNodes.forEach((app) => {
      let appIcon = app.querySelector(".js-dock__icon");
      animDockAddEvtList(appIcon);
      appIcon.style.transform = "scale(1)";
    });
  });
});

// observe everything except attributes
observer.observe(dockActive, {
  childList: true, // observe direct children
  subtree: true, // and lower descendants too
});

//met en place l'animation de base
function animDock() {
  let dockApps = dock.querySelectorAll(".js-dock__icon");
  let arrDockApps = Array.from(dockApps);
  arrDockApps.forEach((dockApp) => {
    animDockAddEvtList(dockApp);
  });
}
//ajoute un addEvtListener a l'application qu'on lui passe (important quand on hide une app)
function animDockAddEvtList(app) {
  app.addEventListener("mouseenter", (evt) => {
    addAnim(evt, iconAnimDockIn);
  });
  app.addEventListener("mouseleave", (evt) => {
    addAnim(evt, iconAnimDockOut);
  });
}

function addAnim(evt, iconAnimDock) {
  let dockAppsDyn = dock.querySelectorAll(".js-dock__icon");
  let arrDockAppsDyn = Array.from(dockAppsDyn);
  let currentApp = arrDockAppsDyn.indexOf(evt.currentTarget);
  let appBefore = arrDockAppsDyn.at(currentApp - 1);
  let appAfter = arrDockAppsDyn.at(currentApp + 1);
  if (currentApp == 0) {
    appBefore = null;
  }
  iconAnimDock(appBefore, evt.currentTarget, appAfter);
}

function iconAnimDockIn(appBefore, currentApp, appAfter) {
  animeJsTarget(currentApp, 1.3);
  animeJsTarget(appBefore, 1.1);
  animeJsTarget(appAfter, 1.1);
}
function iconAnimDockOut(appBefore, currentApp, appAfter) {
  animeJsTarget(currentApp, 1);
  animeJsTarget(appBefore, 1);
  animeJsTarget(appAfter, 1);
}

function animeJsTarget(target, scale) {
  anime({
    targets: target,
    scale: scale,
    duration: 10,
    easing: "easeInOutSine",
  });
}

