import React, { useState } from 'react';
import { getTextClass } from './Text_Class';
import AddCustomNavigationButton from '../Custom_Location';
import { MdElevator, MdWater, MdOutlineDirectionsWalk, MdSportsTennis, RestroomIcon } from '@/utils/icons';
interface NavigationItem {
    name: string;
    coordinates: { x: number; y: number };
    icon: React.ReactNode;
}

const QuickNavigation: React.FC = () => {
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
            <h2 className={`${getTextClass} font-semibold mb-3 text-gray-200`}>
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

export default QuickNavigation;