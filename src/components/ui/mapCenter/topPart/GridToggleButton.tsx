import { Grid } from 'lucide-react';
import React from 'react';
import { AccessibilitySettings, GridToggleButtonProps } from '../../../types/types';
import { getSettings } from '../../settings';

export const GridToggleButton: React.FC<GridToggleButtonProps> = ({ 
    showGrid, 
    onToggle, 
    settings = { contrast: "normal", fontSize: "medium", isDyslexicFont: false }
}) => {
    // Simplified initialization using the current showGrid state for the label
    const gridLabel = showGrid ? "Hide Grid" : "Show Grid";
    
    // Get contrast-appropriate styles
    const labelClass = settings.contrast === "high" 
        ? `text-white font-bold ${getSettings(settings as AccessibilitySettings)} mb-1 px-2 py-0.5 rounded-md` 
        : `text-white font-medium ${getSettings(settings as AccessibilitySettings)} mb-1 px-2 py-0.5 rounded-md`;
    
    return (
        <div className="flex flex-col items-center">
            <span className={labelClass}>{gridLabel}</span>
            <button
                onClick={onToggle}
                className={`p-2.5 rounded-lg ${
                    showGrid 
                    ? "bg-gradient-to-br bg-blue-600" 
                    : "bg-gradient-to-br bg-gray-700"
                } hover:shadow-lg hover:scale-105 flex items-center justify-center border`}
                title={gridLabel}
                aria-label={gridLabel}
            >
                <Grid
                    className={`w-6 h-6 ${showGrid ? "text-white" : "text-gray-300"}`}
                    strokeWidth={showGrid ? 2 : 1.5}
                    size={16}
                />
            </button>
        </div>
    );
};