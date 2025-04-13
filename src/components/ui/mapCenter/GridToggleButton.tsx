import { Grid } from 'lucide-react';
import React from 'react';
import { GridToggleButtonProps } from '../../types/types';

export const GridToggleButton: React.FC<GridToggleButtonProps> = ({ 
    showGrid, 
    onToggle, 
    settings 
}) => {
    const contrast = settings?.contrast || "normal";
    
    return (
        <button
            onClick={onToggle}
            className={`p-2 rounded-lg ${
                contrast === "high"
                    ? "bg-red-300 hover:bg-gray-400"
                    : "bg-gray-200 hover:bg-gray-300"
            }`}
            title={showGrid ? "Hide Grid" : "Show Grid"}
        >
            <Grid
                className={`w-6 h-6 ${
                    contrast === "high"
                        ? "text-gray-100"
                        : "text-gray-800"
                }`}
            />
        </button>
    );
}; 