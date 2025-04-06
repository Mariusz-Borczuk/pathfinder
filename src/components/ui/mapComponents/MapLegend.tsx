import React from 'react';
import { tileData } from './types/tileData';

export const MapLegend: React.FC = () => {
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
            <h3 className="text-lg font-semibold mb-3 text-gray-200">Map Legend</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {legendItems.map((item, index) => (
                    <div key={index} className="flex items-center">
                        <div
                            className="w-6 h-6 mr-2 rounded-sm"
                            style={{ backgroundColor: item.color }}
                        />
                        <span className="text-gray-300">{item.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MapLegend; 