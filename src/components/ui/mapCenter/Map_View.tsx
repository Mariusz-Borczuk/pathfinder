import React from 'react';
// import { MapGrid } from './MapGrid';
// import { ScallableMapGrid } from './notused/ScallableMap';
import { MapViewProps } from '../../types/types';
import { FloorGrid } from './Coordinates_Room_Converter';

export const MapView: React.FC<MapViewProps> = ({ currentFloor, showGrid }) => {
     
    return (
        <div
            className="bg-gray-700 rounded-lg h-11/12 flex items-center justify-center"
            role="region"   
            aria-label="Interactive campus map"
        >
            <FloorGrid showGrid={showGrid} currentFloor={currentFloor} />
        </div>
    );
};
