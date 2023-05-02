import { ReactiveController, ReactiveElement } from 'lit';
import { currentStyle, setCurrentStyle, changeStyle } from './styleUtils';

class GlobalStyleController implements ReactiveController {
  private host: ReactiveElement;
  private _style = currentStyle;
  public elements: HTMLElement[] = [];
  private static instance: GlobalStyleController;

  constructor(host: ReactiveElement) {
    this.host = host;
    this.host.addController(this);

    if (GlobalStyleController.instance) {
      return GlobalStyleController.instance;
    }

    GlobalStyleController.instance = this;
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
      this.host.requestUpdate();

        // Dispatch the 'style-changed' event
        this.dispatchEvent();
    }
  }

  dispatchEvent() {
    const event = new CustomEvent('style-changed');
    this.elements.forEach((element: HTMLElement) => element.dispatchEvent(event));
  }

  changeStyle(direction: string) {
    setCurrentStyle(changeStyle(direction));
    this.style = currentStyle;
    console.log('current style is: ', this.style)
  }
}


export { GlobalStyleController };
