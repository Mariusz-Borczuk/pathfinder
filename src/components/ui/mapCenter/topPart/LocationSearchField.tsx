import React, { useEffect, useMemo, useState } from 'react';
import { floor1Data } from '../../../types/floor1.data';
import { floor2Data } from '../../../types/floor2.data';
import { floor3Data } from '../../../types/floor3.data';
import { floor4Data } from '../../../types/floor4.data';
import { Coordinate, LocationSearchFieldProps, LocationSearchResult } from '../../../types/types';

/**
 * A search input component that allows users to search for locations by name 
 * (classrooms, bathrooms, etc.) or by coordinates.
 */
const LocationSearchField: React.FC<LocationSearchFieldProps> = ({
  onSearch,
  currentFloor,
  setCurrentFloor,
  settings
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<LocationSearchResult[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Combine all floor data
  const allFloorData = useMemo(() => [floor1Data, floor2Data, floor3Data, floor4Data], []);

  // Parse the search query to check if it's a coordinate
  const parseCoordinates = (query: string): Coordinate | null => {
    // Format examples: "x:10 y:20", "10,20", "(10,20)"
    const coordRegex = /(?:x\s*:\s*(\d+)\s*y\s*:\s*(\d+))|(?:\(?(\d+)\s*,\s*(\d+)\)?)/i;
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
        name: `Coordinates (${coordinates.x}, ${coordinates.y})`,
        floor: currentFloor,
        location: coordinates,
        description: `Location at coordinates (${coordinates.x}, ${coordinates.y})`
      });
    }
    
    // Search for classrooms, bathrooms, etc.
    allFloorData.forEach((floorData, floorIndex) => {
      const floorNumber = floorIndex + 1;
      
      // Search classrooms
      floorData.classrooms.forEach(room => {
        if (room.number.toLowerCase().includes(lowerQuery)) {
          const defaultLocation = { x: Math.floor((room.start.x + room.end.x) / 2), y: Math.floor((room.start.y + room.end.y) / 2) };
          const entryCoord = Array.isArray(room.entry) 
            ? room.entry[0] 
            : (room.entry || defaultLocation);
            
          results.push({
            type: 'classroom',
            name: `Classroom ${room.number}`,
            floor: floorNumber,
            location: entryCoord,
            description: `Classroom ${room.number} on floor ${floorNumber}`
          });
        }
      });
      
      // Search bathrooms
      floorData.bathrooms.forEach(bathroom => {
        if (bathroom.type.toLowerCase().includes(lowerQuery) || 'bathroom'.includes(lowerQuery)) {
          results.push({
            type: 'bathroom',
            name: `${bathroom.type} Bathroom`,
            floor: floorNumber,
            location: bathroom.entry,
            description: `${bathroom.type} Bathroom on floor ${floorNumber}`
          });
        }
      });
      
      // Search elevators
      if ('elevator'.includes(lowerQuery)) {
        floorData.elevators.forEach((elevator, index) => {
          results.push({
            type: 'elevator',
            name: `Elevator ${index + 1}`,
            floor: floorNumber,
            location: elevator.entry,
            description: `Elevator ${index + 1} on floor ${floorNumber}`
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
            name: `Staircase ${index + 1}`,
            floor: floorNumber,
            location: { x: centerX, y: centerY },
            description: `Staircase ${index + 1} on floor ${floorNumber}`
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
            name: room.name,
            floor: floorNumber,
            location: { x: centerX, y: centerY },
            description: `${room.name} on floor ${floorNumber}`
          });
        }
      });
      
      // Search fire equipment
      if ('fire'.includes(lowerQuery) || 'extinguisher'.includes(lowerQuery)) {
        floorData.fireEquipment.forEach((equipment, index) => {
          results.push({
            type: 'fireEquipment',
            name: `Fire Equipment ${index + 1}`,
            floor: floorNumber,
            location: equipment.location,
            description: `Fire Equipment ${index + 1} on floor ${floorNumber}`
          });
        });
      }
    });
    
    setSearchResults(results);
    setIsDropdownOpen(results.length > 0);
  }, [searchQuery, allFloorData, currentFloor]);

  // Handle search result selection
  const handleResultClick = (result: LocationSearchResult) => {
    if (result.floor !== currentFloor && setCurrentFloor) {
      setCurrentFloor(result.floor);
    }
    
    onSearch(result);
    setSearchQuery('');
    setIsDropdownOpen(false);
  };

  // Get high contrast styles based on settings
  const getHighContrastStyles = () => {
    if (settings?.contrast === "high") {
      return {
        inputBg: 'bg-white',
        inputText: 'text-black font-bold',
        inputBorder: 'border-2 border-black',
        buttonBg: 'bg-black',
        buttonText: 'text-white',
        dropdownBg: 'bg-white',
        dropdownBorder: 'border-2 border-black',
        dropdownItemHover: 'hover:bg-yellow-300 hover:text-black',
        resultText: 'text-black',
        resultDetailText: 'text-black',
        highlightBadge: 'bg-black text-white'
      };
    }
    return {
      inputBg: 'bg-white',
      inputText: 'text-gray-800',
      inputBorder: 'border border-gray-300',
      buttonBg: 'bg-blue-600',
      buttonText: 'text-white',
      dropdownBg: 'bg-white',
      dropdownBorder: 'border border-gray-300',
      dropdownItemHover: 'hover:bg-gray-100',
      resultText: 'text-gray-800',
      resultDetailText: 'text-gray-500',
      highlightBadge: 'bg-blue-100 text-blue-800'
    };
  };

  const styles = getHighContrastStyles();
  const fontSizeClass = settings ? 
    (settings.fontSize === "large" ? "text-lg" : settings.fontSize === "xlarge" ? "text-xl" : "text-base") : 
    "text-base";

  return (
    <div className="relative w-full">
      <div className="relative">
        <label htmlFor="location-search" className={`block text-lg font-medium mb-1 ${settings?.contrast === "high" ? "text-black" : "text-gray-700"}`}>
          Find Location
        </label>
        <input
          id="location-search"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search rooms, bathrooms, or coordinates (e.g., 10,20)"
          className={`w-full px-4 py-3 ${styles.inputBg} ${styles.inputText} ${styles.inputBorder} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md ${fontSizeClass}`}
          onFocus={() => searchResults.length > 0 && setIsDropdownOpen(true)}
          onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
        />
        <button 
          className={`absolute right-3 top-1/2 transform -translate-y-1/4 ${styles.buttonBg} ${styles.buttonText} p-3 rounded-full shadow-lg hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
          onClick={() => {
            if (searchResults.length > 0) {
              handleResultClick(searchResults[0]);
            }
          }}
          aria-label="Search"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>
      
      {isDropdownOpen && searchResults.length > 0 && (
        <div className={`absolute z-10 mt-1 w-full ${styles.dropdownBg} ${styles.dropdownBorder} rounded-lg shadow-lg max-h-60 overflow-y-auto`}>
          {searchResults.map((result, index) => (
            <div
              key={`${result.type}-${result.name}-${index}`}
              className={`px-4 py-3 cursor-pointer ${styles.dropdownItemHover} flex items-center ${fontSizeClass}`}
              onClick={() => handleResultClick(result)}
            >
              <div className="mr-3 text-xl">
                {result.type === 'classroom' && <span>🏫</span>}
                {result.type === 'bathroom' && <span>🚻</span>}
                {result.type === 'elevator' && <span>🔼</span>}
                {result.type === 'stairs' && <span>🪜</span>}
                {result.type === 'fireEquipment' && <span>🧯</span>}
                {result.type === 'utilityRoom' && <span>🔧</span>}
                {result.type === 'coordinate' && <span>📍</span>}
              </div>
              <div className="flex flex-col">
                <span className={`font-semibold ${styles.resultText}`}>{result.name}</span>
                <span className={`text-sm ${styles.resultDetailText}`}>
                  {result.type !== 'coordinate' ? `Floor ${result.floor} • ` : ''}
                  {`(${result.location.x}, ${result.location.y})`}
                </span>
              </div>
              {result.floor !== currentFloor && (
                <span className={`ml-auto text-sm ${styles.highlightBadge} px-2 py-1 rounded`}>
                  On Floor {result.floor}
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LocationSearchField;