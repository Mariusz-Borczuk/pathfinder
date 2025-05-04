import {
  getEndLocationStyles,
  getFontSizeClass,
} from "@/components/types/settings";
import {
  FaMapMarkerAlt,
  MdLocationPin,
  SiGoogleclassroom,
} from "@/utils/icons";
import React, { useEffect, useState } from "react";
import {
  AccessibilityFontSizeProps,
  allFloorData,
  Coordinate,
  coordRegex,
  LocationSearchFieldProps,
  LocationSearchResult,
} from "../../../types/types";

/**
 * End Location Search Field - Updated to support finding paths between different room types.
 */
export const EndLocationSearchField: React.FC<LocationSearchFieldProps> = ({
  onSearch,
  currentFloor,
  setCurrentFloor,
  settings,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<LocationSearchResult[]>(
    []
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedDisplayLocation, setSelectedDisplayLocation] =
    useState<LocationSearchResult | null>(null);

  // Function to parse coordinates from search query
  const parseCoordinates = (query: string): Coordinate | null => {
    const match = query.match(coordRegex);
    if (match) {
      const x = parseInt(match[1] || match[3] || "0");
      const y = parseInt(match[2] || match[4] || "0");
      if (!isNaN(x) && !isNaN(y)) {
        return { x, y };
      }
    }
    return null;
  };

  // Effect to perform search based on query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setIsDropdownOpen(false);
      return;
    }

    const results: LocationSearchResult[] = [];
    const lowerQuery = searchQuery.toLowerCase();
    const coordinates = parseCoordinates(searchQuery);

    // Add coordinate result if valid
    if (coordinates) {
      results.push({
        type: "coordinate",
        name: `Destination at (${coordinates.x}, ${coordinates.y})`,
        floor: currentFloor,
        location: coordinates,
        description: `Coordinates (${coordinates.x}, ${coordinates.y}) on current floor`,
      });
    }

    // Search through floor data for matching locations
    allFloorData.forEach((floorData, floorIndex) => {
      const floorNumber = floorIndex + 1;

      // Search classrooms
      floorData.classrooms.forEach((room) => {
        if (room.number.toLowerCase().includes(lowerQuery)) {
          let entryCoord = Array.isArray(room.entry)
            ? room.entry[0]
            : room.entry;
          if (!entryCoord) {
            // Fallback to center if no entry
            entryCoord = {
              x: Math.floor((room.start.x + room.end.x) / 2),
              y: Math.floor((room.start.y + room.end.y) / 2),
            };
          }
          results.push({
            type: "classroom",
            name: `Classroom ${room.number}`,
            floor: floorNumber,
            location: entryCoord as Coordinate,
            description: `Classroom ${room.number} on floor ${floorNumber}`,
          });
        }
      });

      // Search bathrooms
      floorData.bathrooms.forEach((bathroom) => {
        if (bathroom.type.toLowerCase().includes(lowerQuery)) {
          const entryCoord = bathroom.entry || {
            x: Math.floor((bathroom.start.x + bathroom.end.x) / 2),
            y: Math.floor((bathroom.start.y + bathroom.end.y) / 2),
          };

          results.push({
            type: "bathroom",
            name: `${bathroom.type} Bathroom`,
            floor: floorNumber,
            location: entryCoord,
            description: `${bathroom.type} Bathroom on floor ${floorNumber}`,
          });
        }
      });

      // Search elevators
      floorData.elevators.forEach((elevator, index) => {
        if ("elevator".includes(lowerQuery)) {
          const entryCoord = elevator.entry || {
            x: Math.floor((elevator.start.x + elevator.end.x) / 2),
            y: Math.floor((elevator.start.y + elevator.end.y) / 2),
          };

          results.push({
            type: "elevator",
            name: `Elevator ${index + 1}`,
            floor: floorNumber,
            location: entryCoord,
            description: `Elevator ${index + 1} on floor ${floorNumber}`,
          });
        }
      });

      // Search stairs
      floorData.stairs.forEach((stair, index) => {
        if ("stair".includes(lowerQuery) || "stairs".includes(lowerQuery)) {
          const centerCoord = {
            x: Math.floor((stair.start.x + stair.end.x) / 2),
            y: Math.floor((stair.start.y + stair.end.y) / 2),
          };

          results.push({
            type: "stairs",
            name: `Stairs ${index + 1}`,
            floor: floorNumber,
            location: centerCoord,
            description: `Stairs ${index + 1} on floor ${floorNumber}`,
          });
        }
      });

      // Search utility rooms
      floorData.utilityRooms.forEach((room) => {
        if (room.name.toLowerCase().includes(lowerQuery)) {
          const centerCoord = {
            x: Math.floor((room.start.x + room.end.x) / 2),
            y: Math.floor((room.start.y + room.end.y) / 2),
          };

          results.push({
            type: "utilityRoom",
            name: room.name,
            floor: floorNumber,
            location: centerCoord,
            description: `${room.name} on floor ${floorNumber}`,
          });
        }
      });
    });

    setSearchResults(results);
    setIsDropdownOpen(results.length > 0);
  }, [searchQuery, currentFloor]);

  // Handle selection from dropdown
  const handleResultClick = (result: LocationSearchResult) => {
    console.log("End Location Selected:", result);
    if (result.floor !== currentFloor && setCurrentFloor) {
      setCurrentFloor(result.floor);
    }
    setSelectedDisplayLocation(result); // Update internal state for display
    onSearch(result); // Pass the full result object up
    setSearchQuery("");
    setIsDropdownOpen(false);
  };

  // --- UI Rendering ---
  const styles = getEndLocationStyles(settings);
  const fontSizeClass = getFontSizeClass(
    settings as AccessibilityFontSizeProps
  );

  const getLocationIcon = (type?: string) => {
    switch (type) {
      case "classroom":
        return <SiGoogleclassroom className="text-red-600" />;
      case "coordinate":
        return <MdLocationPin className="text-red-600" />;
      // Add other icons
      default:
        return <MdLocationPin className="text-red-600" />;
    }
  };

  return (
    <div className="relative w-full">
      {/* Label and Input */}
      <div className="relative">
        <label
          htmlFor="end-location-search"
          className={`block text-sm font-medium ${styles.labelText} ${fontSizeClass}`}
        >
          Set Destination
          {selectedDisplayLocation && (
            <span className="ml-2 text-red-600 font-bold">✓ Selected</span>
          )}
        </label>
        <div className="flex items-center">
          <input
            id="end-location-search"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              selectedDisplayLocation
                ? "Change destination..."
                : "Search destination..."
            }
            className={`w-full px-3 pr-10 py-2 ${styles.inputBg} ${styles.inputText} ${styles.inputBorder} rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 shadow-sm ${fontSizeClass}`}
            onFocus={() => searchResults.length > 0 && setIsDropdownOpen(true)}
            onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
            aria-label="Search for a destination location"
          />
          <div className="absolute inset-y-0 right-0 flex items-center top-5">
            <button
              className={`${styles.buttonBg} ${styles.buttonText} h-full px-2 rounded-r-lg shadow-sm hover:scale-105 transition-opacity focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-red-500 flex items-center justify-center border-l ${styles.inputBorder}`}
              onClick={() => {
                if (searchResults.length > 0 && searchResults[0]) {
                  handleResultClick(searchResults[0]);
                } else {
                  // Handle case where user types coordinates and clicks button
                  const coords = parseCoordinates(searchQuery);
                  if (coords) {
                    const coordResult: LocationSearchResult = {
                      type: "coordinate",
                      name: `Destination at (${coords.x}, ${coords.y})`,
                      floor: currentFloor,
                      location: coords,
                      description: `Coordinates (${coords.x}, ${coords.y}) on current floor`,
                    };
                    handleResultClick(coordResult);
                  } else {
                    onSearch(null); // Clear selection if invalid input
                    setSelectedDisplayLocation(null);
                  }
                }
              }}
              aria-label="Set destination"
            >
              <FaMapMarkerAlt className={`h-4 w-4 ${styles.iconColor}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Selected Location Display */}
      {selectedDisplayLocation && (
        <div
          className={`mt-1 p-2 ${styles.inputBg} border-2 border-red-500 rounded-lg flex items-center`}
        >
          {/* Updated icon wrapper with red styling */}
          <div className="mr-2 text-lg flex items-center justify-center w-6 h-6 rounded-md ring-2 ring-red-500 bg-red-100/30 text-bold">
            {getLocationIcon(selectedDisplayLocation.type)}
          </div>
          <div className="flex flex-col flex-1">
            <span className={`font-semibold ${styles.resultText}`}>
              {selectedDisplayLocation.name.replace("Destination at ", "")}
            </span>
            <span className={`text-xs ${styles.resultDetailText}`}>
              {selectedDisplayLocation.type !== "coordinate"
                ? `Floor ${selectedDisplayLocation.floor} • `
                : ""}
              {`(${selectedDisplayLocation.location.x}, ${selectedDisplayLocation.location.y})`}
            </span>
          </div>
          {selectedDisplayLocation.floor !== currentFloor && (
            <span
              className={`text-xs ${styles.highlightBadge} px-2 py-1 rounded mx-1`}
            >
              Floor {selectedDisplayLocation.floor}
            </span>
          )}
        </div>
      )}

      {/* Search Results Dropdown */}
      {isDropdownOpen && searchResults.length > 0 && (
        <div
          className={`absolute z-180 mt-1 w-full ${styles.dropdownBg} ${styles.dropdownBorder} border-2 border-red-500 rounded-lg p-1 shadow-lg max-h-60 overflow-auto`}
        >
          {searchResults.map((result, index) => (
            <div
              key={`${result.type}-${result.floor}-${result.location.x}-${result.location.y}-${index}`}
              className={`px-4 py-2 cursor-pointer ${styles.dropdownItemHover} flex items-center ${fontSizeClass}`}
              onClick={() => handleResultClick(result)}
            >
              <div className="mr-1 pr-2 text-lg">
                {getLocationIcon(result.type)}
              </div>
              <div className="flex flex-col">
                <span className={`font-semibold ${styles.resultText}`}>
                  {result.name}
                </span>
                <span className={`text-sm ${styles.resultDetailText}`}>
                  {result.type !== "coordinate"
                    ? `Floor ${result.floor} • `
                    : ""}
                  {`(${result.location.x}, ${result.location.y})`}
                </span>
              </div>
              {result.floor !== currentFloor && (
                <span
                  className={`text-xs ${styles.highlightBadge} px-1 py-0.5 rounded ml-auto`}
                >
                  Floor {result.floor}
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
