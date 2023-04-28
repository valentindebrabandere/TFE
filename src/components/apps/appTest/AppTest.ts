import { LitElement, html } from 'lit';

class AppTest extends LitElement {

  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <h1>Test</h1>
      `
  }

}

customElements.define('app-test', AppTest);