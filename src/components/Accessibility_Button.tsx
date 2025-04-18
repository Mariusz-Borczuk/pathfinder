import React from "react";

interface AccessibilityButtonProps {
    label: string;
    isActive: boolean;
    onClick: () => void;
    icon: React.ReactNode;
    description: string;
}

export const AccessibilityButton: React.FC<AccessibilityButtonProps> = ({
    label,
    isActive,
    onClick,
    icon,
    description,
}) => (
    <div className="relative group">
        <button
            onClick={onClick}
            className={`p-2 rounded ${
                isActive ? "bg-green-400" : "bg-gray-600"
            } text-black hover:shadow-lg hover:scale-105 focus:ring-2 focus:ring-green-800 focus:outline-none border-2 rounded px-4 py-2`}
            aria-label={label}
        >
            {icon}
        </button>
        <div className="z-50 absolute left-1/2 transform -translate-x-1/2 mt-2 hidden border-green-400 border-2 group-hover:block bg-gray-800 text-gray-100 px-3 py-2 rounded text-sm">
            {description}
        </div>
    </div>
);

export default AccessibilityButton;
