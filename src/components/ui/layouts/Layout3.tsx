import { Eye, Type } from "lucide-react";
import React, { useState } from "react";
import AccessibilityButton from "../../Accessibility_Button";
import { AccessibilitySettings, LayoutProps } from "../../types/types";
import { SearchBar } from "../leftMenu/SearchBar";
import { GridToggleButton } from "../mapCenter/GridToggleButton";
import { MapView } from "../mapCenter/Map_View";
import RightSidebar from "../rightMenu/Right_Sidebar";
import { getSettings } from "../settings";
import { MainHeader } from "../leftMenu/Main_Header";
import QuickNavigation from "../leftMenu/Quick_Navigation";
import FloorManagement from "../leftMenu/Floor_Management";


const WayfindingApp3: React.FC<LayoutProps> = ({ children }) => {
  const [settings, setSettings] = useState<AccessibilitySettings>({
    fontSize: "normal",
    contrast: "normal",
    isDyslexicFont: false,
  });
  const [currentFloor, setCurrentFloor] = useState(1);
  const [showGrid, setShowGrid] = useState(false)

  return (
    <div
      className="flex h-screen w-full bg-gray-900 p-0 m-0"
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

        <SearchBar settings={settings} currentFloor={currentFloor} />

        <QuickNavigation settings={settings} currentFloor={currentFloor} />
        <FloorManagement 
          currentFloor={currentFloor} 
          onFloorChange={setCurrentFloor} 
        />
      </aside>

      <div className="flex-1 p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-4">
            <div className="mb-4">
                <GridToggleButton showGrid={showGrid} onToggle={() => setShowGrid(!showGrid)} />
            </div>
          </div>
        </div>
        <MapView  
          settings={settings}   
          currentFloor={currentFloor}
          showGrid={showGrid}
        />
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
