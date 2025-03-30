import React, { useState } from 'react';
import { getTextClass } from './Text_Class';
import { AccessibilitySettings } from './Accessibility_Settings';


export const MainHeader: React.FC<{ settings: AccessibilitySettings }> = ({ settings }) => {
    return (
        <header className="mb-6 ${
                    settings.isDyslexicFont ? 'font-dyslexic' : ''
                } ${
                    settings.fontSize === 'large'
                        ? 'text-lg'
                        : settings.fontSize === 'xlarge'
                        ? 'text-2xl'
                        : ''
                } ">
            <h1
                className={`font-bold text-gray-100`}
            >
                Campus Navigator
            </h1>
            <p className="text-gray-400">Accessible Wayfinding System</p>
        </header>
    );
};

// export default MainHeader;
// const MainHeader: React.FC = () => {
//     return (
//         <header className="mb-6">
//             <h1 className={`${getTextClass} text-2xl font-bold text-gray-100`}>
//                 Campus Navigator
//             </h1>
//             <p className="text-gray-400">Accessible Wayfinding System</p>
//         </header>
//     );
// };

// export default MainHeader;