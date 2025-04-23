import React, { useCallback, useState } from 'react';
import { PathFinder as CorePathFinder } from '../../../../PathFinder';
import { AccessibilitySettings, Coordinate } from '../../../types/types';
import { EndLocationSearchField } from './EndLocationSearchField';
import { FindPathButton } from './FindPathButton';
import { StartLocationSearchField } from './StartLocationSearchField';

// Define path segment interface
export interface PathSegment {
  start: Coordinate;
  end: Coordinate;
  floor: number;
}

interface PathFinderProps {
  currentFloor: number;
  setCurrentFloor: (floor: number) => void;
  settings?: AccessibilitySettings;
  onPathFound: (path: PathSegment[]) => void;
}

/**
 * PathFinder UI component - Simplified to pass only coordinates to core PathFinder
 */
export const PathFinder: React.FC<PathFinderProps> = ({
  currentFloor,
  setCurrentFloor,
  settings,
  onPathFound
}) => {
  const [startCoord, setStartCoord] = useState<Coordinate | null>(null);
  const [startFloor, setStartFloor] = useState<number | null>(null);
  const [endCoord, setEndCoord] = useState<Coordinate | null>(null);
  const [endFloor, setEndFloor] = useState<number | null>(null);
  
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Handler for start location selection (receives coordinate and floor)
  const handleStartLocationSearch = useCallback((coordinate: Coordinate | null, floor: number | null) => {
    console.log("Start coordinates selected:", coordinate);
    setStartCoord(coordinate);
    setStartFloor(floor);
    setErrorMessage(null);
    if (floor && floor !== currentFloor) {
      setCurrentFloor(floor);
    }
  }, [currentFloor, setCurrentFloor]);

  // Handler for end location selection (receives coordinate and floor)
  const handleEndLocationSearch = useCallback((coordinate: Coordinate | null, floor: number | null) => {
    console.log("End coordinates selected:", coordinate);
    setEndCoord(coordinate);
    setEndFloor(floor);
    setErrorMessage(null);
    if (floor && floor !== currentFloor) {
      setCurrentFloor(floor);
    }
  }, [currentFloor, setCurrentFloor]);

  // Find the path using coordinates and floors
  const findPath = useCallback(() => {
    setErrorMessage(null);
    setIsLoading(true);

    const handleError = (message: string) => {
      console.error("Pathfinding Error:", message);
      setErrorMessage(message);
      setIsLoading(false);
    };

    try {
      if (!startCoord || !endCoord || startFloor === null || endFloor === null) {
        handleError('Please select both start and end locations');
        return;
      }

      if (startFloor !== endFloor) {
        handleError('Pathfinding between different floors is not supported yet');
        return;
      }

      // Directly call the core PathFinder function, which is now a pure function (no hooks)
      CorePathFinder({
        startCoord,
        endCoord,
        currentFloor: startFloor,
        onPathFound: (path) => {
          setIsLoading(false);
          onPathFound(path);
        },
        onError: handleError
      });
      
    } catch (error) {
      console.error('Error during pathfinding setup:', error);
      handleError('An unexpected error occurred during pathfinding setup');
    }
  }, [startCoord, startFloor, endCoord, endFloor, onPathFound]);

  // Create minimal objects for FindPathButton (just enough to enable/disable the button)
  const startMinimal = startCoord ? {
    location: startCoord,
    floor: startFloor ?? 0,
    name: 'Start',
    type: 'coordinate'
  } : null;
  
  const endMinimal = endCoord ? {
    location: endCoord,
    floor: endFloor ?? 0,
    name: 'End',
    type: 'coordinate'
  } : null;

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
            startLocation={startMinimal}
            endLocation={endMinimal}
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