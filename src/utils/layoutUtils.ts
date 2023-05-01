export function dispatchOpenLayoutEvent(sourceElement: HTMLElement) {
    const openLayoutEvent = new CustomEvent('open-layout-event', {
      bubbles: true,
      composed: true,
    });
    sourceElement.dispatchEvent(openLayoutEvent);
}