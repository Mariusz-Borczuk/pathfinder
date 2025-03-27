import React, { useState } from 'react';
import { getTextClass } from './Text_Class';

const MainHeader: React.FC = () => {
    return (
        <header className="mb-6">
            <h1 className={`${getTextClass} text-2xl font-bold text-gray-100`}>
                Campus Navigator
            </h1>
            <p className="text-gray-400">Accessible Wayfinding System</p>
        </header>
    );
};

export default MainHeader;