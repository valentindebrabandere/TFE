// styleController.ts
import { ReactiveController, ReactiveElement } from 'lit';

export interface StyleObject {
  call: string;
  name: string;
  date: number;
  chapter: string;
}

export const stylesList:StyleObject[] =  [
  { call: 'oneBit', name: 'One bit', date: 1987, chapter: "Naissance d'un rêve"},
{ call: 'grey', name: 'Grey scale and color', date: 1997, chapter: "Sur le fil du succès" },
{ call: 'skeuo', name: 'Skeuomorphism', date: 2007, chapter: "Le revers de la médaille" },
{ call: 'flat', name: 'Flat design', date: 2017, chapter: "Entre les murs de l'isolement" },
{ call: 'modernMac', name: 'Modern', date: 2022, chapter: "La vie continue" },

];

export var currentStyle:string;

export function setCurrentStyle(style: string): void {
  currentStyle = style;
}

export function addStyleChangedEventListener(listener: EventListenerOrEventListenerObject) {
  window.addEventListener('style-changed', listener);
}

export function changeStyle(direction: string): string {
  const styleIndex = stylesList.findIndex((style) => style.call === currentStyle);

  document.querySelectorAll('notif-component').forEach((el) => {
    el.remove();
  });


  if (direction === 'next') {
    if (styleIndex < stylesList.length - 1) {
      currentStyle = stylesList[styleIndex + 1].call;
      return currentStyle;
    } else {
      return currentStyle;
    }
  } else {
    if (styleIndex > 0) {
      currentStyle = stylesList[styleIndex - 1].call;
      return currentStyle;
    } else {
      return currentStyle;
    }
  }
}

class GlobalStyleController implements ReactiveController {
  private host?: ReactiveElement;
  private _style = currentStyle;
  public elements: HTMLElement[] = [];
  private static instance: GlobalStyleController;

  constructor(host?: ReactiveElement) {

    if (host) {
      this.host = host;
      this.host.addController(this);
    }
  
    if (GlobalStyleController.instance) {
      return GlobalStyleController.instance;
    }
  
    GlobalStyleController.instance = this;

    // Initialize the style with the first style in the list
    //Fist style to show
    this._style = stylesList[2].call;
    setCurrentStyle(this._style);
    this.dispatchEvent();
  }

  getStyleIndex(): number {
    return stylesList.findIndex((style) => style.call === this.style);
  }

  getDate() {
    const currentStyleObj = stylesList.find(style => style.call === this.style);
    return currentStyleObj ? currentStyleObj.date : '';
  }

  getName() {
    const currentStyleObj = stylesList.find(style => style.call === this.style);
    return currentStyleObj ? currentStyleObj.name : '';
  }

  hostConnected() {
    // Perform any setup needed when the host is connected
  }

  hostDisconnected() {
    // Perform any cleanup needed when the host is disconnected
  }

  hostUpdate() {
    // Perform any actions needed before the host's update
  }

  hostUpdated() {
    // Perform any actions needed after the host's update
  }

  get style() {
    return this._style;
  }

  set style(style: string) {
    if (style !== this._style) {
      this._style = style;
      this.host?.requestUpdate();
  
      // Dispatch the 'style-changed' event
      this.dispatchEvent();
    }
  }

  dispatchEvent() {
    const event = new CustomEvent('style-changed');
    window.dispatchEvent(event);
    this.elements.forEach((element: HTMLElement) => element.dispatchEvent(event));
  }

  changeStyle(direction: string) {
    setCurrentStyle(changeStyle(direction));
    this.style = currentStyle;
  }
}

export { GlobalStyleController };

