import React, { useState } from "react";
import { Search, Map, Type, Eye } from "lucide-react";
import { IoMdFemale, IoMdMale, IoMdWater } from "react-icons/io";
import { MdElevator, MdOutlineDirectionsWalk, MdSportsTennis } from "react-icons/md";
import { FaElevator } from "react-icons/fa6";
import RightSidebar from "./Right_Sidebar";
import MapView from "./Map_View";
import EyeButton from "./Eye";
import { IoWater } from "react-icons/io5";
import { AccessibilitySettings } from "./Accessibility_Settings";


const WayfindingApp2: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [settings, setSettings] = useState<AccessibilitySettings>({
    fontSize: "normal",
    contrast: "normal",
    isDyslexicFont: false,
  });

  const getTextClass = () => {
    let textClass = "transition-all duration-200 ";
    if (settings.fontSize === "large") textClass += "text-lg ";
    if (settings.fontSize === "xlarge") textClass += "text-xl ";
    if (settings.isDyslexicFont) textClass += "font-mono ";
    return textClass.trim();
  };

  const AccessibilityButton: React.FC<{
    label: string;
    isActive: boolean;
    onClick: () => void;
    icon: React.ReactNode;
    description: string;
  }> = ({ label, isActive, onClick, icon, description }) => (
    <div className="relative group">
      <button
        onClick={onClick}
        className={`p-2 rounded ${
          isActive ? "bg-blue-600" : "bg-gray-600"
        } hover:opacity-90 focus:ring-2 focus:ring-blue-400 focus:outline-none`}
        aria-label={label}
      >
        {icon}
      </button>
      <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 hidden group-hover:block bg-gray-800 text-gray-100 px-3 py-2 rounded text-sm">
        {description}
      </div>
    </div>
  );

return (
    <div className="flex h-screen w-full bg-gray-900 p-0 m-0" role="application">
        {/* Left Sidebar */}
        <aside
            className="w-80 bg-gray-800 shadow-lg p-4 flex flex-col"
            role="complementary"
        >
            <header className="mb-6">
                <h1 className={`${getTextClass()} text-2xl font-bold text-gray-100`}>
                    Campus Navigator
                </h1>
                <p className="text-gray-400">Accessible Wayfinding System</p>
            </header>

            {/* Accessibility Controls */}
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

            {/* Search Bar */}
            <div className="relative mb-6">
                <label htmlFor="location-search" className="sr-only">
                    Search for a location
                </label>
                <input
                    id="location-search"
                    type="search"
                    placeholder="Search for a room..."
                    className={`${getTextClass()} w-full p-3 pl-10 bg-gray-700 text-gray-100 border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    aria-label="Search locations"
                />
                <Search
                    className="absolute left-3 top-3 text-gray-400"
                    size={20}
                    aria-hidden="true"
                />
            </div>

            {/* Quick Navigation */}
            <div>
                <h2 className={`${getTextClass()} font-semibold mb-3 text-gray-200`}>
                    Quick Navigation
                </h2>
                <ul className="space-y-2 flex flex-col">
                    {[
                        { icon: <MdSportsTennis />, name: "Gymnasium" },
                        { icon: <span className="flex flex-row"><IoMdFemale /><IoMdMale /></span>, name: "Restrooms" },
                        { icon: <FaElevator />, name: "Elevators" },
                        { icon: <MdOutlineDirectionsWalk />, name: "Escape route" },
                        { icon: <IoWater />, name: "Water" },
                    ].map((location, index) => (
                        <li key={index}>
                            <button className="w-full p-3 flex items-center gap-3 text-left bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600 focus:ring-2 focus:ring-blue-400 focus:outline-none block">
                                {location.icon}
                                <span>{location.name}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>

            {/* Top Navigation Bar */}
    <div className="flex-1 p-4">
            <div className="flex justify-between items-center mb-4">
                    <div className="flex gap-4">
                    <button
                            className={`p-2 rounded-lg ${
                            settings.contrast === "high" ? "bg-gray-300 hover:bg-gray-400" : "bg-gray-200 hover:bg-gray-300"
                            }`}
                    >
                            <Map
                            className={`w-5 h-5 ${
                                    settings.contrast === "high" ? "text-gray-100" : "text-gray-800"
                            }`}
                            />
                    </button>
                    <button
                            className={`p-2 rounded-lg ${
                            settings.contrast === "high" ? "bg-gray-300 hover:bg-gray-400" : "bg-gray-200 hover:bg-gray-300"
                            }`}
                    >
                            <Type
                            className={`w-5 h-5 ${
                                    settings.contrast === "high" ? "text-gray-100" : "text-gray-800"
                            }`}
                            />
                    </button>
                    </div>
                    <EyeButton settings={{  contrast: settings.contrast === "normal" ? "low" : "high" }} />
            </div>

            <MapView />
    </div>
    <RightSidebar settings={{
            contrast: ""
        }}  />
</div>
   
);
};

export default WayfindingApp2;
