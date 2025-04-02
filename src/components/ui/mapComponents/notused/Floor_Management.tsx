import React from 'react';

interface FloorManagementProps {
    currentFloor: number;
    onFloorChange: (floor: number) => void;
}

export const FloorManagement: React.FC<FloorManagementProps> = ({ currentFloor, onFloorChange }) => {
    const floors = [1, 2, 3];

    return (
        <div className="mb-6">
            <h2 className="font-semibold mb-2 text-gray-200">Floor Level</h2>
            <div className="flex w-full gap-2">
                {floors.map((floor) => (
                    <button
                        key={floor}
                        onClick={() => onFloorChange(floor)}
                        className={`flex-1 p-2 rounded transition-colors duration-200 ${
                            currentFloor === floor
                                ? 'bg-blue-600 text-white hover:bg-blue-700'
                                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                        aria-pressed={currentFloor === floor}
                    >
                        {floor}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default FloorManagement;