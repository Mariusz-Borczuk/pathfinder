import React from 'react';
import { tileData } from './tileData';
import type { CellType } from './tileData';
import floor1Data from './notused/floor1.data';
import { MapLegend } from './MapLegend';

interface FloorGridProps {
    showGrid: boolean;
}

const createEmptyCell = (row: number, col: number): CellType => ({
    row,
    col,
    type: 'empty',
    color: '#ffffff',
    label: '',
});

export const FloorGrid: React.FC<FloorGridProps> = ({ showGrid }) => {
    const gridSize = 60;

    // Create initial grid with empty cells
    const initialGrid: CellType[][] = Array.from({ length: gridSize }, (_, row) =>
        Array.from({ length: gridSize }, (_, col) => createEmptyCell(row, col))
    );

    // Safe method to update grid cells
    const updateGridCell = (grid: CellType[][], row: number, col: number, cell: CellType): CellType[][] => {
        const newGrid = grid.map(row => [...row]);
        const targetRow = newGrid[row];
        if (row >= 0 && row < newGrid.length && col >= 0 && targetRow && col < targetRow.length) {
            targetRow[col] = { ...cell };
        }
        return newGrid;
    };

    // Add all classrooms to the grid
    const gridWithClassrooms = floor1Data.classrooms.reduce((grid, classroom) => {
        let updatedGrid = grid;

        // Fill classroom area
        for (let row = Math.min(classroom.start.y, classroom.end.y); row <= Math.max(classroom.start.y, classroom.end.y); row++) {
            for (let col = Math.min(classroom.start.x, classroom.end.x); col <= Math.max(classroom.start.x, classroom.end.x); col++) {
                updatedGrid = updateGridCell(updatedGrid, row, col, {
                    row,
                    col,
                    type: 'classroom',
                    color: tileData.classroom.color,
                    label: classroom.number,
                });
            }
        }

        // Add entry point
        updatedGrid = updateGridCell(updatedGrid, classroom.entry.y, classroom.entry.x, {
            row: classroom.entry.y,
            col: classroom.entry.x,
            type: 'entry',
            color: tileData.entry.color,
            label: `${classroom.number}-E`,
        });

        return updatedGrid;
    }, initialGrid);

    // Add bathrooms
    const gridWithBathrooms = floor1Data.bathrooms.reduce((grid, bathroom) => {
        let updatedGrid = grid;

        for (let row = Math.min(bathroom.start.y, bathroom.end.y); row <= Math.max(bathroom.start.y, bathroom.end.y); row++) {
            for (let col = Math.min(bathroom.start.x, bathroom.end.x); col <= Math.max(bathroom.start.x, bathroom.end.x); col++) {
                updatedGrid = updateGridCell(updatedGrid, row, col, {
                    row,
                    col,
                    type: 'bathroom',
                    color: tileData.bathroom.color,
                    label: `${bathroom.type} Bathroom`,
                });
            }
        }
        return updatedGrid;
    }, gridWithClassrooms);

    // Add elevators
    const gridWithElevators = floor1Data.elevators.reduce((grid, elevator) => {
        let updatedGrid = grid;

        for (let row = Math.min(elevator.start.y, elevator.end.y); row <= Math.max(elevator.start.y, elevator.end.y); row++) {
            for (let col = Math.min(elevator.start.x, elevator.end.x); col <= Math.max(elevator.start.x, elevator.end.x); col++) {
                updatedGrid = updateGridCell(updatedGrid, row, col, {
                    row,
                    col,
                    type: 'elevator',
                    color: tileData.elevator.color,
                    label: 'Elevator',
                });
            }
        }
        return updatedGrid;
    }, gridWithBathrooms);

    // Add utility rooms
    const gridWithUtility = floor1Data.utilityRooms.reduce((grid, room) => {
        let updatedGrid = grid;

        for (let row = Math.min(room.start.y, room.end.y); row <= Math.max(room.start.y, room.end.y); row++) {
            for (let col = Math.min(room.start.x, room.end.x); col <= Math.max(room.start.x, room.end.x); col++) {
                updatedGrid = updateGridCell(updatedGrid, row, col, {
                    row,
                    col,
                    type: 'utility',
                    color: tileData.utilityRoom.color,
                    label: room.name,
                });
            }
        }
        return updatedGrid;
    }, gridWithElevators);

    // Add stairs
    const gridWithStairs = floor1Data.stairs.reduce((grid, stair) => {
        let updatedGrid = grid;

        for (let row = Math.min(stair.start.y, stair.end.y); row <= Math.max(stair.start.y, stair.end.y); row++) {
            for (let col = Math.min(stair.start.x, stair.end.x); col <= Math.max(stair.start.x, stair.end.x); col++) {
                updatedGrid = updateGridCell(updatedGrid, row, col, {
                    row,
                    col,
                    type: 'stairs',
                    color: tileData.stairs.color,
                    label: 'Stairs',
                });
            }
        }
        return updatedGrid;
    }, gridWithUtility);

    // Add fire equipment
    const gridWithFire = floor1Data.fireEquipment.reduce((grid, equipment) => {
        return updateGridCell(grid, equipment.location.y, equipment.location.x, {
            row: equipment.location.y,
            col: equipment.location.x,
            type: 'fireEquipment',
            color: tileData.fireEquipment.color,
            label: 'Fire Equipment',
        });
    }, gridWithStairs);

    // Add paths last to not override other elements
    const finalGrid = floor1Data.paths.reduce((grid, path) => {
        let updatedGrid = grid;

        for (let row = Math.min(path.start.y, path.end.y); row <= Math.max(path.start.y, path.end.y); row++) {
            for (let col = Math.min(path.start.x, path.end.x); col <= Math.max(path.start.x, path.end.x); col++) {
                const currentCell = updatedGrid[row]?.[col];
                if (currentCell && currentCell.type === 'empty') {
                    updatedGrid = updateGridCell(updatedGrid, row, col, {
                        row,
                        col,
                        type: 'path',
                        color: tileData.path.color,
                        label: 'path',
                    });
                }
            }
        }

        return updatedGrid;
    }, gridWithFire);

    
    return (
        <div className="p-4">
            <div className={`inline-block border border-gray-200 bg-white ${showGrid ? 'border-2 border-gray-400' : ''}`}>
                <div className="grid" style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
                    gap: showGrid ? '1px' : '0px',
                    backgroundColor: showGrid ? 'white' : 'transparent',
                }}>
                    {finalGrid.map((row, rowIndex) =>
                        row.map((cell: CellType, colIndex) => (
                            <div
                                key={`${rowIndex}-${colIndex}`}
                                className="w-3 h-3"
                                style={{
                                    backgroundColor: cell.color,
                                    border: showGrid ? '1px solid white' : 'none',
                                }}
                                title={cell.label ? `${cell.label} (${colIndex}, ${rowIndex})` : `(${colIndex}, ${rowIndex})`}
                            />
                        ))
                    )}
                </div>
            </div>
            <MapLegend />
        </div>
    );
};

export default FloorGrid;
