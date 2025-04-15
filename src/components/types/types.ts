
export interface Coordinate {
    x: number;
    y: number;
}
export interface Room {
    number: string;
    start: Coordinate;
    end: Coordinate;
    entry?: Coordinate[] | Coordinate;
}
export interface FloorManagementProps {
    currentFloor: number;
    onFloorChange: (floor: number) => void;
}
export interface NavigationItem {
    name: string;
    coordinates: { x: number; y: number };
    icon: React.ReactNode;
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
export function getFloorFromRoomNumber(roomNumber: string): number {
    // Extract the first digit from the room number
    const firstDigit = parseInt(roomNumber.charAt(0));
    return firstDigit;
}
export function isRoomOnFloor(roomNumber: string, floorNumber: number): boolean {
    return getFloorFromRoomNumber(roomNumber) === floorNumber;
} 