import {
  AddCustomNavigationButtonProps,
  LocationSearchResult,
  NavigationItem,
} from "@/components/types/types";
import { MdHome, MdLocationOn, MdSportsTennis } from "@/utils/icons";
import React, { useState } from "react";

/**
 * A component that provides a UI for adding custom navigation points.
 *
 * This component allows users to:
 * - Toggle an accordion panel to show/hide the form
 * - Enter a name for the navigation point
 * - Set X and Y coordinates
 * - Select an icon from predefined options
 * - Choose a color for the location marker
 * - Submit the new custom navigation point
 *
 * The component is fully accessible with proper ARIA attributes and keyboard navigation.
 *
 * @component
 * @param {Object} props - Component properties
 * @param {Function} props.onAdd - Callback function that receives the new navigation point data when added
 * @param {Function} props.onSelectLocation - Optional callback to select a location for navigation
 * @param {number} props.currentFloor - The current floor number
 * @returns {JSX.Element} A form interface for adding custom navigation points
 */
const AddCustomNavigationButton: React.FC<
  AddCustomNavigationButtonProps & {
    onSelectLocation?: (location: LocationSearchResult) => void;
    currentFloor: number;
  }
> = ({ onAdd, onSelectLocation, currentFloor }) => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [name, setName] = useState("");
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  const [selectedIcon, setSelectedIcon] = useState<React.ReactNode>(
    <MdSportsTennis />
  );
  const [markerColor, setMarkerColor] = useState("#4CAF50"); // Default green color

  const icons = [
    { label: "Tennis", icon: <MdSportsTennis /> },
    { label: "Location", icon: <MdLocationOn /> },
    { label: "Home", icon: <MdHome /> },
  ];

  const colorOptions = [
    { name: "Green", value: "#4CAF50" },
    { name: "Blue", value: "#2196F3" },
    { name: "Red", value: "#F44336" },
    { name: "Purple", value: "#9C27B0" },
    { name: "Orange", value: "#FF9800" },
  ];

  const handleAddCustomNavigation = () => {
    if (!name.trim()) return;

    const newItem: NavigationItem = {
      name,
      coordinates,
      icon: selectedIcon,
      color: markerColor,
    };

    onAdd(newItem);

    // Also select this location if onSelectLocation is provided
    if (onSelectLocation) {
      const locationResult: LocationSearchResult = {
        type: "coordinate",
        name: name,
        floor: currentFloor,
        location: { x: coordinates.x, y: coordinates.y },
        description: `Custom location: ${name}`,
        color: markerColor,
      };
      onSelectLocation(locationResult);
    }

    // Reset form
    setName("");
    setCoordinates({ x: 0, y: 0 });
    setSelectedIcon(<MdSportsTennis />);
  };

  return (
    <div className="mt-6 w-full">
      <div>
        <button
          onClick={() => setIsAccordionOpen(!isAccordionOpen)}
          className="p-3 bg-blue-600 text-white w-full rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none transition duration-200 font-medium"
          aria-expanded={isAccordionOpen}
          aria-controls="custom-navigation-panel"
        >
          {isAccordionOpen ? "Close Settings" : "Add Custom Navigation"}
        </button>
      </div>
      {isAccordionOpen && (
        <div
          id="custom-navigation-panel"
          className="mt-4 w-full p-6 border border-gray-300 rounded-lg bg-white dark:bg-gray-800 shadow-md"
          role="region"
          aria-label="Custom navigation settings"
        >
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Custom Navigation Settings
          </h2>
          <div className="mb-4">
            <label
              htmlFor="nav-name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Name:
            </label>
            <input
              id="nav-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              required
              aria-required="true"
              placeholder="Name for the navigation point"
              aria-label="Navigation point name"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              htmlFor="coord-x"
              aria-label="Coordinates X and Y"
            >
              Coordinates:
            </label>
            <div className="flex gap-4 mb-4">
              <div className="w-1/2">
                <label
                  htmlFor="coord-x"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  X Coordinate
                </label>
                <input
                  id="coord-x"
                  type="number"
                  placeholder="X"
                  value={coordinates.x}
                  onChange={(e) =>
                    setCoordinates({
                      ...coordinates,
                      x: parseFloat(e.target.value) || 0,
                    })
                  }
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  aria-label="X coordinate"
                  aria-required="true"
                />
              </div>
              <div className="w-1/2">
                <label
                  htmlFor="coord-y"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Y Coordinate
                </label>
                <input
                  id="coord-y"
                  type="number"
                  placeholder="Y"
                  value={coordinates.y}
                  onChange={(e) =>
                    setCoordinates({
                      ...coordinates,
                      y: parseFloat(e.target.value) || 0,
                    })
                  }
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  aria-label="Y coordinate"
                  aria-required="true"
                />
              </div>
            </div>
          </div>
          <div className="mb-4">
            <label
              id="icon-group-label"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              htmlFor="icon-selection"
              aria-label="Select an icon"
            >
              Select an icon:
            </label>
            <div
              className="flex gap-4 flex-wrap"
              role="radiogroup"
              aria-labelledby="icon-group-label"
              aria-describedby="icon-selection"
              aria-label="Icon selection"
              aria-required="true"
            >
              {icons.map((iconOption, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedIcon(iconOption.icon)}
                  className={`p-3 border rounded-lg flex items-center justify-center transition duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                    selectedIcon === iconOption.icon
                      ? "bg-red-700 text-white border-red-700 scale-110 transform ring-red-500"
                      : "bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                  }`}
                  aria-label={`Select ${iconOption.label} icon`}
                  aria-pressed={selectedIcon === iconOption.icon}
                  role="radio"
                  tabIndex={selectedIcon === iconOption.icon ? 0 : -1}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setSelectedIcon(iconOption.icon);
                    }
                  }}
                  title={`Select ${iconOption.label} icon`}
                >
                  <span className="text-2xl">{iconOption.icon}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label
              id="color-group-label"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Marker Color:
            </label>
            <div className="flex gap-2 flex-wrap">
              {colorOptions.map((color) => (
                <button
                  key={color.value}
                  onClick={() => setMarkerColor(color.value)}
                  className={`w-8 h-8 rounded-full border-2 transition-transform focus:outline-none focus:ring-2 ${
                    markerColor === color.value
                      ? "border-white scale-125"
                      : "border-transparent"
                  }`}
                  style={{ backgroundColor: color.value }}
                  aria-label={`Select ${color.name} color`}
                  aria-pressed={markerColor === color.value}
                  title={color.name}
                ></button>
              ))}
            </div>
            <div className="mt-2 flex items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">
                Custom color:
              </span>
              <input
                type="color"
                value={markerColor}
                onChange={(e) => setMarkerColor(e.target.value)}
                className="w-8 h-8 rounded-full border-0 cursor-pointer"
                aria-label="Select custom marker color"
              />
            </div>
            <div className="mt-3 flex items-center justify-center">
              <div className="flex flex-col items-center">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center shadow-lg"
                  style={{ backgroundColor: markerColor }}
                >
                  <span className="text-white text-xs font-bold">●</span>
                </div>
                <span className="text-xs mt-1 text-gray-600 dark:text-gray-400">
                  Preview
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={handleAddCustomNavigation}
            className={`w-full mt-4 p-3 rounded-lg transition duration-200 font-medium ${
              !name.trim()
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
            }`}
            disabled={!name.trim()}
            aria-disabled={!name.trim()}
            aria-label="Add custom navigation point"
          >
            Add Custom Navigation
          </button>
        </div>
      )}
    </div>
  );
};

export default AddCustomNavigationButton;
