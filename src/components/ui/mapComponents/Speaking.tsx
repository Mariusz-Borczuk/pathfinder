import React, { useState, useEffect } from 'react';
import { AccessibilitySettings } from './notused/Accessibility_Settings';

export interface Route {
    destination: string;
    estimatedTime: string;
    accessibilityNotes: string;
    navigationInstructions: string;
}

export interface TextToSpeechOptions {
    language?: string;
    pitch?: number;
    rate?: number;
    volume?: number;
    onStart?: () => void;
    onEnd?: () => void;
    onError?: (event: SpeechSynthesisErrorEvent) => void;
}

// Text-to-Speech Utility Class
class TextToSpeechService {
    private synth: SpeechSynthesis;
    private isSpeaking: boolean;

    constructor() {
        this.synth = window.speechSynthesis;
        this.isSpeaking = false;
    }

    // Speak method with comprehensive configuration
    speak(text: string, options: TextToSpeechOptions = {}): SpeechSynthesisUtterance {
        if (this.isSpeaking) {
            this.cancel();
        }

        const utterance = new SpeechSynthesisUtterance(text);

        utterance.lang = options.language || 'en-US';
        utterance.pitch = options.pitch || 1;
        utterance.rate = options.rate || 1;
        utterance.volume = options.volume || 1;

        utterance.onstart = () => {
            this.isSpeaking = true;
            options.onStart?.();
        };

        utterance.onend = () => {
            this.isSpeaking = false;
            options.onEnd?.();
        };

        utterance.onerror = (event: SpeechSynthesisErrorEvent) => {
            console.error('Speech synthesis error:', event);
            this.isSpeaking = false;
            options.onError?.(event);
        };

        this.synth.speak(utterance);
        return utterance;
    }

    // Cancel current speech
    cancel(): void {
        if (this.synth) {
            this.synth.cancel();
            this.isSpeaking = false;
        }
    }

    // Pause speech
    pause(): void {
        if (this.synth) {
            this.synth.pause();
        }
    }

    // Resume speech
    resume(): void {
        if (this.synth) {
            this.synth.resume();
        }
    }
}

export interface AccessibleTTSButtonProps {
    route: Route;
    className?: string;
    settings: AccessibilitySettings;
}

// Accessible Text-to-Speech Button Component
const AccessibleTTSButton: React.FC<AccessibleTTSButtonProps> = ({ 
    route, 
    className = '',
    settings
}) => {
    const [ttsService] = useState<TextToSpeechService>(new TextToSpeechService());
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    const routeDescription: string = `
        You are currently at ${route.destination}.
        ${route.estimatedTime} to reach your destination.
        ${route.accessibilityNotes}.
        ${route.navigationInstructions}
    `;

    const toggleSpeech = (): void => {
        if (isPlaying) {
            ttsService.cancel();
            setIsPlaying(false);
        } else {
            ttsService.speak(routeDescription, {
                onStart: () => setIsPlaying(true),
                onEnd: () => setIsPlaying(false),
                onError: () => setIsPlaying(false),
                language: 'en-US',
                rate: 0.9,
                pitch: 1
            });
        }
    };

    useEffect(() => {
        return () => {
            ttsService.cancel();
        };
    }, [ttsService]);

    const textSizeClass = settings.fontSize === "large"
        ? "text-base"
        : settings.fontSize === "xlarge"
        ? "text-lg"
        : "text-sm";

    return (
        <div className="space-y-3">
            <div className={`${textSizeClass} text-gray-300 bg-gray-800 p-3 rounded-lg`}>
                <p className="font-medium text-gray-200 mb-2">What will be read:</p>
                <div className="space-y-2">
                    <p><span className="font-medium">Location:</span> {route.destination}</p>
                    <p><span className="font-medium">Time:</span> {route.estimatedTime}</p>
                    <p><span className="font-medium">Accessibility:</span> {route.accessibilityNotes}</p>
                    <p><span className="font-medium">Directions:</span> {route.navigationInstructions}</p>
                </div>
            </div>
            <button 
                onClick={toggleSpeech}
                className={`
                    flex items-center justify-center 
                    p-2 rounded-lg
                    transition-colors duration-200
                    ${isPlaying 
                        ? 'bg-red-600 hover:bg-red-700' 
                        : 'bg-blue-600 hover:bg-blue-700'
                    } 
                    text-white 
                    shadow-md hover:shadow-lg
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                    ${textSizeClass}
                    ${className}
                `}
                aria-label={isPlaying ? "Stop Route Description" : "Play Route Description"}
            >
                {isPlaying ? 'Stop' : 'Listen to Route'}
            </button>
        </div>
    );
};

export interface RouteInformationCardProps {
    route: Route;
    settings: AccessibilitySettings;
}

// Example usage in a route component
const RouteInformationCard: React.FC<RouteInformationCardProps> = ({ route, settings }) => {
    return (
        <div className="p-4 bg-gray-800 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-gray-200 mb-4">Route Details</h2>
            <div className="space-y-2 text-gray-300">
                <p><span className="font-medium">Destination:</span> {route.destination}</p>
                <p><span className="font-medium">Estimated Time:</span> {route.estimatedTime}</p>
                <p><span className="font-medium">Accessibility Notes:</span> {route.accessibilityNotes}</p>
            </div>
            
            <div className="mt-4">
                <AccessibleTTSButton 
                    route={route} 
                    settings={settings}
                    className="w-full"
                />
            </div>
        </div>
    );
};

export { AccessibleTTSButton, TextToSpeechService, RouteInformationCard };
