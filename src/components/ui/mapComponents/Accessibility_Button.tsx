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

export default AccessibilityButton;
