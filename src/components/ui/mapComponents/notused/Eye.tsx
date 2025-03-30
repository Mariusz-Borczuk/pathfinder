import React from "react";
import { contrastSettings } from "../tileData"; // Adjusted the path to match the correct location
import { Eye } from "lucide-react"; // Replace with the actual import for the Eye component



const EyeButton: React.FC<contrastSettings> = ({ settings }) => {
    return (
        <button
            className={`p-2 rounded-lg ${
                settings.contrast === "high" ? "bg-gray-300 hover:bg-gray-400" : "bg-gray-200 hover:bg-gray-300"
            }`}
        >
            <Eye
                className={`w-5 h-5 ${
                    settings.contrast === "high" ? "text-gray-100" : "text-gray-800"
                }`}
            />
        </button>
    );
};

export default EyeButton;