import { FaRoute } from '@/utils/icons';
import React from 'react';
import { AccessibilitySettings, LocationSearchResult } from '../../../types/types';

interface FindPathButtonProps {
  startLocation: LocationSearchResult | null;
  endLocation: LocationSearchResult | null;
  onFindPath: () => void;
  isLoading?: boolean;
  settings?: AccessibilitySettings;
}

/**
 * FindPathButton component provides a visually prominent button to trigger pathfinding
 * between selected start and end locations.
 * 
 * @component
 * @param {Object} props - Component properties
 * @param {LocationSearchResult|null} props.startLocation - Selected starting location
 * @param {LocationSearchResult|null} props.endLocation - Selected destination location
 * @param {Function} props.onFindPath - Function to call when the button is clicked
 * @param {boolean} props.isLoading - Whether the pathfinding process is in progress
 * @param {AccessibilitySettings} props.settings - Accessibility settings for styling
 * @returns {React.ReactElement} The rendered button component
 */
export const FindPathButton: React.FC<FindPathButtonProps> = ({
  startLocation,
  endLocation,
  onFindPath,
  isLoading = false,
  settings
}) => {
  // Determine if the button should be enabled based on selected locations
  const isDisabled = isLoading || !startLocation || !endLocation;

  // Get the appropriate button color based on the state
  const getButtonColor = () => {
    if (isLoading) return 'bg-gray-500 cursor-wait';
    if (isDisabled) return 'bg-gray-500 cursor-not-allowed opacity-70';
    
    // Use high contrast if specified in settings
    if (settings?.contrast === 'high') {
      return 'bg-yellow-500 hover:bg-yellow-600 text-black';
    }
    
    return 'bg-orange-500 hover:bg-orange-600 text-white';
  };

  // Get font size class from settings if available
  const fontSizeClass = settings?.fontSize === 'large' 
    ? 'text-lg' 
    : settings?.fontSize === 'xlarge' 
      ? 'text-xl' 
      : 'text-base';

  return (
    <button
      className={`px-5 py-3 rounded-lg font-medium flex items-center justify-center 
                 shadow-md ${getButtonColor()} transition-colors ${fontSizeClass}
                 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-offset-2`}
      onClick={onFindPath}
      disabled={isDisabled}
      aria-label="Find path between selected locations"
      title={isDisabled ? "Select both start and end locations first" : "Find path between selected locations"}
    >
      <FaRoute className="mr-2" />
      {isLoading ? 'Finding Path...' : 'Find Path'}
    </button>
  );
};