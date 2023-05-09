import { Figma } from "../components/apps/figma/figma";
import { TextEdit } from "../components/apps/textEdit/textEdit";
// import { Calculator } from "../apps/calculator/Calculator";
// import { Trash } from "../apps/trash/Trash";

// export const dockApps = [Calculator, Figma];
// export const dockAppsActives = [Trash];
export const dockApps = [Figma, TextEdit];
export const dockAppsActives = [Figma];

const allApplicationsList = [...dockApps, ...dockAppsActives];

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
