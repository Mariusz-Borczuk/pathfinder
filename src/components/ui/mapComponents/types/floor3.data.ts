import type { FloorData } from './types';

const floor3Data: FloorData = {
    classrooms: [
        { number: "301", start: { x: 49, y: 38 }, end: { x: 53, y: 47 }, entry: { x: 49, y: 42 } },
        { number: "302", start: { x: 49, y: 35 }, end: { x: 53, y: 36 }, entry: { x: 49, y: 35 } },
        { number: "303", start: { x: 49, y: 30 }, end: { x: 53, y: 32 }, entry: { x: 49, y: 31 } },
        { number: "304", start: { x: 49, y: 25 }, end: { x: 53, y: 27 }, entry: { x: 49, y: 26 } },
        { number: "305", start: { x: 49, y: 20 }, end: { x: 53, y: 22 }, entry: { x: 49, y: 21 } },
        { number: "306", start: { x: 49, y: 15 }, end: { x: 53, y: 17 }, entry: { x: 49, y: 16 } },
        { number: "307", start: { x: 49, y: 10 }, end: { x: 53, y: 12 }, entry: { x: 49, y: 11 } },
        { number: "308", start: { x: 49, y: 5 }, end: { x: 53, y: 7 }, entry: { x: 49, y: 6 } },
    ],
    elevators: [
        { start: { x: 10, y: 31 }, end: { x: 13, y: 33 }, entry: { x: 10, y: 32 } },
        { start: { x: 40, y: 31 }, end: { x: 43, y: 33 }, entry: { x: 40, y: 32 } },
    ],
    bathrooms: [
        { type: "Male", start: { x: 10, y: 16 }, end: { x: 15, y: 19 }, entry: { x: 10, y: 17 } },
        { type: "Female", start: { x: 39, y: 16 }, end: { x: 44, y: 19 }, entry: { x: 44, y: 17 } },
    ],
    fireEquipment: [
        { location: { x: 13, y: 10 } },
        { location: { x: 22, y: 44 } },
        { location: { x: 42, y: 10 } },
    ],
    utilityRooms: [
        { name: "Storage", start: { x: 16, y: 25 }, end: { x: 38, y: 14 } },
        { name: "Server Room", start: { x: 16, y: 10 }, end: { x: 38, y: 13 } },
    ],
    stairs: [
        { start: { x: 10, y: 10 }, end: { x: 12, y: 12 } },
        { start: { x: 41, y: 10 }, end: { x: 43, y: 12 } },
    ],
    paths: [
        { start: { x: 7, y: 2 }, end: { x: 9, y: 50 } },
        { start: { x: 10, y: 7 }, end: { x: 41, y: 9 } },
        { start: { x: 20, y: 43 }, end: { x: 45, y: 44 } },
        { start: { x: 39, y: 9 }, end: { x: 48, y: 3 } },
        { start: { x: 46, y: 8 }, end: { x: 54, y: 13 } },
        { start: { x: 46, y: 12 }, end: { x: 48, y: 50 } },
    ],
};

export default floor3Data; 