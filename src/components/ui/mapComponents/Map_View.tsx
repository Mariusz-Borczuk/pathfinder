import React from 'react';
import { MapGrid } from './MapGrid';
import { ScallableMapGrid } from './ScallableMap';

const MapView: React.FC = () => {
    return (
        <div
            className="bg-gray-700 rounded-lg h-5/6 flex items-center justify-center"
            role="region"
            aria-label="Interactive campus map"
        >
           
            <ScallableMapGrid />
        </div>
    );
};

export default MapView;