
type CellType = {
    row: number;
    col: number;
  };
  
export const tileData = {
    classroom: { color: "#F9A800", label: "Classroom", type: "classroom", position: { row: 0, col: 0 } as CellType },
    path: { color: "#e0e0e0", label: "Path", type: "path", position: { row: 0, col: 0 } as CellType },
    stairs: { color: "#247F52", label: "Stairs", type: "stairs", position: { row: 0, col: 0 } as CellType },
    bathroom: { color: "#1E2460", label: "Bathroom", type: "bathrooms", position: { row: 0, col: 0 } as CellType },
    fireEquipment: {
        color: "#9B2423",
        label: "Fire Equipment",
        type: "fireEquipment",
        position: { row: 0, col: 0 } as CellType,
    },
    elevator: { color: "#82209E", label: "Elevator", type: "elevator", position: { row: 0, col: 0 } as CellType },
    utilityRoom: { color: "#6A8CA3", label: "Utility Room", type: "utility", position: { row: 0, col: 0 } as CellType },
    start: { color: "#34C759", label: "Start", type: "start", position: { row: 0, col: 0 } as CellType },
    end: { color: "#FF3737", label: "End", type: "end", position: { row: 0, col: 0 } as CellType },
};