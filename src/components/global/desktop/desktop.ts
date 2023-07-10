import { html } from "lit";
import { customElement } from "lit/decorators.js";

import type { FileItem } from "../file/File";
import { StyledElement } from "../../../utils/globalStyledElement.ts";
import {FileComponent} from "../file/File.ts";
import "../file/File.ts";

@customElement("desktop-component")
export class Desktop extends StyledElement {
  private desktopItems: FileItem[] = [];
  public fileClicked: boolean = false;

  constructor() {
    super();
    this.classList.add("c-desktop");
    this.updateStyles();
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener("click", this.handleDocumentClick.bind(this));
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener("click", this.handleDocumentClick.bind(this));
  }

  handleDocumentClick(event: Event) {
    if (!(event.target as Element).closest('file-component')) {
      this.clearSelectedFiles();
    }
  }
  

  clearSelectedFiles() {
    this.querySelectorAll("file-component").forEach((fileComponent: any) => {
      fileComponent.deselect();
    });
  }
  
  selectFile(fileComponent: FileComponent) {
    this.clearSelectedFiles();
    fileComponent.select();
    this.fileClicked = true;
  }
  
  openFile(fileComponent: FileComponent) {
    this.clearSelectedFiles();
    fileComponent.open();
    this.fileClicked = true;
  }

  //need to be called to change the style
  updateStyles() {
    //select the current style (globalStyledElement.ts)
    const currentStyle = this.globalStyleController.style;

    // Fetch the JSON file from the public folder
    fetch(`/content/${currentStyle}/desktop/desktopConfig.json`)
      .then((response) => {
        // Check if the response is ok (status in the range 200-299)
        if (!response.ok) {
          console.log("Desktop empty");
        }
        return response.json();
      })
      .then((data) => {
        this.desktopItems = data.childItems || [];
        this.requestUpdate(); // Update the component when the data is loaded
      })
      .catch((error) => {
        console.log("Desktop empty or not existing here", error);
        this.desktopItems = [];
        this.requestUpdate();
      });
  }

  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      ${this.desktopItems.map(
        (item) => html`
          <file-component
            appname="${item.appname}"
            filename="${item.filename}"
            filelink="${item.filelink}"
            .childItems="${item.childItems}"
            style="top: ${item.position?.top}; left: ${item.position?.left};"
            @click=${(event:any) => this.selectFile(event.currentTarget as FileComponent)}
            @dblclick=${(event:any) => this.openFile(event.currentTarget as FileComponent)}
          />
        `
      )}
    `;
  }
  
}
