import React, { useRef } from 'react';
import { MapViewProps } from '../../types/types';
import { FloorGrid } from './Coordinates_Room_Converter';

export const MapView: React.FC<MapViewProps> = ({ currentFloor, showGrid, settings, highlightedLocation }) => {
    const mapRef = useRef<HTMLDivElement>(null);
    
    return (
        <div className="w-full">            
            <div
                ref={mapRef}
                className="bg-gray-700 rounded-lg h-11/12 flex items-center justify-center relative"
                role="region"   
                aria-label="Interactive campus map"
            >
                <FloorGrid showGrid={showGrid} currentFloor={currentFloor} />
                
                {highlightedLocation && (
                    <div 
                        className="absolute w-6 h-6 bg-red-500 rounded-full animate-pulse border-2 border-white"
                        style={{
                            left: `calc(${highlightedLocation.location.x * 12}px + 1rem)`,
                            top: `calc(${highlightedLocation.location.y * 12}px + 1rem)`,
                            transform: 'translate(-50%, -50%)',
                            zIndex: 100
                        }}
                        title={highlightedLocation.description || highlightedLocation.name}
                    >
                        <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-75"></div>
                    </div>
                )}
            </div>
        </div>
    );
};
