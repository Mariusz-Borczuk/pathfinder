import React, { useCallback, useState } from 'react';
import { PathFinder as CorePathFinder, PathSegment } from '../../../../RouteCalculator';
import { LocationSearchResult, PathFinderProps } from '../../../types/types';
import { EndLocationSearchField } from './EndLocationSearchField';
import { FindPathButton } from './FindPathButton';
import { StartLocationSearchField } from './StartLocationSearchField';

/**
 * PathFinder UI component - Handles location selection and pathfinding
 * with support for wheelchair accessibility
 */
export const PathFinder: React.FC<PathFinderProps> = ({
  currentFloor,
  setCurrentFloor,
  settings,
  onPathFound,
  isWheelchair = false 
}) => {
  // State management with proper TypeScript typing
  const [startLocation, setStartLocation] = useState<LocationSearchResult | null>(null);
  const [endLocation, setEndLocation] = useState<LocationSearchResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Handler for start location selection
  const handleStartLocationSearch = useCallback((result: LocationSearchResult | null): void => {
    setStartLocation(result);
    setErrorMessage(null);
    
    if (result && result.floor !== currentFloor) {
      setCurrentFloor(result.floor);
    }
  }, [currentFloor, setCurrentFloor]);

  // Handler for end location selection
  const handleEndLocationSearch = useCallback((result: LocationSearchResult | null): void => {
    setEndLocation(result);
    setErrorMessage(null);
    
    if (result && result.floor !== currentFloor) {
      setCurrentFloor(result.floor);
    }
  }, [currentFloor, setCurrentFloor]);

  // Error handler function
  const handleError = useCallback((message: string): void => {
    setErrorMessage(message);
    setIsLoading(false);
    // Clear existing path on error with dummy coordinates
    onPathFound([], { x: 0, y: 0 }, { x: 0, y: 0 });
  }, [onPathFound]);

  // Find path using full location search results
  const findPath = useCallback((): void => {
    setErrorMessage(null);
    setIsLoading(true);

    try {
      if (!startLocation || !endLocation) {
        handleError('Please select both start and end locations');
        return;
      }

      // Pass to the core PathFinder with proper typing
      CorePathFinder({
        startLocation,
        endLocation,
        isWheelchair,
        onPathFound: (path: PathSegment[]): void => {
          setIsLoading(false);
          
          if (startLocation && endLocation) {
            // If path transitions between floors, log info for debugging
            if (path.length > 0) {
              const transitSegment = path.find(segment => segment.isTransitPoint);
              if (transitSegment) {
                console.log(`Transit via ${transitSegment.transitType} detected between floors`);
              }
            }
            
            onPathFound(path, startLocation.location, endLocation.location);
          } else {
            onPathFound([], { x: 0, y: 0 }, { x: 0, y: 0 });
          }
        },
        onError: handleError
      });
    } catch (error) {
      console.error('Error during pathfinding:', error);
      handleError('An unexpected error occurred during pathfinding');
    }
  }, [startLocation, endLocation, onPathFound, isWheelchair, handleError]); 

  // Accessibility message using template literal
  const accessibilityMessage = isWheelchair 
    ? "Wheelchair accessible path mode is active - Using elevators for floor transitions" 
    : "Standard path mode - Using stairs or elevators for floor transitions";

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
            isWheelchair={isWheelchair}
          />
        </div>
      </div>
      
      {/* Error message display */}
      {errorMessage && (
        <div 
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-lg mt-2" 
          role="alert"
          aria-live="polite"
        >
          <span className="block sm:inline">{errorMessage}</span>
        </div>
      )}
      
      {/* Accessibility message */}
      <div 
        className={`text-xs ${isWheelchair ? 'text-blue-600' : 'text-gray-500'} px-1`}
        aria-live="polite"
      >
        {accessibilityMessage}
      </div>
    </div>
  );
};