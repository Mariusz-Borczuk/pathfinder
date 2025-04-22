import React, { useRef } from 'react';
import { MapViewProps } from '../../types/types';
import { FloorGrid } from './Coordinates_Room_Converter';
import MapLegend from './MapLegend';

/**
 * A component that renders a map view of the current floor.
 * 
 * The map can display a grid and highlight specific locations based on the provided props.
 * It includes both the main map content and a legend to help users interpret the map.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.currentFloor - The current floor to display in the map
 * @param {boolean} props.showGrid - Whether to display the grid on the map
 * @param {Object|null} props.highlightedLocation - The destination location to highlight on the map, if any
 * @param {Object|null} props.startLocation - The starting location to highlight on the map, if any
 * @param {Object} props.settings - Application settings that affect map display
 * @returns {JSX.Element} The rendered map view component
 */
export const MapView: React.FC<MapViewProps> = ({ 
    currentFloor, 
    showGrid, 
    endLocation, 
    startLocation, 
    settings 
}) => {
    const mapRef = useRef<HTMLDivElement>(null);
    
    return (
        <div className="w-fill h-fit flex flex-col items-center justify-center">            
            <div
                ref={mapRef}
                className="bg-gray-700 rounded-2xl h-fit flex items-center justify-center w-fit"
                role="region"   
                aria-label="Interactive campus map"
            >
                <FloorGrid 
                    showGrid={showGrid} 
                    currentFloor={currentFloor} 
                    endLocation={endLocation}
                    startLocation={startLocation}
                    settings={settings}
                />
            </div>
            <MapLegend settings={settings} />
        </div>
    );
};
