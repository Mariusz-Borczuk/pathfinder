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
    private onWordSpoken?: (word: string, position: number) => void;

    constructor() {
        this.synth = window.speechSynthesis;
        this.isSpeaking = false;
    }

    // Speak method with comprehensive configuration
    speak(text: string, options: TextToSpeechOptions = {}, onWordSpoken?: (word: string, position: number) => void): SpeechSynthesisUtterance {
        if (this.isSpeaking) {
            this.cancel();
        }

        this.onWordSpoken = onWordSpoken;
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

        utterance.onboundary = (event) => {
            if (event.name === 'word') {
                const word = text.slice(event.charIndex, event.charIndex + event.charLength);
                this.onWordSpoken?.(word, event.charIndex);
            }
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
interface Section {
    title: string;
    content: string;
}

interface SpeechSettings {
    volume: number;
    rate: number;
}

// Accessible Text-to-Speech Button Component
export const AccessibleTTSButton: React.FC<AccessibleTTSButtonProps> = ({ 
    route, 
    className = '',
    settings
}) => {
    const [ttsService] = useState<TextToSpeechService>(new TextToSpeechService());
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [currentSection, setCurrentSection] = useState<string | null>(null);
    const [speechSettings, setSpeechSettings] = useState<SpeechSettings>({
        volume: 1,
        rate: 0.9
    });

    const sections: Section[] = [
        { title: "Location", content: route.destination },
        { title: "Time", content: route.estimatedTime },
        { title: "Directions", content: route.navigationInstructions },
        { title: "Accessibility", content: route.accessibilityNotes }
    ];

    const routeDescription: string = sections
        .map(section => `${section.title}: ${section.content}`)
        .join('. ');

    const getCurrentSection = (position: number): string | null => {
        const textBeforePosition = routeDescription.slice(0, position);
        
        // Find the current section based on content
        for (let i = 0; i < sections.length; i++) {
            const currentSection = sections[i];
            if (!currentSection) continue;

            const sectionText = `${currentSection.title}: ${currentSection.content}`;
            const nextSection = i < sections.length - 1 ? sections[i + 1] : null;
            const nextSectionText = nextSection ? `${nextSection.title}: ${nextSection.content}` : null;

            // If we've reached the end of current section and there's a next section
            if (textBeforePosition.includes(sectionText) && 
                (!nextSectionText || !textBeforePosition.includes(nextSectionText))) {
                return nextSection?.title || currentSection.title;
            }
        }
        
        return sections[0]?.title || null;
    };

    const toggleSpeech = (): void => {
        if (isPlaying) {
            ttsService.cancel();
            setIsPlaying(false);
            setCurrentSection(null);
        } else {
            setCurrentSection(null);
            ttsService.speak(routeDescription, {
                onStart: () => {
                    setIsPlaying(true);
                    // Set initial section highlight
                    const firstSection = sections[0];
                    if (firstSection) {
                        setCurrentSection(firstSection.title);
                    }
                },
                onEnd: () => {
                    setIsPlaying(false);
                    setCurrentSection(null);
                },
                onError: () => {
                    setIsPlaying(false);
                    setCurrentSection(null);
                },
                language: 'en-US',
                rate: speechSettings.rate,
                volume: speechSettings.volume,
                pitch: 1
            }, (word, position) => setCurrentSection(getCurrentSection(position)));
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
            <div className={`${textSizeClass} text-gray-300 bg-gray-800 p-2 rounded-lg`}>
                <div className="space-y-3">
                    {sections.map((section) => (
                        <div 
                            key={section.title}
                            className={`
                                transition-colors duration-200
                                ${currentSection === section.title 
                                    ? 'bg-gray-700 rounded px-3 py-1' 
                                    : ''
                                }
                            `}
                        >
                            <p className="font-medium text-gray-200 mb-1">{section.title}</p>
                            <p className="text-gray-300">
                                {section.content}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="space-y-2 bg-gray-800 p-2 rounded-lg">
                <div className="flex items-center justify-between">
                    <label htmlFor="volume" className="text-gray-200">Volume</label>
                    <span className="text-gray-400">{Math.round(speechSettings.volume * 100)}%</span>
                </div>
                <input
                    type="range"
                    id="volume"
                    min="0"
                    max="1"
                    step="0.1"
                    value={speechSettings.volume}
                    onChange={(e) => setSpeechSettings(prev => ({ ...prev, volume: parseFloat(e.target.value) }))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />

                <div className="flex items-center justify-between mt-2">
                    <label htmlFor="rate" className="text-gray-200">Speed</label>
                    <span className="text-gray-400">{Math.round(speechSettings.rate * 100)}%</span>
                </div>
                <input
                    type="range"
                    id="rate"
                    min="0.5"
                    max="2"
                    step="0.1"
                    value={speechSettings.rate}
                    onChange={(e) => setSpeechSettings(prev => ({ ...prev, rate: parseFloat(e.target.value) }))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
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




