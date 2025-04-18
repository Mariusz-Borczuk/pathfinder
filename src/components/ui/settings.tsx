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

// Function to get font size class based on settings
export const getFontSizeClass = (settings?: AccessibilitySettings): string => {
    if (!settings) return "text-base";
    
    return settings.fontSize === "large" 
        ? "text-lg" 
        : settings.fontSize === "xlarge" 
            ? "text-xl" 
            : "text-base";
};

// Function to get high contrast styles for search components
export const getSearchStyles = (settings?: AccessibilitySettings) => {
    if (settings?.contrast === "high") {
        return {
            labelText: 'text-white font-bold',
            inputBg: 'bg-white',
            inputText: 'text-black font-bold',
            inputBorder: 'border-4 border-black',
            buttonBg: 'bg-white',
            buttonText: 'text-black',
            dropdownBg: 'bg-black',
            dropdownBorder: 'border-4 border-white',
            dropdownItemHover: 'hover:bg-gray-800',
            resultText: 'text-white font-bold',
            resultDetailText: 'text-white',
            highlightBadge: 'bg-white text-black font-bold right-0',
            iconColor: 'text-black'
        };
    }
    
    return {
        labelText: 'text-gray-200',
        inputBg: 'bg-white',
        inputText: 'text-gray-800',
        inputBorder: 'border border-gray-300',
        buttonBg: 'bg-blue-600',
        buttonText: 'text-white',
        dropdownBg: 'bg-white',
        dropdownBorder: 'border border-gray-300',
        dropdownItemHover: 'hover:bg-gray-100',
        resultText: 'text-gray-800',
        resultDetailText: 'text-gray-500',
        highlightBadge: 'bg-blue-100 text-blue-800',
        iconColor: 'text-white'
    };
};