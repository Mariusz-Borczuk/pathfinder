import React from "react";
import { RightSidebarProps, Route } from "../../types/types";
import { AccessibleTTSButton } from "./Speaking";
import { getSettings } from "@/components/types/settings";

/**
 * Right sidebar component that displays details about the current location and accessibility features
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.settings - User interface settings for accessibility
 * @param {string} props.settings.contrast - Contrast setting (e.g., "high", "normal")
 * @param {number} props.currentFloor - The current floor number being displayed
 * @param {boolean} props.isWheelchair - Whether wheelchair mode is enabled
 * @param {string} props.estimatedTime - The estimated time for the route
 * @param {string} props.distance - The distance for the route
 * @param {Array} props.pathSegments - Path segments for the calculated route
 * 
 * @returns {React.ReactElement} A sidebar component with location information, accessibility features,
 * and audio navigation options
 */
export const RightSidebar: React.FC<RightSidebarProps> = ({
  settings,
  currentFloor,
  isWheelchair = false,
  estimatedTime,
  distance,
  pathSegments = []
}) => {
  
// Calculate estimated time and distance if not provided but we have path segments
const calculatedTime = estimatedTime || (pathSegments.length > 0 ? `${Math.floor(pathSegments.length * 0.5)} minutes` : "5 minutes");
const calculatedDistance = distance || (pathSegments.length > 0 ? `${pathSegments.length * 10} meters` : "150 meters");

// Route object with dynamic information
const route: Route = {
    destination: `Building A, Floor ${currentFloor}`,
    estimatedTime: calculatedTime,
    accessibilityNotes: isWheelchair 
        ? "Wheelchair accessible route" 
        : "Standard route",
    navigationInstructions: `Follow the highlighted path to Floor ${currentFloor}.`,
    distance: calculatedDistance
};

  return (
    <div
      className={`w-72 ${
        settings.contrast === "high" ? "bg-gray-800" : "bg-gray-800"
      } shadow-lg p-4`}
      role="region"
      aria-label="Location Information"
    >
      <h2 className={`text-xl font-semibold mb-4 ${getSettings(settings)}`}>
        Location Details
      </h2>
      
      <div className="space-y-4">
        {/* Current Location Section */}
        <div
          className={`p-3 ${
            settings.contrast === "high" ? "bg-gray-700" : "bg-gray-700"
          } rounded-lg`}
          role="group"
          aria-label="Current Location Details"
        >
          <h3 className={`font-medium ${getSettings(settings)}`}>
            Current Location
          </h3>
          <p className={`${getSettings(settings)}`}>
            Building A, Floor {currentFloor}
          </p>
          <p className={`mt-1 ${getSettings(settings)} text-xs opacity-70`}>
            {isWheelchair ? "Wheelchair accessible path" : "Standard path"}
          </p>
          {pathSegments.length > 0 && (
            <>
              <p className={`mt-2 ${getSettings(settings)}`}>
                <span className="font-medium">Distance:</span> {route.distance}
              </p>
              <p className={`${getSettings(settings)}`}>
                <span className="font-medium">Est. Time:</span> {route.estimatedTime}
                {isWheelchair && (
                  <span className="block text-xs opacity-70 mt-1">
                    (Includes wheelchair pace adjustment)
                  </span>
                )}
              </p>
              <p className={`mt-1 ${getSettings(settings)} text-xs`}>
                Based on {pathSegments.length} tile{pathSegments.length !== 1 ? 's' : ''} at 20 seconds per tile 
                {isWheelchair ? ' with wheelchair factor of 1.5x' : ''}
                <span className="block">(Each tile = 1 meter)</span>
              </p>
            </>
          )}
        </div>
        {/* Accessibility Features Section */}
        <div
          className={`p-3 ${
            settings.contrast === "high" ? "bg-gray-700" : "bg-gray-700"
          } rounded-lg`}
          role="group"
          aria-label="Accessibility Features"
        >
          <h3 className={`font-medium ${getSettings(settings)}`}>
            Accessibility Features
          </h3>
          <ul
            className={`${getSettings(settings)} list-disc ml-4`}
            role="list"
          >
            <li role="listitem">Wheelchair {isWheelchair ? 'optimized route' : 'accessible'}</li>
            <li role="listitem">Automatic doors</li>
            <li role="listitem">Accessible restroom nearby</li>
          </ul>
        </div>

        {/* Audio Navigation Section */}
        <div
          className={`p-3 ${
            settings.contrast === "high" ? "bg-gray-700" : "bg-gray-700"
          } rounded-lg`}
          role="group"
          aria-label="Audio Navigation"
        >
          <h3 className={`font-medium ${getSettings(settings)}`}>
            Audio Navigation
          </h3>
          <div className="mt-2">
            <AccessibleTTSButton 
              route={route}
              settings={settings}
              className={`w-full ${getSettings(settings)}`}
            />
          </div>
        </div>
      </div>
    </div>  
  );
};