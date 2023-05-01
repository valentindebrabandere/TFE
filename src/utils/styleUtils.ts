
export const stylesList = [
    { call: 'modernMac', name: 'Modern Mac', date: 1982 },
    { call: 'oneBit', name: 'One bit', date: 2023 }
];

export var currentStyle = 'modernMac';

export function setCurrentStyle(style: string): void {
    currentStyle = style;
}

export function changeStyle(direction: string): string {
    const styleIndex = stylesList.findIndex(style => style.call === currentStyle);
    if (direction === 'next') {
        if (styleIndex < stylesList.length - 1) {
            currentStyle = stylesList[styleIndex + 1].call;
            return currentStyle;
        } else {
            currentStyle = stylesList[0].call;
            return currentStyle;
        }
    } else {
        if (styleIndex > 0) {
            currentStyle = stylesList[styleIndex - 1].call;
            return currentStyle;
        } else {
            currentStyle = stylesList[stylesList.length - 1].call;
            return currentStyle;
        }
    }
}