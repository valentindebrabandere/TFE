import { LitElement, html, css } from 'lit';

class AppTest extends LitElement {

  //style
  static get styles() {
    return [
      css`
       div{
        background-color: red;
        }
        h1 {
          margin: 0;
        }
      `
    ]
  }

  render() {
    return html`
      <div><h1>Test</h1></div>
      `
  }

}

customElements.define('app-test', AppTest);