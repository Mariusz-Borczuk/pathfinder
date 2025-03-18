
export type CellType = {
    row: number;
    col: number;
    type: string;
    color: string;
    label: string;
  };
  
export const tileData = {
    classroom: { color: "#F9A800", label: "Classroom", type: "classroom", row: 0, col: 0 },
    path: { color: "#e0e0e0", label: "Path", type: "path", row: 0, col: 0 },
    stairs: { color: "#247F52", label: "Stairs", type: "stairs", row: 0, col: 0 },
    bathroom: { color: "#1E2460", label: "Bathroom", type: "bathrooms", row: 0, col: 0 },
    fireEquipment: { color: "#9B2423", label: "Fire Equipment", type: "fireEquipment", row: 0, col: 0 },
    elevator: { color: "#82209E", label: "Elevator", type: "elevator", row: 0, col: 0 },
    utilityRoom: { color: "#6A8CA3", label: "Utility Room", type: "utility", row: 0, col: 0 },
    start: { color: "#34C759", label: "Start", type: "start", row: 0, col: 0 },
    end: { color: "#FF3737", label: "End", type: "end", row: 0, col: 0 },
};
export type TileType = typeof tileData[keyof typeof tileData];
export const tileDataArray = Object.values(tileData);
export const tileDataMap = new Map<string, typeof tileData[keyof typeof tileData]>(Object.entries(tileData));
