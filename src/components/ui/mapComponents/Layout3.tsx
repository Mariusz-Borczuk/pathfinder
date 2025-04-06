import React, { useState } from "react";
import RightSidebar from "./Right_Sidebar";
import { MapView } from "./Map_View"; 
import QuickNavigation from "./notused/Quick_Navigation";
import { MainHeader } from "./notused/Main_Header";
import { SearchBar } from "./notused/SearchBar";
import AccessibilityButton from "./notused/Accessibility_Button";
import { AccessibilitySettings } from "./notused/Accessibility_Settings";
import { Eye, Type, Map } from "lucide-react";
import FloorManagement from "./notused/Floor_Management";
import { GridToggleButton } from "./GridToggleButton";

interface LayoutProps {
  children: React.ReactNode;
}

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
        className={`w-80 bg-gray-800 shadow-lg p-4 flex flex-col ${
          settings.isDyslexicFont ? "font-dyslexic" : ""
        } ${
          settings.fontSize === "large"
            ? "text-lg"
            : settings.fontSize === "xlarge"
            ? "text-2xl"
            : ""
        }`}
        role="complementary"
      >
        <MainHeader settings={settings} />

        <div
          className={`mb-6 bg-gray-700 p-4 rounded-lg ${
            settings.isDyslexicFont ? "font-dyslexic" : ""
          } ${
            settings.fontSize === "large"
              ? "text-lg"
              : settings.fontSize === "xlarge"
              ? "text-2xl"
              : ""
          }`}
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

        <SearchBar />

        <QuickNavigation />
        <FloorManagement 
          currentFloor={currentFloor} 
          onFloorChange={setCurrentFloor} 
        />
      </aside>

      <div className="flex-1 p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-4">
            <button
              className={`p-2 rounded-lg ${
                settings.contrast === "high"
                  ? "bg-red-300 hover:bg-gray-400"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
              title="Map View"
            >
              <Map
                className={`w-5 h-5 ${
                  settings.contrast === "high"
                    ? "text-gray-100"
                    : "text-gray-800"
                }`}
              />
            </button>
            <div className="mb-4">
                <GridToggleButton showGrid={showGrid} onToggle={() => setShowGrid(!showGrid)} />
            </div>
          </div>
        </div>
        <MapView />
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
