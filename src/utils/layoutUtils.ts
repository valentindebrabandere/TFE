export function dispatchOpenLayoutEvent(sourceElement: HTMLElement) {
    const openLayoutEvent = new CustomEvent('open-layout-event', {
      bubbles: true,
      composed: true,
    });
    console.log('dispatchOpenLayoutEvent')
    sourceElement.dispatchEvent(openLayoutEvent);
}