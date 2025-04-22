import { FaFireExtinguisher, FaPlay, FaRestroom, FaWrench, MdElevator, MdLocationPin, MdStairs, SiGoogleclassroom } from '@/utils/icons';
import React, { useEffect, useState } from 'react';
import { allFloorData, Coordinate, coordRegex, LocationSearchFieldProps, LocationSearchResult } from '../../../types/types';
import { getFontSizeClass, getStartLocationStyles } from '../../settings';

/**
 * A search input component that allows users to set their starting location
 * either by selecting a known location (classroom, bathroom, etc.) or by entering coordinates.
 * 
 * This component is styled in green to distinguish it as the "start" location selector.
 * Modified to ensure compatibility with PathFinder and proper display on FloorGrid.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Function} props.onSearch - Callback function triggered when a start location is selected
 * @param {number} props.currentFloor - The floor currently being viewed
 * @param {Function} props.setCurrentFloor - Function to change the current floor
 * @param {Object} props.settings - Visual settings for styling the component
 * @returns {React.ReactElement} The start location search field component with dropdown results
 */
export const StartLocationSearchField: React.FC<LocationSearchFieldProps> = ({
  onSearch,
  currentFloor,
  setCurrentFloor,
  settings
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<LocationSearchResult[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Parse the search query to check if it's a coordinate
  const parseCoordinates = (query: string): Coordinate | null => {
    // Format examples: "x:10 y:20", "10,20", "(10,20)"
    const match = query.match(coordRegex);
    
    if (match) {
      const x = parseInt(match[1] || match[3] || '0');
      const y = parseInt(match[2] || match[4] || '0');
      
      if (!isNaN(x) && !isNaN(y)) {
        return { x, y };
      }
    }
    
    return null;
  };

  // Search for locations based on the query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setIsDropdownOpen(false);
      return;
    }

    const results: LocationSearchResult[] = [];
    const lowerQuery = searchQuery.toLowerCase();
    
    // Check if query is a coordinate
    const coordinates = parseCoordinates(searchQuery);
    if (coordinates) {
      results.push({
        type: 'coordinate',
        name: `Start at (${coordinates.x}, ${coordinates.y})`,
        floor: currentFloor,
        location: coordinates,
        description: `Set starting point at coordinates (${coordinates.x}, ${coordinates.y})`
      });
    }
    
    // Search for classrooms, bathrooms, etc.
    allFloorData.forEach((floorData, floorIndex) => {
      const floorNumber = floorIndex + 1;
      
      // Search classrooms
      floorData.classrooms.forEach(room => {
        if (room.number.toLowerCase().includes(lowerQuery)) {
          const defaultLocation = { x: Math.floor((room.start.x + room.end.x) / 2), y: Math.floor((room.start.y + room.end.y) / 2) };
          
          // Try to use the first entry point if available, or find the nearest path cell
          let entryCoord: Coordinate;
          if (Array.isArray(room.entry) && room.entry.length > 0 && room.entry[0] !== undefined) {
            entryCoord = room.entry[0];
          } else if (room.entry && !Array.isArray(room.entry)) {
            entryCoord = room.entry;
          } else {
            // If no entry is defined, use the default location (center of the room)
            entryCoord = defaultLocation;
          }
            
          results.push({
            type: 'classroom',
            name: `Start at Classroom ${room.number}`,
            floor: floorNumber,
            location: entryCoord,
            description: `Set starting point at Classroom ${room.number} on floor ${floorNumber}`,
            roomId: room.number // Add roomId to help with path finding
          });
        }
      });
      
      // Search bathrooms
      floorData.bathrooms.forEach(bathroom => {
        if (bathroom.type.toLowerCase().includes(lowerQuery) || 'bathroom'.includes(lowerQuery)) {
          results.push({
            type: 'bathroom',
            name: `Start at ${bathroom.type} Bathroom`,
            floor: floorNumber,
            location: bathroom.entry,
            description: `Set starting point at ${bathroom.type} Bathroom on floor ${floorNumber}`
          });
        }
      });
      
      // Search elevators
      if ('elevator'.includes(lowerQuery)) {
        floorData.elevators.forEach((elevator, index) => {
          results.push({
            type: 'elevator',
            name: `Start at Elevator ${index + 1}`,
            floor: floorNumber,
            location: elevator.entry,
            description: `Set starting point at Elevator ${index + 1} on floor ${floorNumber}`
          });
        });
      }
      
      // Search stairs
      if ('stair'.includes(lowerQuery) || 'stairs'.includes(lowerQuery)) {
        floorData.stairs.forEach((stair, index) => {
          const centerX = Math.floor((stair.start.x + stair.end.x) / 2);
          const centerY = Math.floor((stair.start.y + stair.end.y) / 2);
          
          results.push({
            type: 'stairs',
            name: `Start at Staircase ${index + 1}`,
            floor: floorNumber,
            location: { x: centerX, y: centerY },
            description: `Set starting point at Staircase ${index + 1} on floor ${floorNumber}`
          });
        });
      }
      
      // Search utility rooms
      floorData.utilityRooms.forEach(room => {
        if (room.name.toLowerCase().includes(lowerQuery)) {
          const centerX = Math.floor((room.start.x + room.end.x) / 2);
          const centerY = Math.floor((room.start.y + room.end.y) / 2);
          
          results.push({
            type: 'utilityRoom',
            name: `Start at ${room.name}`,
            floor: floorNumber,
            location: { x: centerX, y: centerY },
            description: `Set starting point at ${room.name} on floor ${floorNumber}`
          });
        }
      });
      
      // Search fire equipment
      if ('fire'.includes(lowerQuery) || 'extinguisher'.includes(lowerQuery)) {
        floorData.fireEquipment.forEach((equipment, index) => {
          results.push({
            type: 'fireEquipment',
            name: `Start at Fire Equipment ${index + 1}`,
            floor: floorNumber,
            location: equipment.location,
            description: `Set starting point at Fire Equipment ${index + 1} on floor ${floorNumber}`
          });
        });
      }
    });
    
    setSearchResults(results);
    setIsDropdownOpen(results.length > 0);
  }, [searchQuery, currentFloor]);

  // Handle search result selection
  const handleResultClick = (result: LocationSearchResult) => {
    if (result.floor !== currentFloor && setCurrentFloor) {
      setCurrentFloor(result.floor);
    }
    
    // Ensure the result has all needed properties for pathfinding
    const enhancedResult: LocationSearchResult = {
      ...result,
      isStartLocation: true // Mark as start location for pathfinding
    };
    
    onSearch(enhancedResult);
    setSearchQuery('');
    setIsDropdownOpen(false);
  };

  // Get the appropriate font size class based on settings
  const fontSizeClass = settings && settings.fontSize ? getFontSizeClass({
    fontSize: settings.fontSize,
    contrast: settings.contrast || 'normal',
    isDyslexicFont: settings.isDyslexicFont || false
  }) : 'text-base';

  // Custom green styles for the start location field
  const styles = getStartLocationStyles(settings);

  return (
    <div className="relative w-full">
      <div className="relative">
        <label htmlFor="start-location-search" className={`block text-sm font-medium ${styles.labelText} ${fontSizeClass}`}>
          Set Starting Point
        </label>
        <input
          id="start-location-search"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search start point..."
          className={`w-full px-3 pr-10 py-2 ${styles.inputBg} ${styles.inputText} ${styles.inputBorder} rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm ${fontSizeClass}`}
          onFocus={() => searchResults.length > 0 && setIsDropdownOpen(true)}
          onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
          aria-label="Search for a starting location"
        />
        <div className="absolute inset-y-0 right-0 flex items-center top-5"> 
          <button 
            className={`${styles.buttonBg} ${styles.buttonText} h-full px-2 rounded-r-lg shadow-sm hover:scale-105 transition-opacity focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-green-500 flex items-center justify-center border-l ${styles.inputBorder}`}
            onClick={() => {
              if (searchResults.length > 0 && searchResults[0]) {
                handleResultClick(searchResults[0]);
              }
            }}
            aria-label="Set starting point"
          >
            <FaPlay className={`h-4 w-4 ${styles.iconColor}`} />
          </button>
        </div>
      </div>
      
      {isDropdownOpen && searchResults.length > 0 && (
        <div className={`absolute z-180 mt-1 w-full ${styles.dropdownBg} ${styles.dropdownBorder} border-2 border-green-500 rounded-lg p-1 shadow-lg max-h-60 overflow-hidden`}>
          <div className="overflow-y-auto max-h-60">
            {searchResults.map((result, index) => (
              <div
                key={`${result.type}-${result.name}-${index}`}
                className={`px-4 py-2 cursor-pointer ${styles.dropdownItemHover} flex items-center ${fontSizeClass}`}
                onClick={() => handleResultClick(result)}
              >
                <div className="mr-1 pr-2 text-lg text-green-600">
                  {/* Icons for different location types */}
                  {result.type === 'classroom' && <span><SiGoogleclassroom /></span>}
                  {result.type === 'bathroom' && <span><FaRestroom /></span>}
                  {result.type === 'elevator' && <span><MdElevator /></span>}
                  {result.type === 'stairs' && <span><MdStairs /></span>}
                  {result.type === 'fireEquipment' && <span><FaFireExtinguisher /></span>}
                  {result.type === 'utilityRoom' && <span><FaWrench /></span>}
                  {result.type === 'coordinate' && <span><MdLocationPin /></span>}
                </div>
                <div className="flex flex-col">
                  <span className={`font-semibold ${styles.resultText}`}>{result.name}</span>
                  <span className={`text-sm ${styles.resultDetailText}`}>
                    {result.type !== 'coordinate' ? `Floor ${result.floor} • ` : ''}
                    {`(${result.location.x}, ${result.location.y})`}
                  </span>
                </div>
                {result.floor !== currentFloor && (
                  <span className={`text-xs ${styles.highlightBadge} px-1 py-0.5 rounded ml-auto`}>
                    Floor {result.floor}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
