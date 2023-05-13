import { Aperçu } from "../components/apps/aperçu/aperçu";
import { Figma } from "../components/apps/figma/figma";
import { TextEdit } from "../components/apps/textEdit/textEdit";
import { Corbeille } from "../components/apps/corbeille/corbeille";
// import { Calculator } from "../apps/calculator/Calculator";

export const dockApps = [Figma, TextEdit];
export const dockAppsActives = [Corbeille];
export const otherApps = [Aperçu];

const allApplicationsList = [...dockApps, ...dockAppsActives,...otherApps];

const applications = new Map();

const iconPathByStyle = (appName: string, style: string) =>`/public/images/appIcons/${style}/${appName}.png`;

interface Application {
  name: string;
  component: typeof HTMLElement;
  icon: (style: string) => string;
  fileIcon?: (style: string) => string;
}

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

export function getApplicationByID(id: string): Application{
    return applications.has(id) ? applications.get(id) : applications.get("default");
}
