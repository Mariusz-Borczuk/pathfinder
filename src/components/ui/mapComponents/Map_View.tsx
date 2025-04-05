import React from 'react';
// import { MapGrid } from './MapGrid';
import { ScallableMapGrid } from './notused/ScallableMap';
import Room103Example from './Coordinates_Room_Converter';

export const MapView: React.FC = () => {
    return (
        <div
            className="bg-gray-700 rounded-lg h-11/12 flex items-center justify-center"
            role="region"
            aria-label="Interactive campus map"
        >
            {/* <ScallableMapGrid /> */}
            <Room103Example />
        </div>
    );
};
