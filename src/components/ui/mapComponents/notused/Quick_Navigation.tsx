import React, { useState } from 'react';
import { MdSportsTennis, MdOutlineDirectionsWalk } from 'react-icons/md';
import { IoMdFemale, IoMdMale } from 'react-icons/io';
import { IoWater } from 'react-icons/io5';
import { FaElevator } from 'react-icons/fa6';
import { getTextClass } from './Text_Class';


const QuickNavigation: React.FC = () => {
 
    return (
        <div>
            <h2 className={`${getTextClass} font-semibold mb-3 text-gray-200`}>
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
                        <button className="w-full p-3 items-center gap-3 text-left bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600 focus:ring-2 focus:ring-blue-400 focus:outline-none block">
                            {location.icon}
                            <span>{location.name}</span>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default QuickNavigation;