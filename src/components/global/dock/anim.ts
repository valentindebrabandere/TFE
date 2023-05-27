import anime from 'animejs';
import { GlobalStyleController } from '../../../utils/styleController';

const globalStyleController = new GlobalStyleController();

function shouldApplyAnimation(): boolean {
    const styleToSkip = ['oneBit'];
    const currentStyle = globalStyleController.style;
  
    return !styleToSkip.includes(currentStyle);
}

// Get the dock element from the shadow DOM
function getDockElement(): HTMLElement | null {
  const dockComponent = document.querySelector('dock-component');
  if (!dockComponent) return null;
  return (dockComponent.shadowRoot ? dockComponent.shadowRoot.querySelector('.js-dock') : dockComponent) as HTMLElement;
}

  

// Met en place l'animation de base
export function animDock() {
  const dock = getDockElement();
  if (!dock) return;
  let dockApps = dock.querySelectorAll('.c-dock__icon');
  let arrDockApps = Array.from(dockApps);
  arrDockApps.forEach((dockApp) => {
    animDockAddEvtList(dockApp);
  });
}

// Ajoute un addEventListener a l'application qu'on lui passe (important quand on hide une app)
function animDockAddEvtList(app:Element) {
    app.addEventListener("mouseenter", (evt) => {
      if (shouldApplyAnimation()) {
        addAnim(evt, iconAnimDockIn);
      }
    });
    app.addEventListener("mouseleave", (evt) => {
      if (shouldApplyAnimation()) {
        addAnim(evt, iconAnimDockOut);
      }
    });
  }
  

function addAnim(evt: Event, iconAnimDock: Function) {
    const dock = getDockElement();
    if (!dock) return;
    let dockAppsDyn = dock.querySelectorAll('.c-dock__icon');
    let arrDockAppsDyn = Array.from(dockAppsDyn);
    let currentApp = arrDockAppsDyn.indexOf(evt.currentTarget as HTMLElement);
    let appBefore: Element | null = currentApp > 0 ? arrDockAppsDyn[currentApp - 1] : null;
    let appAfter: Element | null = currentApp < arrDockAppsDyn.length - 1 ? arrDockAppsDyn[currentApp + 1] : null;
    iconAnimDock(appBefore, evt.currentTarget, appAfter);
}
  

function iconAnimDockIn(appBefore: Element | null, currentApp: EventTarget | null, appAfter: Element | null) {
  animeJsTarget(currentApp, 1.3, '4px');
  animeJsTarget(appBefore, 1.1, '2px');
  animeJsTarget(appAfter, 1.1, '2px');
}

function iconAnimDockOut(appBefore: Element | null, currentApp: EventTarget | null, appAfter: Element | null) {
  animeJsTarget(currentApp, 1, '1px');
  animeJsTarget(appBefore, 1, '1px');
  animeJsTarget(appAfter, 1, '1px');
}


function animeJsTarget(target: EventTarget | null, scale: number, margin: string) {
  // Scale Animation
  anime({
    targets: target,
    scale: scale,
    duration: 15,
    easing: 'linear',
  });

  // Margin Animation
  anime({
    targets: target,
    margin: "0 " + margin,
    duration: 30, 
    easing: 'linear',
  });
}


