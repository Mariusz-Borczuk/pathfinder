import React, { useCallback, useState } from 'react';
import { AccessibilitySettings, LocationSearchResult } from '../../../types/types';
import { EndLocationSearchField } from './EndLocationSearchField';
import { FindPathButton } from './FindPathButton';
import { StartLocationSearchField } from './StartLocationSearchField';

// Define path segment interface
export interface PathSegment {
  start: { x: number; y: number };
  end: { x: number; y: number };
  floor: number;
}

interface PathFinderProps {
  currentFloor: number;
  setCurrentFloor: (floor: number) => void;
  settings?: AccessibilitySettings;
  onPathFound: (path: PathSegment[]) => void;
}

/**
 * PathFinder component handles the UI for selecting start and end locations
 * and triggering the path finding logic.
 * 
 * @component
 * @param {Object} props - Component properties
 * @param {number} props.currentFloor - Current floor being viewed
 * @param {function} props.setCurrentFloor - Function to change current floor
 * @param {AccessibilitySettings} [props.settings] - Accessibility settings
 * @param {function} props.onPathFound - Callback when a path is found
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

  // Handler for when start location is selected
  const handleStartLocationSearch = useCallback((result: LocationSearchResult) => {
    setStartLocation(result);
    setErrorMessage(null);
  }, []);

  // Handler for when end location is selected
  const handleEndLocationSearch = useCallback((result: LocationSearchResult) => {
    setEndLocation(result);
    setErrorMessage(null);
  }, []);

  // Find the path between start and end locations
  const findPath = useCallback(async () => {
    // Reset error message and set loading state
    setErrorMessage(null);
    setIsLoading(true);

    try {
      // Check if both locations are selected
      if (!startLocation || !endLocation) {
        setErrorMessage('Please select both start and end locations');
        return;
      }

      // Check if locations are on the same floor
      if (startLocation.floor !== endLocation.floor) {
        setErrorMessage('Pathfinding between different floors is not supported yet');
        return;
      }

      // Import the pathfinder logic
      const { PathFinder: PathFinderClass } = await import('../../../../PathFinder');
      
      // Create pathfinder instance
      const pathFinder = PathFinderClass({
        startLocation,
        endLocation,
        currentFloor,
        onPathFound,
        onError: setErrorMessage
      });
      
      // Find the path if pathFinder is defined and has findPath method
      if (pathFinder && typeof pathFinder === 'object' && 'findPath' in pathFinder) {
        (pathFinder as { findPath: () => void }).findPath();
      } else {
        setErrorMessage('Failed to initialize path finder');
      }
      
    } catch (error) {
      console.error('Error in pathfinding:', error);
      setErrorMessage('An unexpected error occurred during pathfinding');
    } finally {
      setIsLoading(false);
    }
  }, [startLocation, endLocation, currentFloor, onPathFound]);

  return (
    <div className="flex flex-col w-full space-y-3">
      <div className="flex space-x-4 items-start">
        {/* Start location search field - now with selectedLocation prop */}
        <div className="flex-1">
          <StartLocationSearchField
            onSearch={handleStartLocationSearch}
            currentFloor={currentFloor}
            setCurrentFloor={setCurrentFloor}
            settings={settings}
            selectedLocation={startLocation}
          />
        </div>
        
        {/* End location search field - now with selectedLocation prop */}
        <div className="flex-1">
          <EndLocationSearchField
            onSearch={handleEndLocationSearch}
            currentFloor={currentFloor}
            setCurrentFloor={setCurrentFloor}
            settings={settings}
            selectedLocation={endLocation}
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
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-lg" role="alert">
          <span className="block sm:inline">{errorMessage}</span>
        </div>
      )}
    </div>
  );
};