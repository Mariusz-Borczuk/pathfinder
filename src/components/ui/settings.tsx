import { AccessibilitySettings } from "../types/types";

export const getSettings = ({ contrast, isDyslexicFont, fontSize }: AccessibilitySettings): string => {
    return `${
        contrast === "high" ? "text-white-100" : "text-red-700"
    } ${isDyslexicFont ? "font-dyslexic" : ""} ${
        fontSize === "large"
            ? "text-lg"
            : fontSize === "xlarge"
            ? "text-2xl"
            : fontSize === "normal"
            ? "text-md"
            : ""
    }`.trim();
};