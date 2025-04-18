import React from 'react';
import { tileData } from '../../types/tileData';
import { AccessibilitySettings } from '../../types/types'; // Import AccessibilitySettings
import { getFontSizeClass } from '../settings'; // Import helper function

// Define props for MapLegend
export interface MapLegendProps {
    settings?: AccessibilitySettings;
}

export const MapLegend: React.FC<MapLegendProps> = ({ settings }) => {
    // Get full accessibility settings or use defaults
    const accessSettings = settings || {
        fontSize: "normal",
        contrast: "normal", 
        isDyslexicFont: false
    };

    // Determine font size and family classes
    const fontSizeClass = getFontSizeClass(accessSettings);
    const fontFamilyClass = accessSettings.isDyslexicFont ? "font-dyslexic" : "";

    const legendItems = [
        { label: 'Classroom', color: tileData.classroom.color },
        { label: 'Entry Point', color: tileData.entry.color },
        { label: 'Path', color: tileData.path.color },
        { label: 'Bathroom', color: tileData.bathroom.color },
        { label: 'Elevator', color: tileData.elevator.color },
        { label: 'Stairs', color: tileData.stairs.color },
        { label: 'Fire Equipment', color: tileData.fireEquipment.color },
        { label: 'Utility Room', color: tileData.utilityRoom.color },
    ];

    return (
        <div className="mt-4 p-4 bg-gray-800 rounded-lg shadow-sm border border-gray-700">
            {/* Apply settings to the title */}
            <h3 className={`text-lg font-semibold mb-3 text-gray-200 ${fontSizeClass} ${fontFamilyClass}`}>Map Legend</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {legendItems.map((item, index) => (
                    <div key={index} className="flex items-center">
                        <div
                            className="w-6 h-6 mr-2 rounded-sm"
                            style={{ backgroundColor: item.color }}
                        />
                        {/* Apply settings to the label span */}
                        <span className={`text-gray-300 ${fontSizeClass} ${fontFamilyClass}`}>{item.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MapLegend;