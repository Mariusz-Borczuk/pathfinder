import { PathSegment } from "@/PathFinder";
import { floor1Data } from "./floor1.data";
import { floor2Data } from "./floor2.data";
import { floor3Data } from "./floor3.data";
import { floor4Data } from "./floor4.data";

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

export interface HoveredCellInfo {
    text: string;
    x: number;
    y: number;
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
    entry: Coordinate;
}
export interface Stair {
    start: Coordinate;
    end: Coordinate;
    entry: Coordinate;
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
}
export interface AccessibilityFontSizeProps {
    fontSize: "normal" | "large" | "xlarge";
}
export interface PathMapProps {
    title?: string;
    onFindPath?: () => void;
    onReset?: () => void;
} 
export interface FloorGridProps {
    showGrid: boolean;
    currentFloor: number;
    endLocation?: LocationSearchResult | null;
    startLocation?: LocationSearchResult | null;
    settings?: AccessibilitySettings;
}
export interface Route {
    destination: string;
    estimatedTime: string;
    accessibilityNotes: string;
    navigationInstructions: string;
    // estimatedDistance?: string;
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
    settings: {
        contrast: string;
        fontSize: string;
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
    endLocation?: LocationSearchResult | null;
    startLocation?: LocationSearchResult | null;
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
/**
 * Represents the result of a location search.
 * @interface LocationSearchResult
 * @property {('classroom' | 'bathroom' | 'elevator' | 'stairs' | 'fireEquipment' | 'utilityRoom' | 'coordinate')} type - The type of location.
 * @property {string} name - The name of the location.
 * @property {number} floor - The floor number where the location is situated.
 * @property {Coordinate} location - The coordinates of the location.
 * @property {string} [description] - Optional description of the location.
 */
export interface LocationSearchResult {
    type: 'classroom' | 'bathroom' | 'elevator' | 'stairs' | 'fireEquipment' | 'utilityRoom' | 'coordinate'| 'path';
    name: string;
    floor: number;
    location: Coordinate;
    description?: string;
}
export interface NavigationItem {
    name: string;
    coordinates: { x: number; y: number };
    icon: React.ReactNode;
}
export interface AddCustomNavigationButtonProps {
    onAdd: (item: NavigationItem) => void;
}
// Floor data arrays need to be imported at the top of the file
/**
 * Combined floor data for all floors in the building
 * Index corresponds to floor number - 1 (e.g., floor1Data is at index 0)
 */
export const allFloorData: FloorData[] = [floor1Data, floor2Data, floor3Data, floor4Data];
// Define props for MapLegend
export interface MapLegendProps {
    settings?: AccessibilitySettings;
}
export interface AccessibilityButtonProps {
    label: string;
    isActive: boolean;
    onClick: () => void;
    icon: React.ReactNode;
    description: string;
}
export const coordRegex = /(?:x\s*:\s*(\d+)\s*y\s*:\s*(\d+))|(?:\(?(\d+)\s*,\s*(\d+)\)?)/i;

// Update MapViewProps interface to include pathSegments
export interface pathSegmentsProps extends MapViewProps {
    pathSegments?: PathSegment[];
  }
/**
 * Props for the search field, onSearch returns full LocationSearchResult or null
 */
export interface LocationSearchFieldProps {
  onSearch: (result: LocationSearchResult | null) => void;
  currentFloor: number;
  setCurrentFloor?: (floor: number) => void;
  settings?: AccessibilitySettings;
}
export const isWheelchair: boolean = false;
