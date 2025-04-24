import { PathSegment } from "@/PathFinder";
import { FaWheelchair, FiType, IoMdEye, } from "@/utils/icons";
import React, { useState } from "react";
import AccessibilityButton from "../../Accessibility_Button";
import { AccessibilitySettings, Coordinate, LayoutProps, LocationSearchResult } from "../../types/types";
import FloorManagement from "../leftMenu/Floor_Management";
import { MainHeader } from "../leftMenu/Main_Header";
import { QuickNavigation } from "../leftMenu/Quick_Navigation";
import { MapView } from "../mapCenter/Map_View";
import { GridToggleButton } from "../mapCenter/topPart/GridToggleButton";
import { PathFinder } from "../mapCenter/topPart/PathFinder";
import { RightSidebar } from "../rightMenu/Right_Sidebar";
import { getSettings } from "../settings";

/**
 * WayfindingApp3 component represents the main layout for the wayfinding application.
 * It manages the state for accessibility settings, current floor, grid visibility, highlighted locations, and pathfinding.
 * 
 * The layout consists of:
 * - Left sidebar with accessibility settings, search functionality, quick navigation and floor management
 * - Main content area with map view, pathfinding controls, and location search
 * - Right sidebar with additional information
 * 
 * @component
 * @param {LayoutProps} props - Component props
 * @param {React.ReactNode} props.children - Child components to be rendered within the layout
 * 
 * @example
 * ```tsx
 * <WayfindingApp3>
 *   <AdditionalContent />
 * </WayfindingApp3>
 * ```
 */
const WayfindingApp3: React.FC<LayoutProps> = ({ children }) => {
  const [settings, setSettings] = useState<AccessibilitySettings>({
    fontSize: "normal",
    contrast: "normal",
  });
  const [isWheelchair, setIsWheelchair] = useState<boolean>(false);
  const [currentFloor, setCurrentFloor] = useState(1);
  const [showGrid, setShowGrid] = useState(false);
  const [pathSegments, setPathSegments] = useState<PathSegment[]>([]);
  const [pathStartLocation, setPathStartLocation] = useState<LocationSearchResult | null>(null);
  const [pathEndLocation, setPathEndLocation] = useState<LocationSearchResult | null>(null);



  // Updated handler to receive path segments and coordinates
  const handlePathFound = (path: PathSegment[], startCoord: Coordinate, endCoord: Coordinate) => {
    setPathSegments(path);
    
    // Create minimal LocationSearchResult objects for the start and end coordinates
    // These will be used to highlight the start and end points on the map
    if (path.length > 0) {
      setPathStartLocation({
        type: 'path',
        name: 'Path Start',
        floor: path[0]?.floor ?? currentFloor,
        location: startCoord,
        description: 'Starting point of the path'
      });
      
      setPathEndLocation({
        type: 'path',
        name: 'Path End', 
        floor: path[0]?.floor ?? currentFloor,
        location: endCoord,
        description: 'Destination point of the path'
      });
    } else {
      // Clear path points if no path is found
      setPathStartLocation(null);
      setPathEndLocation(null);
    }
  };

  return (
    <div
      className="flex h-full w-full bg-gray-900"
      role="application"
    >
      {/* Left Sidebar */}
      <aside
        className={`w-80 bg-gray-800 shadow-lg p-4 flex flex-col ${getSettings(settings)}`}
        role="complementary"
      >
        <MainHeader settings={settings} />

        <div
          className={`mb-6 bg-gray-700 p-4 rounded-lg ${getSettings(settings)}`}
          aria-label="Accessibility settings"
        >
          <h2 className="font-semibold mb-3 text-gray-200">
            Visibility Settings
          </h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-gray-300">Text Size</label>
              <div className="flex gap-2">
                {(["normal", "large", "xlarge"] as const).map((size) => (
                  <AccessibilityButton
                    key={size}
                    label={`Set text size to ${size}`}
                    isActive={settings.fontSize === size}
                    onClick={() => setSettings({ ...settings, fontSize: size })}
                    icon={
                      <FiType
                        className={`text-gray-200 ${
                          settings.contrast === "high"
                            ? " text-zinc-950"
                            : "text-gray-100"
                        }`}
                      />
                    }
                    description={`Change text size to ${size}`}
                  />
                ))}
              </div>
            </div>

            <div className="h-px bg-gray-600 my-3" />

            <div className="flex items-center justify-between">
              <label className="text-gray-300">Wheelchair mode</label>
              <AccessibilityButton
                label="Toggle wheelchair accessibility"
                isActive={isWheelchair}
                onClick={() =>
                  setIsWheelchair(!isWheelchair)
                }
                icon={<FaWheelchair className="text-gray-200 w-6 h-6" />}
                description="Toggle wheelchair accessibility"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="text-gray-300">High Contrast</label>
              <AccessibilityButton
                label="Toggle high contrast"
                isActive={settings.contrast === "high"}
                onClick={() =>
                  setSettings({
                    ...settings,
                    contrast: settings.contrast === "high" ? "normal" : "high",
                  })
                }
                icon={<IoMdEye className="text-gray-200" />}
                description="Toggle high contrast mode"
              />
            </div>
          </div>
        </div>

        <QuickNavigation settings={settings} currentFloor={currentFloor} />
        <FloorManagement 
          currentFloor={currentFloor} 
          onFloorChange={setCurrentFloor} 
        />
      </aside>

      <div className="flex-1 p-4 flex flex-col justify-center">
        {/* Top control bar with centered PathFinder */}
        <div className="flex items-center justify-center space-x-3 py-4 px-3 mb-4 bg-gray-800 rounded-lg w-full shadow-md">
          <GridToggleButton showGrid={showGrid} onToggle={() => setShowGrid(!showGrid)} settings={{ contrast: settings.contrast, fontSize: settings.fontSize }} />
          
          <PathFinder 
            currentFloor={currentFloor}
            setCurrentFloor={setCurrentFloor}
            settings={settings}
            onPathFound={handlePathFound}
          />
        </div>
        
        {/* Map View with centered content */}
        <div className="flex-1 overflow-hidden flex items-center justify-center">
          <MapView  
            settings={settings}   
            currentFloor={currentFloor}
            showGrid={showGrid}
            endLocation={pathEndLocation}
            startLocation={pathStartLocation}
            pathSegments={pathSegments}
          />
        </div>
      </div>
      <RightSidebar 
        settings={settings}
        currentFloor={currentFloor}
      />
      {children}
    </div>
  );
};

export default WayfindingApp3;
