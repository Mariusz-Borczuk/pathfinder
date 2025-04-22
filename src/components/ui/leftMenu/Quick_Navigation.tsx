import React, { useState } from 'react';
import { getSettings } from '../settings';
import AddCustomNavigationButton from './Custom_Location';
import { RightSidebarProps, NavigationItem } from '@/components/types/types';
import { MdElevator, MdOutlineDirectionsWalk, MdSportsTennis, MdWater, RestroomIcon } from '@/utils/icons';

/**
 * QuickNavigation component provides a list of predefined locations and custom navigation items.
 * 
 * The component displays a list of locations, each with an icon, name, and coordinates. Users can 
 * also add custom navigation items which will appear alongside the predefined ones.
 * 
 * @component
 * @param {RightSidebarProps} props - Props for the QuickNavigation component
 * @param {Object} props.settings - The settings for displaying the component
 * 
 * @returns {JSX.Element} A sidebar section with quick navigation options and ability to add custom locations
 * 
 * @example
 * <QuickNavigation settings={userSettings} />
 */
export const QuickNavigation: React.FC<RightSidebarProps> = ({ settings }) => {
    const [customNavigation, setCustomNavigation] = useState<NavigationItem[]>([]);

    const predefinedLocations: NavigationItem[] = [
      {
        icon: <MdSportsTennis />,
        name: "Gymnasium",
        coordinates: { x: 10, y: 20 },
      },
      {
        icon: <RestroomIcon />,
        name: "Restrooms",
        coordinates: { x: 15, y: 25 },
      },
      { icon: <MdElevator />, name: "Elevators", coordinates: { x: 5, y: 10 } },
      {
        icon: <MdOutlineDirectionsWalk />,
        name: "Escape route",
        coordinates: { x: 30, y: 40 },
      },
      { icon: <MdWater />, name: "Water", coordinates: { x: 50, y: 60 } },
    ];

    const handleAddCustomNavigation = (item: NavigationItem) => {
        setCustomNavigation((prev) => [...prev, item]);
    };

    return (
        <div>
            <h2 className={`font-semibold mb-3 text-gray-200 ${getSettings(settings)}`}>
                Quick Navigation
            </h2>
            <ul className="space-y-2 flex flex-col">
                {[...predefinedLocations, ...customNavigation].map((location, index) => (
                    <li key={index}>
                        <button className="w-full p-3 items-center gap-3 text-left bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600 focus:ring-2 focus:ring-blue-400 focus:outline-none block">
                            {location.icon}
                            <span>{location.name}</span>
                        </button>
                    </li>
                ))}
            </ul>
            <AddCustomNavigationButton onAdd={handleAddCustomNavigation} />
        </div>
    );
};