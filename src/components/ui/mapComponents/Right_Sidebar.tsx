import React from "react";

interface RightSidebarProps {
    settings: {
        contrast: string;
    };
}

const RightSidebar: React.FC<RightSidebarProps> = ({ settings}) => {
    return (
        <div
            className={`w-72 ${
                settings.contrast === "high" ? "bg-gray-800" : "bg-gray-800"
            } shadow-lg p-4`}
        >
            <h2
                className={`text-xl font-semibold mb-4 ${
                    settings.contrast === "high" ? "text-gray-100" : "text-gray-100"
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
                        }`}
                    >
                        Current Location
                    </h3>
                    <p
                        className={`${
                            settings.contrast === "high" ? "text-gray-400" : "text-gray-400"
                        }`}
                    >
                        Building A, Floor 1
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
                        }`}
                    >
                        Accessibility Features
                    </h3>
                    <ul
                        className={`${
                            settings.contrast === "high" ? "text-gray-400" : "text-gray-400"
                        } list-disc ml-4`}
                    >
                        <li>Wheelchair accessible</li>
                        <li>Automatic doors</li>
                        <li>Accessible restroom nearby</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default RightSidebar;
1