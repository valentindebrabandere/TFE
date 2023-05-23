import { Aperçu } from "../components/apps/aperçu/aperçu";
import { Figma } from "../components/apps/figma/figma";
import { TextEdit } from "../components/apps/textEdit/textEdit";
import { Corbeille } from "../components/apps/corbeille/corbeille";
import { Finder } from "../components/apps/finder/finder";

// import { GlobalStyleController, addStyleChangedEventListener } from "./styleController";

// const styleController = new GlobalStyleController();
// var currentStyle = styleController.style;

const allApps = [Aperçu, Figma, TextEdit, Finder];

export function getDockApps(style: string) {
  switch (style) {
    case 'modernMac':
      return [Finder, Figma, TextEdit, Aperçu];
    case 'oneBit':
      return [Finder, TextEdit];
    // add more cases for other styles
    default:
      return [];
  }
}

const dockAppsActives = [Corbeille];
let allApplicationsList = [...allApps, ...dockAppsActives];

const applications = new Map();

const iconPathByStyle = (appName: string, style: string) =>`/public/images/appIcons/${style}/${appName}.png`;

interface Application {
  name: string;
  component: typeof HTMLElement;
  icon: (style: string) => string;
  fileIcon?: (style: string) => string;
}

function populateApplicationsList() {
  applications.clear();
  allApplicationsList.forEach((app: any) => {
    const application: Application = {
      icon: (style: string) => iconPathByStyle(app.name, style),
      component: app,
      name: app.name,
    };

    if (app.prototype.hasOwnProperty('getFileIcon')) {
      application.fileIcon = (style: string) => app.prototype.getFileIcon(style);
    }

    applications.set(app.name, application);
  });

  applications.set("default", {
    icon: (style: string) => iconPathByStyle("default", style),
    component: null,
  });
}

populateApplicationsList(); // Populate the applications list initially

// addStyleChangedEventListener(onStyleChanged);

// function onStyleChanged() {
//   currentStyle = styleController.style;

//   //things that have to change with style
// 


export { dockAppsActives };
export function getApplicationByID(id: string): Application{
    return applications.has(id) ? applications.get(id) : applications.get("default");
}