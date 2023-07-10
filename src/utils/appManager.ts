
import { Browser } from "../components/apps/browser/browser";
import { Corbeille } from "../components/apps/corbeille/corbeille";
import { FaceTime } from "../components/apps/faceTime/faceTime";
import { Figma } from "../components/apps/figma/figma";
import { Finder } from "../components/apps/finder/finder";
import { Numbers } from "../components/apps/numbers/numbers";
import { Mail } from "../components/apps/mail/mail";
import { Messages } from "../components/apps/messages/messages";
import { Preferences } from "../components/apps/preferences/preferences";
import { Preview } from "../components/apps/preview/preview";
import { TextEdit } from "../components/apps/textEdit/textEdit";
import { Video } from "../components/apps/video/video";

//add new apps here
const allApps = [Browser,FaceTime, Figma, Finder, Numbers, Mail, Messages, Preferences, Preview, TextEdit, Video];

export function getDockApps(style: string) {
  switch (style) {
    case 'modernMac':
      return [Finder, Preferences, Figma, TextEdit, Preview];
    case 'flat':
      return [Finder, Preferences,Numbers, Browser, TextEdit, Preview, FaceTime];
    case 'skeuo':
      return [Finder, Preferences,  Messages, TextEdit, Numbers, Preview];
    case 'grey':
      return [Finder, Preferences, Mail, TextEdit, Numbers, Video, Browser];
    case 'oneBit':
      return [Finder, Preferences, TextEdit, Numbers];
    default:
      return [];
  }
}

const dockAppsActives = [Corbeille];
let allApplicationsList = [...allApps, ...dockAppsActives];

const applications = new Map();

const iconPathByStyle = (appName: string, style: string) =>`/images/appIcons/${style}/${appName}.png`;

interface Application {
  appName: string;
  component: { new (): HTMLElement; prototype: HTMLElement; };
  icon: (style: string) => string;
  fileIcon?: ((style: string) => string) | undefined;
  uuid?: string;
  isHidden?: boolean;
}

function populateApplicationsList() {
  applications.clear();
  allApplicationsList.forEach((app: any) => {
    const application: Application = {
      icon: (style: string) => iconPathByStyle(app.appName, style),
      component: app,
      appName: app.appName,
    };
    
    if (app.prototype.hasOwnProperty('getFileIcon')) {
      application.fileIcon = (style: string) => app.prototype.getFileIcon(style);
    }
    applications.set(app.appName, application);
  });

  applications.set("default", {
    icon: (style: string) => iconPathByStyle("default", style),
    component: null,
  });
}

populateApplicationsList();


// addStyleChangedEventListener(onStyleChanged);

// function onStyleChanged() {
//   currentStyle = styleController.style;


export { dockAppsActives };
export function getApplicationByID(id: string): Application{
  return applications.has(id) ? applications.get(id) : applications.get("default");
}