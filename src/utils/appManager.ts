import { Figma } from "../components/apps/figma/figma";
// import { Calculator } from "../apps/calculator/Calculator";
// import { Trash } from "../apps/trash/Trash";

// export const dockApps = [Calculator, Figma];
// export const dockAppsActives = [Trash];
export const dockApps = [Figma];
export const dockAppsActives = [Figma];

const allApplicationsList = [...dockApps, ...dockAppsActives];

const applications = new Map();

allApplicationsList.forEach((app) => {
    applications.set(app.name, {
        icon: "/public/images/appIcons/modernMac/" + app.name + ".png",
        component: app,
        name: app.name
    });
});

applications.set("default", {
    icon: "path",
    component: null,
});

export function getApplicationByID(id: string) {
    return applications.has(id) ? applications.get(id) : applications.get("default");
}
