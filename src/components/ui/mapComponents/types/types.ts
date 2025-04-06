
export interface Coordinate {
    x: number;
    y: number;
}

export interface Room {
    number: string;
    start: Coordinate;
    end: Coordinate;
    entry: Coordinate;
}

export interface Elevator {
    start: Coordinate;
    end: Coordinate;
    entry: Coordinate;
}

export interface Bathroom {
    type: 'Male' | 'Female';
    start: Coordinate;
    end: Coordinate;
    entry: Coordinate;
}

export interface FireEquipment {
    location: Coordinate;
}

export interface UtilityRoom {
    name: string;
    start: Coordinate;
    end: Coordinate;
}

export interface Stair {
    start: Coordinate;
    end: Coordinate;
}

export interface Path {
    start: Coordinate;
    end: Coordinate;
}

export interface FloorData {
    classrooms: Room[];
    elevators: Elevator[];
    bathrooms: Bathroom[];
    fireEquipment: FireEquipment[];
    utilityRooms: UtilityRoom[];
    stairs: Stair[];
    paths: Path[];
}

export interface AccessibilitySettings {
    fontSize: "normal" | "large" | "xlarge";
    contrast: "normal" | "high";
    isDyslexicFont: boolean;
  }

// Define the PathMapProps interface
export interface PathMapProps {
    title?: string;
    onFindPath?: () => void;
    onReset?: () => void;
  } 
export interface FloorGridProps {
    showGrid: boolean;
    currentFloor: number;
}

export interface Route {
    destination: string;
    estimatedTime: string;
    accessibilityNotes: string;
    navigationInstructions: string;
}

export interface RouteInformationCardProps {
    route: Route;
    settings: AccessibilitySettings;
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
export interface AccessibleTTSButtonProps {
    route: Route;
    className?: string;
    settings: AccessibilitySettings;
}
export interface Section {
    title: string;
    content: string;
}

export interface SpeechSettings {
    volume: number;
    rate: number;
}

export interface GridToggleButtonProps {
    showGrid: boolean;
    onToggle: () => void;
    settings?: {
        contrast: string;
    };
}
export interface RightSidebarProps {
    settings: AccessibilitySettings;
    currentFloor: number;
}

export interface MapViewProps {
    currentFloor: number;
    showGrid: boolean;
    settings?: any;
}

export interface LayoutProps {
    children: React.ReactNode;
  }
/**
 * Extracts the floor number from a room number
 * @param roomNumber The room number (e.g., "101", "201", "301")
 * @returns The floor number (1, 2, or 3)
 */
export function getFloorFromRoomNumber(roomNumber: string): number {
    // Extract the first digit from the room number
    const firstDigit = parseInt(roomNumber.charAt(0));
    return firstDigit;
}

/**
 * Validates if a room number is valid for a given floor
 * @param roomNumber The room number to validate
 * @param floorNumber The floor number to check against
 * @returns boolean indicating if the room is on the specified floor
 */
export function isRoomOnFloor(roomNumber: string, floorNumber: number): boolean {
    return getFloorFromRoomNumber(roomNumber) === floorNumber;
} 