import React, { useRef } from 'react';
import { MapViewProps } from '../../types/types';
import { FloorGrid } from './Coordinates_Room_Converter';
import MapLegend from './MapLegend';

export const MapView: React.FC<MapViewProps> = ({ currentFloor, showGrid, highlightedLocation, settings }) => {
    const mapRef = useRef<HTMLDivElement>(null);
    
    return (
        <div className="w-fill h-fit flex flex-col items-center     justify-center">            
            <div
                ref={mapRef}
                className="bg-gray-700 rounded-2xl h-fit flex items-center justify-center w-fit"
                role="region"   
                aria-label="Interactive campus map"
            >
                <FloorGrid 
                    showGrid={showGrid} 
                    currentFloor={currentFloor} 
                    highlightedLocation={highlightedLocation} 
                    settings={settings}
                    
                />
            </div>
            <MapLegend settings={settings} />
        </div>
    );
};
