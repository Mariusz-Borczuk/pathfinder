import React from 'react';
import { getSettings } from '../settings';
import { AccessibilitySettings } from '@/components/types/types';


export const MainHeader: React.FC<{ settings: AccessibilitySettings }> = ({ settings }) => {
    const localSettings = `mb-6 ${getSettings(settings)}`;
    return (
        <header className={localSettings}>
            <h1
                className={`font-bold text-gray-100`}
            >
                Campus Navigator
            </h1>
            <p className="text-gray-400">Accessible Wayfinding System</p>
        </header>
    );
};