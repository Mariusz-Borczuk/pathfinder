import { AccessibilitySettings } from "./Accessibility_Settings";

export const getTextClass = (settings: AccessibilitySettings) => {
    let textClass = "transition-all duration-200 ";
    if (settings.fontSize === "large") textClass += "text-lg ";
    if (settings.fontSize === "xlarge") textClass += "text-xl ";
    if (settings.isDyslexicFont) textClass += "font-mono ";
    return textClass.trim();
};
