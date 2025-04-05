interface Coordinate {
    x: number;
    y: number;
}

interface Room {
    number: string;
    start: Coordinate;
    end: Coordinate;
    entry: Coordinate;
}

interface Elevator {
    start: Coordinate;
    end: Coordinate;
    entry: Coordinate;
}

interface Bathroom {
    type: 'Male' | 'Female';
    start: Coordinate;
    end: Coordinate;
    entry: Coordinate;
}

interface FireEquipment {
    location: Coordinate;
}

interface UtilityRoom {
    name: string;
    start: Coordinate;
    end: Coordinate;
}

interface Stair {
    start: Coordinate;
    end: Coordinate;
}

interface Path {
    start: Coordinate;
    end: Coordinate;
}

interface FloorData {
    classrooms: Room[];
    elevators: Elevator[];
    bathrooms: Bathroom[];
    fireEquipment: FireEquipment[];
    utilityRooms: UtilityRoom[];
    stairs: Stair[];
    paths: Path[];
}

type CellType = "path" | "classroom" | "start" | "end" | "elevator" | "bathroom" | "fireEquipment" | "utilityRoom" | "stair" | "empty";

const gridSize = 60;

const createGridMap = (floorData: FloorData): CellType[][] => {
    const grid: CellType[][] = Array.from({ length: gridSize }, () =>
        Array.from({ length: gridSize }, () => "empty")
    );

    // Mark classrooms
    floorData.classrooms.forEach((room) => {
        for (let x = room.start.x; x <= room.end.x; x++) {
            for (let y = room.start.y; y <= room.end.y; y++) {
                grid[y][x] = "classroom";
            }
        }
        if (grid[room.entry.y] && grid[room.entry.y][room.entry.x] !== undefined) {
            grid[room.entry.y][room.entry.x] = "start";
        }
    });

    // Mark elevators
    floorData.elevators.forEach((elevator) => {
        for (let x = elevator.start.x; x <= elevator.end.x; x++) {
            for (let y = elevator.start.y; y <= elevator.end.y; y++) {
                grid[y][x] = "elevator";
            }
        }
        grid[elevator.entry.y][elevator.entry.x] = "start";
    });

    // Mark bathrooms
    floorData.bathrooms.forEach((bathroom) => {
        for (let x = bathroom.start.x; x <= bathroom.end.x; x++) {
            for (let y = bathroom.start.y; y <= bathroom.end.y; y++) {
                grid[y][x] = "bathroom";
            }
        }
        grid[bathroom.entry.y][bathroom.entry.x] = "start";
    });

    // Mark fire equipment
    floorData.fireEquipment.forEach((equipment) => {
        grid[equipment.location.y][equipment.location.x] = "fireEquipment";
    });

    // Mark utility rooms
    floorData.utilityRooms.forEach((room) => {
        for (let x = room.start.x; x <= room.end.x; x++) {
            for (let y = room.start.y; y <= room.end.y; y++) {
                grid[y][x] = "utilityRoom";
            }
        }
    });

    // Mark stairs
    floorData.stairs.forEach((stair) => {
        for (let x = stair.start.x; x <= stair.end.x; x++) {
            for (let y = stair.start.y; y <= stair.end.y; y++) {
                grid[y][x] = "stair";
            }
        }
    });

    // Mark paths
    floorData.paths.forEach((path) => {
        for (let x = path.start.x; x <= path.end.x; x++) {
            for (let y = path.start.y; y <= path.end.y; y++) {
                if ((grid[y] ?? [])[x] !== undefined) {
                    if (grid[y]) {
                        grid[y][x] = "path";
                    }
                }
            }
        }
    });

    return grid;
};

const floor1Data: FloorData = {
    classrooms: [
        { number: "115", start: { x: 2, y: 2 }, end: { x: 6, y: 9 }, entry: { x: 6, y: 7 } },
        { number: "116", start: { x: 2, y: 11 }, end: { x: 6, y: 13 }, entry: { x: 6, y: 12 } },
        { number: "117", start: { x: 2, y: 14 }, end: { x: 6, y: 16 }, entry: { x: 6, y: 15 } },
        { number: "118", start: { x: 2, y: 18 }, end: { x: 6, y: 19 }, entry: { x: 6, y: 19 } },
        { number: "118a", start: { x: 2, y: 21 }, end: { x: 6, y: 22 }, entry: { x: 6, y: 22 } },
        { number: "119", start: { x: 2, y: 24 }, end: { x: 6, y: 26 }, entry: { x: 6, y: 26 } },
        { number: "119a", start: { x: 2, y: 28 }, end: { x: 6, y: 31 }, entry: { x: 6, y: 29 } },
        { number: "119b", start: { x: 2, y: 33 }, end: { x: 6, y: 34 }, entry: { x: 6, y: 34 } },
        { number: "120", start: { x: 2, y: 36 }, end: { x: 6, y: 37 }, entry: { x: 6, y: 37 } },
        { number: "121", start: { x: 2, y: 39 }, end: { x: 6, y: 45 }, entry: { x: 6, y: 42 } },
        { number: "122", start: { x: 2, y: 47 }, end: { x: 6, y: 48 }, entry: { x: 6, y: 48 } },
        { number: "125", start: { x: 10, y: 40 }, end: { x: 14, y: 44 }, entry: { x: 10, y: 42 } },
        { number: "124", start: { x: 10, y: 46 }, end: { x: 14, y: 50 }, entry: { x: 10, y: 47 } },
        { number: "114", start: { x: 12, y: 2 }, end: { x: 13, y: 6 }, entry: { x: 12, y: 6 } },
        { number: "113", start: { x: 15, y: 2 }, end: { x: 24, y: 6 }, entry: { x: 16, y: 6 } },
        { number: "112a", start: { x: 26, y: 2 }, end: { x: 34, y: 6 }, entry: { x: 28, y: 6 } },
        { number: "112", start: { x: 36, y: 2 }, end: { x: 37, y: 6 }, entry: { x: 36, y: 6 } },
        { number: "107", start: { x: 49, y: 18 }, end: { x: 53, y: 19 }, entry: { x: 49, y: 18 } },
        { number: "106", start: { x: 49, y: 21 }, end: { x: 53, y: 23 }, entry: { x: 49, y: 22 } },
        { number: "105", start: { x: 49, y: 25 }, end: { x: 53, y: 26 }, entry: { x: 49, y: 25 } },
        { number: "104", start: { x: 49, y: 28 }, end: { x: 53, y: 29 }, entry: { x: 49, y: 28 } },
        { number: "103", start: { x: 49, y: 31 }, end: { x: 53, y: 33 }, entry: { x: 49, y: 32 } },
        { number: "102", start: { x: 49, y: 35 }, end: { x: 53, y: 36 }, entry: { x: 49, y: 35 } },
        { number: "101", start: { x: 49, y: 38 }, end: { x: 53, y: 17 }, entry: { x: 49, y: 42 } },
        { number: "139", start: { x: 20, y: 40 }, end: { x: 22, y: 42 }, entry: { x: 21, y: 42 } },
        { number: "138", start: { x: 24, y: 40 }, end: { x: 26, y: 42 }, entry: { x: 25, y: 42 } },
        { number: "137", start: { x: 28, y: 40 }, end: { x: 30, y: 42 }, entry: { x: 29, y: 42 } },
        { number: "136", start: { x: 32, y: 40 }, end: { x: 34, y: 42 }, entry: { x: 33, y: 42 } },
        { number: "135", start: { x: 36, y: 40 }, end: { x: 38, y: 42 }, entry: { x: 37, y: 42 } },
        { number: "134", start: { x: 40, y: 40 }, end: { x: 44, y: 42 }, entry: { x: 42, y: 42 } },
        { number: "141", start: { x: 20, y: 45 }, end: { x: 22, y: 50 }, entry: { x: 21, y: 45 } },
        { number: "142", start: { x: 24, y: 45 }, end: { x: 27, y: 50 }, entry: { x: 25, y: 45 } },
        { number: "143", start: { x: 29, y: 45 }, end: { x: 34, y: 50 }, entry: { x: 32, y: 45 } },
        { number: "144", start: { x: 36, y: 45 }, end: { x: 38, y: 50 }, entry: { x: 37, y: 45 } },
        { number: "145", start: { x: 40, y: 45 }, end: { x: 44, y: 50 }, entry: { x: 43, y: 45 } },
    ],
    elevators: [
        { start: { x: 10, y: 31 }, end: { x: 13, y: 33 }, entry: { x: 10, y: 32 } },
    ],
    bathrooms: [
        { type: "Male", start: { x: 10, y: 16 }, end: { x: 15, y: 19 }, entry: { x: 10, y: 17 } },
        { type: "Female", start: { x: 39, y: 16 }, end: { x: 44, y: 19 }, entry: { x: 44, y: 17 } },
    ],
    fireEquipment: [
        { location: { x: 7, y: 46 } },
        { location: { x: 7, y: 28 } },
        { location: { x: 9, y: 8 } },
        { location: { x: 13, y: 10 } },
        { location: { x: 27, y: 7 } },
        { location: { x: 45, y: 6 } },
        { location: { x: 45, y: 13 } },
        { location: { x: 45, y: 20 } },
        { location: { x: 47, y: 44 } },
        { location: { x: 35, y: 44 } },
        { location: { x: 22, y: 44 } },
    ],
    utilityRooms: [
        { name: "GYM", start: { x: 16, y: 25 }, end: { x: 38, y: 14 } },
        { name: "Changing room", start: { x: 16, y: 10 }, end: { x: 38, y: 13 } },
    ],
    stairs: [
        { start: { x: 10, y: 10 }, end: { x: 12, y: 12 } },
        { start: { x: 41, y: 10 }, end: { x: 43, y: 12 } },
    ],
    paths: [
        { start: { x: 7, y: 2 }, end: { x: 9, y: 50 } },
        { start: { x: 8, y: 2 }, end: { x: 11, y: 9 } },
        { start: { x: 10, y: 21 }, end: { x: 15, y: 22 } },
        { start: { x: 12, y: 8 }, end: { x: 41, y: 9 } },
        { start: { x: 39, y: 7 }, end: { x: 45, y: 3 } },
        { start: { x: 46, y: 8 }, end: { x: 54, y: 11 } },
        { start: { x: 46, y: 12 }, end: { x: 48, y: 50 } },
        { start: { x: 55, y: 14 }, end: { x: 53, y: 12 } },
    ],
};

export const floor1GridMap = createGridMap(floor1Data);

export default floor1Data;