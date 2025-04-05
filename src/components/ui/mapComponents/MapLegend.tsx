import React from 'react';
import { tileData } from './tileData';

export const MapLegend: React.FC = () => {
    const legendItems = [
        { color: tileData.classroom.color, label: 'Classroom' },
        { color: tileData.path.color, label: 'Path' },
        { color: tileData.stairs.color, label: 'Stairs' },
        { color: tileData.bathroom.color, label: 'Bathroom' },
        { color: tileData.fireEquipment.color, label: 'Fire Equipment' },
        { color: tileData.elevator.color, label: 'Elevator' },
        { color: tileData.utilityRoom.color, label: 'Utility Room' },
        { color: '#34C759', label: 'Entry Point' },
    ];

    return (
        <div className="mt-4 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold mb-3">Map Legend</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {legendItems.map((item, index) => (
                    <div key={index} className="flex items-center">
                        <div
                            className="w-6 h-6 mr-2 rounded-sm"
                            style={{ backgroundColor: item.color }}
                        />
                        <span>{item.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MapLegend; 