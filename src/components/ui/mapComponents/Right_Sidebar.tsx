import React from "react";
import { AccessibilitySettings } from "./notused/Accessibility_Settings";
import { AccessibleTTSButton, Route } from "./Speaking";

interface RightSidebarProps {
    settings: AccessibilitySettings;
    currentFloor: number;
}

const RightSidebar: React.FC<RightSidebarProps> = ({ settings, currentFloor }) => {
    const route: Route = {
        destination: `Building A, Floor ${currentFloor}`,
        estimatedTime: "2 minutes",
        accessibilityNotes: "Elevator available, smooth pathways, wheelchair accessible",
        navigationInstructions: `You are currently on Floor ${currentFloor}. The elevator is located at the end of the corridor.`
    };

    return (
        <div
            className={`w-72 ${
                settings.contrast === "high" ? "bg-gray-800" : "bg-gray-800"
            } shadow-lg p-4`}
        >
            <h2
                className={`text-xl font-semibold mb-4 ${
                    settings.contrast === "high" ? "text-gray-100" : "text-gray-100"
                } ${settings.isDyslexicFont ? "font-dyslexic" : ""} ${
                    settings.fontSize === "large"
                        ? "text-lg"
                        : settings.fontSize === "xlarge"
                        ? "text-2xl"
                        : ""
                }`}
            >
                Location Details
            </h2>
            <div className="space-y-4">
                <div
                    className={`p-3 ${
                        settings.contrast === "high" ? "bg-gray-700" : "bg-gray-700"
                    } rounded-lg`}
                >
                    <h3
                        className={`font-medium ${
                            settings.contrast === "high" ? "text-gray-800" : "text-gray-100"
                        } ${settings.isDyslexicFont ? "font-dyslexic" : ""} ${
                            settings.fontSize === "large"
                                ? "text-lg"
                                : settings.fontSize === "xlarge"
                                ? "text-2xl"
                                : ""
                        }`}
                    >
                        Current Location
                    </h3>
                    <p
                        className={`${
                            settings.contrast === "high" ? "text-gray-400" : "text-gray-400"
                        } ${settings.isDyslexicFont ? "font-dyslexic" : ""} ${
                            settings.fontSize === "large"
                                ? "text-lg"
                                : settings.fontSize === "xlarge"
                                ? "text-2xl"
                                : ""
                        }`}
                    >
                        Building A, Floor {currentFloor}
                    </p>
                </div>
                <div
                    className={`p-3 ${
                        settings.contrast === "high" ? "bg-gray-700" : "bg-gray-700"
                    } rounded-lg`}
                >
                    <h3
                        className={`font-medium ${
                            settings.contrast === "high" ? "text-gray-500" : "text-gray-50"
                        } ${settings.isDyslexicFont ? "font-dyslexic" : ""} ${
                            settings.fontSize === "large"
                                ? "text-lg"
                                : settings.fontSize === "xlarge"
                                ? "text-2xl"
                                : ""
                        }`}
                    >
                        Accessibility Features
                    </h3>
                    <ul
                        className={`${
                            settings.contrast === "high" ? "text-gray-400" : "text-gray-400"
                        } list-disc ml-4 ${settings.isDyslexicFont ? "font-dyslexic" : ""} ${
                            settings.fontSize === "large"
                                ? "text-lg"
                                : settings.fontSize === "xlarge"
                                ? "text-2xl"
                                : ""
                        }`}
                    >
                        <li>Wheelchair accessible</li>
                        <li>Automatic doors</li>
                        <li>Accessible restroom nearby</li>
                    </ul>
                </div>
                <div
                    className={`p-3 ${
                        settings.contrast === "high" ? "bg-gray-700" : "bg-gray-700"
                    } rounded-lg`}
                >
                    <h3
                        className={`font-medium ${
                            settings.contrast === "high" ? "text-gray-200" : "text-gray-200"
                        } ${settings.isDyslexicFont ? "font-dyslexic" : ""} ${
                            settings.fontSize === "large"
                                ? "text-lg"
                                : settings.fontSize === "xlarge"
                                ? "text-2xl"
                                : ""
                        }`}
                    >
                        Audio Navigation
                    </h3>
                    <div className="mt-2">
                        <AccessibleTTSButton 
                            route={route}
                            settings={settings}
                            className={`w-full ${
                                settings.isDyslexicFont ? "font-dyslexic" : ""
                            }`}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RightSidebar;