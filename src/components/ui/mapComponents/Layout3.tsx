import React, { useState } from "react";
import RightSidebar from "./Right_Sidebar";
import MapView from "./Map_View";
import QuickNavigation from "./Quick_Navigation";
import MainHeader from "./Main_Header";
import { SearchBar } from "./SearchBar";
import AccessibilityButton from "./Accessibility_Button";
import { AccessibilitySettings } from "./Accessibility_Settings";
import { Eye, Type, Map } from "lucide-react";
import EyeButton from "./Eye";

interface WayfindingApp3Props {
  children: React.ReactNode;
}

const WayfindingApp3: React.FC<WayfindingApp3Props> = ({ children }) => {
  const [settings, setSettings] = useState<AccessibilitySettings>({
    fontSize: "normal",
    contrast: "normal",
    isDyslexicFont: false,
  });
  return (
    <div
      className="flex h-screen w-full bg-gray-900 p-0 m-0"
      role="application"
    >
      {/* Left Sidebar */}
      <aside
        className="w-80 bg-gray-800 shadow-lg p-4 flex flex-col"
        role="complementary"
      >
        <MainHeader />

        <div
          className="mb-6 bg-gray-700 p-4 rounded-lg"
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
                        size={
                          size === "normal" ? 16 : size === "large" ? 20 : 24
                        }
                        className="text-gray-200"
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
      </aside>

      <div className="flex-1 p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-4">
            <button
              className={`p-2 rounded-lg ${
                settings.contrast === "high"
                  ? "bg-gray-300 hover:bg-gray-400"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              <Map
                className={`w-5 h-5 ${
                  settings.contrast === "high"
                    ? "text-gray-100"
                    : "text-gray-800"
                }`}
              />
            </button>
            <button
              className={`p-2 rounded-lg ${
                settings.contrast === "high"
                  ? "bg-gray-300 hover:bg-gray-400"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              <Type
                className={`w-5 h-5 ${
                  settings.contrast === "high"
                    ? "text-gray-100"
                    : "text-gray-800"
                }`}
              />
            </button>
          </div>
          <EyeButton
            settings={{
              contrast: settings.contrast === "normal" ? "low" : "high",
            }}
          />
        </div>

        <MapView />
      </div>
      <RightSidebar
        settings={{
          contrast: "",
        }}
      />
      {children}
    </div>
  );
};

export default WayfindingApp3;
