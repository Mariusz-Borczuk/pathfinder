import React, { useState } from 'react';
import { MdHome, MdLocationOn, MdSportsTennis } from '../../utils/icons';

interface NavigationItem {
    name: string;
    coordinates: { x: number; y: number };
    icon: React.ReactNode;
}

interface AddCustomNavigationButtonProps {
    onAdd: (item: NavigationItem) => void;
}

const AddCustomNavigationButton: React.FC<AddCustomNavigationButtonProps> = ({ onAdd }) => {
    const [isAccordionOpen, setIsAccordionOpen] = useState(false);
    const [name, setName] = useState('');
    const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
    const [selectedIcon, setSelectedIcon] = useState<React.ReactNode>(<MdSportsTennis />);

    const icons = [
        { label: 'Tennis', icon: <MdSportsTennis /> },
        { label: 'Location', icon: <MdLocationOn /> },
        { label: 'Home', icon: <MdHome /> },
    ];

    const handleAddCustomNavigation = () => {
        if (!name.trim()) return;
        
        onAdd({
            name,
            coordinates,
            icon: selectedIcon,
        });
        setName('');
        setCoordinates({ x: 0, y: 0 });
        setSelectedIcon(<MdSportsTennis />);
    };

    return (
        <div className="mt-6 w-full" >
            <div>
                <button
                    onClick={() => setIsAccordionOpen(!isAccordionOpen)}
                    className="p-3 bg-blue-600 text-white w-full rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none transition duration-200 font-medium"
                    aria-expanded={isAccordionOpen}
                    aria-controls="custom-navigation-panel"
                >
                    {isAccordionOpen ? 'Close Settings' : 'Add Custom Navigation'}
                </button>
            </div>
            {isAccordionOpen && (
                <div 
                    id="custom-navigation-panel"
                    className="mt-4 w-full p-6 border border-gray-300 rounded-lg bg-white dark:bg-gray-800 shadow-md"
                    role="region"
                    aria-label="Custom navigation settings"
                >
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Custom Navigation Settings</h2>
                    <div className="mb-4">
                        <label htmlFor="nav-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Name:
                        </label>
                        <input
                            id="nav-name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            required
                            aria-required="true"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Coordinates:
                        </label>
                        <div className="flex gap-4">
                            <div className="w-1/2">
                                <label htmlFor="coord-x" className="sr-only">X Coordinate</label>
                                <input
                                    id="coord-x"
                                    type="number"
                                    placeholder="X"
                                    value={coordinates.x}
                                    onChange={(e) => setCoordinates({ ...coordinates, x: parseFloat(e.target.value) || 0 })}
                                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                    aria-label="X coordinate"
                                />
                            </div>
                            <div className="w-1/2">
                                <label htmlFor="coord-y" className="sr-only">Y Coordinate</label>
                                <input
                                    id="coord-y"
                                    type="number"
                                    placeholder="Y"
                                    value={coordinates.y}
                                    onChange={(e) => setCoordinates({ ...coordinates, y: parseFloat(e.target.value) || 0 })}
                                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                    aria-label="Y coordinate"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label id="icon-group-label" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Select an icon:
                        </label>
                        <div 
                            className="flex gap-4" 
                            role="radiogroup"
                            aria-labelledby="icon-group-label"
                        >
                            {icons.map((iconOption, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedIcon(iconOption.icon)}
                                    className={`p-3 border rounded-lg flex items-center justify-center transition duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                                        selectedIcon === iconOption.icon
                                            ? 'bg-red-700 text-white border-red-700 scale-110 transform ring-red-500'
                                            : 'bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600'
                                    }`}
                                    aria-label={`Select ${iconOption.label} icon`}
                                    aria-pressed={selectedIcon === iconOption.icon}
                                    role="radio"
                                    tabIndex={selectedIcon === iconOption.icon ? 0 : -1}
                                >
                                    <span className="text-2xl">{iconOption.icon}</span>
                                    <span className="sr-only">{iconOption.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                    <button
                        onClick={handleAddCustomNavigation}
                        className={`w-full mt-4 p-3 rounded-lg transition duration-200 font-medium ${
                            !name.trim() 
                            ? 'bg-gray-400 text-white cursor-not-allowed' 
                            : 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none'
                        }`}
                        disabled={!name.trim()}
                        aria-disabled={!name.trim()}
                    >
                        Add Custom Navigation
                    </button>
                </div>
            )}
        </div>
    );
};

export default AddCustomNavigationButton;
