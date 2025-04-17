import { Grid } from 'lucide-react';
import React from 'react';
import { GridToggleButtonProps } from '../../types/types';

export const GridToggleButton: React.FC<GridToggleButtonProps> = ({ 
    showGrid, 
    onToggle, 
}) => {
    
    return (
        <button
            onClick={onToggle}
            className={`p-2 rounded-lg ${showGrid ? "bg-blue-600" : "bg-gray-700"} hover:bg-blue-700 transition-colors duration-200 shadow-md`}
            title={showGrid ? "Hide Grid" : "Show Grid"}
        >
            <Grid
            className={`w-6 h-6 ${showGrid ? "text-white" : "text-gray-300"}`}
            strokeWidth={1.5}
            size={15}
            />
        </button>
    );
}; 