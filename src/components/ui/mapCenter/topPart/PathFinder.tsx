import React, { useCallback, useState } from 'react';
import { PathFinder as CorePathFinder, PathSegment } from '../../../../PathFinder';
import { AccessibilitySettings, Coordinate, LocationSearchResult } from '../../../types/types';
import { EndLocationSearchField } from './EndLocationSearchField';
import { FindPathButton } from './FindPathButton';
import { StartLocationSearchField } from './StartLocationSearchField';

interface PathFinderProps {
  currentFloor: number;
  setCurrentFloor: (floor: number) => void;
  settings?: AccessibilitySettings;
  onPathFound: (path: PathSegment[], startCoord: Coordinate, endCoord: Coordinate) => void;
}

/**
 * PathFinder UI component - Updated to work with LocationSearchResult objects
 * for proper handling of room entries and path finding between different room types
 */
export const PathFinder: React.FC<PathFinderProps> = ({
  currentFloor,
  setCurrentFloor,
  settings,
  onPathFound
}) => {
  const [startLocation, setStartLocation] = useState<LocationSearchResult | null>(null);
  const [endLocation, setEndLocation] = useState<LocationSearchResult | null>(null);
  
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Handler for start location selection (receives full LocationSearchResult)
  const handleStartLocationSearch = useCallback((result: LocationSearchResult | null) => {
    console.log("Start location selected:", result);
    setStartLocation(result);
    setErrorMessage(null);
    if (result && result.floor !== currentFloor) {
      setCurrentFloor(result.floor);
    }
  }, [currentFloor, setCurrentFloor]);

  // Handler for end location selection (receives full LocationSearchResult)
  const handleEndLocationSearch = useCallback((result: LocationSearchResult | null) => {
    console.log("End location selected:", result);
    setEndLocation(result);
    setErrorMessage(null);
    if (result && result.floor !== currentFloor) {
      setCurrentFloor(result.floor);
    }
  }, [currentFloor, setCurrentFloor]);

  // Find path using full location search results
  const findPath = useCallback(() => {
    setErrorMessage(null);
    setIsLoading(true);

    const handleError = (message: string) => {
      console.error("Pathfinding Error:", message);
      setErrorMessage(message);
      setIsLoading(false);
      onPathFound([], {x:0, y:0}, {x:0, y:0}); // Clear existing path on error
    };

    try {
      if (!startLocation || !endLocation) {
        handleError('Please select both start and end locations');
        return;
      }

      // Pass full LocationSearchResult objects to the core PathFinder
      CorePathFinder({
        startLocation,
        endLocation,
        onPathFound: (path: PathSegment[]) => {
          setIsLoading(false);
          if (startLocation && endLocation) {
            onPathFound(path, startLocation.location, endLocation.location);
          } else {
            onPathFound([], {x:0, y:0}, {x:0, y:0});
          }
        },
        onError: handleError
      });
      
    } catch (error) {
      console.error('Error during pathfinding setup:', error);
      handleError('An unexpected error occurred during pathfinding setup');
    }
  }, [startLocation, endLocation, onPathFound]);

  return (
    <div className="flex flex-col w-full space-y-3">
      <div className="flex space-x-4 items-start">
        {/* Start location search field */}
        <div className="flex-1">
          <StartLocationSearchField
            onSearch={handleStartLocationSearch}
            currentFloor={currentFloor}
            setCurrentFloor={setCurrentFloor}
            settings={settings}
          />
        </div>
        
        {/* End location search field */}
        <div className="flex-1">
          <EndLocationSearchField
            onSearch={handleEndLocationSearch}
            currentFloor={currentFloor}
            setCurrentFloor={setCurrentFloor}
            settings={settings}
          />
        </div>
        
        {/* Find path button */}
        <div className="pt-5">
          <FindPathButton
            startLocation={startLocation}
            endLocation={endLocation}
            onFindPath={findPath}
            isLoading={isLoading}
            settings={settings}
          />
        </div>
      </div>
      
      {/* Error message display */}
      {errorMessage && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-lg mt-2" role="alert">
          <span className="block sm:inline">{errorMessage}</span>
        </div>
      )}
    </div>
  );
};