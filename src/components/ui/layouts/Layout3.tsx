import React, { useState } from "react";
import AccessibilityButton from "../../Accessibility_Button";
import { AccessibilitySettings, LayoutProps, LocationSearchResult } from "../../types/types";
import FloorManagement from "../leftMenu/Floor_Management";
import { MainHeader } from "../leftMenu/Main_Header";
import { QuickNavigation } from "../leftMenu/Quick_Navigation";
import { SearchBar } from "../leftMenu/SearchBar";
import { MapView } from "../mapCenter/Map_View";
import { GridToggleButton } from "../mapCenter/topPart/GridToggleButton";
import { PathFinder } from "../mapCenter/topPart/PathFinder";
import { RightSidebar } from "../rightMenu/Right_Sidebar";
import { getSettings } from "../settings";
import { Type, Eye } from "lucide-react";
import { PathSegment } from "@/PathFinder";

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
    isDyslexicFont: false,
  });
  const [currentFloor, setCurrentFloor] = useState(1);
  const [showGrid, setShowGrid] = useState(false);
  const [highlightedLocation, setHighlightedLocation] = useState<LocationSearchResult | null>(null);
  const [pathSegments, setPathSegments] = useState<PathSegment[]>([]);

  const handleSearch = (result: LocationSearchResult) => {
    setHighlightedLocation(result);
    if (result.floor !== currentFloor) {
      setCurrentFloor(result.floor);
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
                      <Type
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
              <label className="text-gray-300">Dyslexic Font</label>
              <AccessibilityButton
                label="Toggle dyslexic font"
                isActive={settings.isDyslexicFont}
                onClick={() =>
                  setSettings({
                    ...settings,
                    isDyslexicFont: !settings.isDyslexicFont,
                  })
                }
                icon={<Type className="text-gray-200" />}
                description="Toggle dyslexia-friendly font"
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
                icon={<Eye className="text-gray-200" />}
                description="Toggle high contrast mode"
              />
            </div>
          </div>
        </div>

        <SearchBar settings={settings} currentFloor={currentFloor} onSearch={handleSearch} />

        <QuickNavigation settings={settings} currentFloor={currentFloor} />
        <FloorManagement 
          currentFloor={currentFloor} 
          onFloorChange={setCurrentFloor} 
        />
      </aside>

      <div className="flex-1 p-4 flex flex-col">
        {/* Top control bar - Now includes PathFinder which contains its own button and search fields */}
        <div className="flex items-start space-x-3 py-2 px-3 mb-4 bg-gray-800 rounded-lg w-full">
          <GridToggleButton showGrid={showGrid} onToggle={() => setShowGrid(!showGrid)} settings={settings} />
          
          <PathFinder 
            currentFloor={currentFloor}
            setCurrentFloor={setCurrentFloor}
            settings={settings}
            onPathFound={setPathSegments}
          />
        </div>
        
        {/* Map View takes remaining space */}
        <div className="flex-1 overflow-hidden">
          <MapView  
            settings={settings}   
            currentFloor={currentFloor}
            showGrid={showGrid}
            endLocation={highlightedLocation}
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
