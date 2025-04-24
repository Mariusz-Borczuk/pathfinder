import React from 'react';
import { getFontSizeClass } from '../../settings';
import { AccessibilityFontSizeProps, GridToggleButtonProps } from '../../../types/types';
import { IoMdGrid } from '@/utils/icons';

/**
 * A button component that toggles the grid visibility on the map.
 * 
 * @component
 * @param {Object} props - The component props
 * @param {boolean} props.showGrid - The current state of grid visibility
 * @param {() => void} props.onToggle - Function to toggle grid visibility
 * @param {Object} [props.settings] - Accessibility settings for the component
 * @param {string} [props.settings.contrast="normal"] - Contrast setting ("normal" or "high")
 * @param {string} [props.settings.fontSize="normal"] - Font size setting
 * 
 * @returns {JSX.Element} A button with appropriate styling based on grid visibility state
 */
export const GridToggleButton: React.FC<GridToggleButtonProps> = ({ 
    showGrid, 
    onToggle, 
    settings
}) => {
    // Simplified initialization using the current showGrid state for the label
    const gridLabel = showGrid ? "Hide Grid" : "Show Grid";
    // Get font size class from settings
    const fontSizeClass = getFontSizeClass(settings as AccessibilityFontSizeProps);
    
    // Get contrast-appropriate styles
    const labelClass = settings.contrast === "high" 
        ? `text-white font-bold ${fontSizeClass} mb-1 px-2 py-0.5 rounded-md` 
        : `text-white font-medium ${fontSizeClass} mb-1 px-2 py-0.5 rounded-md`;
    
    return (
        <div className="flex flex-col items-center justify-center">
            <span className={`text-center ${labelClass}`}>{gridLabel}</span>
            <button
            onClick={onToggle}
            className={`p-2.5 rounded-lg ${
                showGrid 
                ? "bg-blue-600 hover:bg-blue-700" 
                : "bg-gray-700 hover:bg-gray-800"
            } hover:shadow-lg hover:scale-105 flex items-center justify-center border`}
            title={gridLabel}
            aria-label={gridLabel}
            >
            <IoMdGrid
                className={`w-6 h-6 ${showGrid ? "text-white" : "text-gray-300"}`}
            />
            </button>
        </div>
    );
}