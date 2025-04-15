import React from 'react';
import { floor1Data } from '../../types/floor1.data';
import { floor2Data } from '../../types/floor2.data';
import { floor3Data } from '../../types/floor3.data';
import { floor4Data } from '../../types/floor4.data';
import type { CellType } from '../../types/tileData';
import { tileData } from '../../types/tileData';
import * as types from '../../types/types';
import { FloorGridProps } from '../../types/types';
import { MapLegend } from './MapLegend';


const floorData: types.FloorData[] = [floor1Data, floor2Data, floor3Data, floor4Data];

export const FloorGrid: React.FC<FloorGridProps> = ({ showGrid, currentFloor }) => {
    const gridSize = 60;

    // Validate currentFloor and get floor data
    const floorIndex = currentFloor - 1;
    
    if (floorIndex < 0 || floorIndex >= floorData.length) {
        console.error(`Invalid floor number: ${currentFloor}. Available floors: 1-${floorData.length}`);
        return (
            <div className="p-4 text-red-500">
                Invalid floor number. Please select a floor between 1 and {floorData.length}.
            </div>
        );
    }
    
    // We've validated the index, so the floor data must exist
    const currentFloorData = floorData[floorIndex]!;

    // Create initial grid with empty cells
    const initialGrid: CellType[][] = Array.from({ length: gridSize }, (_, row) =>
        Array.from({ length: gridSize }, (_, col) => ({
            row,
            col,
            type: 'empty',
            color: '#ffffff',
            label: '',
        }))
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

    // Add classroom entries (supporting both single entry and array of entries)
    const gridWithClassrooms = currentFloorData.classrooms.reduce((grid: CellType[][], classroom: types.Room) => {
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

        // Skip adding entry points if no entry is defined
        if (!classroom.entry) {
            return updatedGrid;
        }

        // Handle entry points based on type
        if (Array.isArray(classroom.entry)) {
            // Handle multiple entries
            classroom.entry.forEach((entry, index) => {
                updatedGrid = updateGridCell(updatedGrid, entry.y, entry.x, {
                    row: entry.y,
                    col: entry.x,
                    type: 'entry',
                    color: tileData.entry.color,
                    label: `${classroom.number}-E${index + 1}`,
                });
            });
        } else {
            // Handle single entry
            updatedGrid = updateGridCell(updatedGrid, classroom.entry.y, classroom.entry.x, {
                row: classroom.entry.y,
                col: classroom.entry.x,
                type: 'entry',
                color: tileData.entry.color,
                label: `${classroom.number}-E`,
            });
        }

        return updatedGrid;
    }, initialGrid);

    // Add bathrooms
    const gridWithBathrooms = currentFloorData.bathrooms.reduce((grid: CellType[][], bathroom: types.Bathroom) => {
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
    const gridWithElevators = currentFloorData.elevators.reduce((grid: CellType[][], elevator: types.Elevator) => {
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
    const gridWithUtility = currentFloorData.utilityRooms.reduce((grid: CellType[][], room: types.UtilityRoom) => {
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
    const gridWithStairs = currentFloorData.stairs.reduce((grid: CellType[][], stair: types.Stair) => {
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
    const gridWithFire = currentFloorData.fireEquipment.reduce((grid: CellType[][], equipment: types.FireEquipment) => {
        return updateGridCell(grid, equipment.location.y, equipment.location.x, {
            row: equipment.location.y,
            col: equipment.location.x,
            type: 'fireEquipment',
            color: tileData.fireEquipment.color,
            label: 'Fire Equipment',
        });
    }, gridWithStairs);

    // Add paths last to not override other elements
    const finalGrid = currentFloorData.paths.reduce((grid: CellType[][], path: types.Path) => {
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
                    {finalGrid.map((row: CellType[], rowIndex: number) =>
                        row.map((cell: CellType, colIndex: number) => {
                            // Check if the cell needs a border by checking adjacent cells
                            const topCell = finalGrid[rowIndex - 1]?.[colIndex];
                            const bottomCell = finalGrid[rowIndex + 1]?.[colIndex];
                            const leftCell = finalGrid[rowIndex]?.[colIndex - 1];
                            const rightCell = finalGrid[rowIndex]?.[colIndex + 1];
                            
                            // Add borders between different types OR between cells of the same type but different labels (e.g., different classrooms)
                            const needsTopBorder = rowIndex > 0 && topCell && (
                                topCell.type !== cell.type || 
                                (topCell.type === 'classroom' && cell.type === 'classroom' && topCell.label !== cell.label)
                            );
                            const needsBottomBorder = rowIndex < gridSize - 1 && bottomCell && (
                                bottomCell.type !== cell.type || 
                                (bottomCell.type === 'classroom' && cell.type === 'classroom' && bottomCell.label !== cell.label)
                            );
                            const needsLeftBorder = colIndex > 0 && leftCell && (
                                leftCell.type !== cell.type || 
                                (leftCell.type === 'classroom' && cell.type === 'classroom' && leftCell.label !== cell.label)
                            );
                            const needsRightBorder = colIndex < gridSize - 1 && rightCell && (
                                rightCell.type !== cell.type || 
                                (rightCell.type === 'classroom' && cell.type === 'classroom' && rightCell.label !== cell.label)
                            );
                            
                            // Only show borders where needed
                            const borderTop = needsTopBorder ? '1px solid #333' : 'none';
                            const borderBottom = needsBottomBorder ? '1px solid #333' : 'none';
                            const borderLeft = needsLeftBorder ? '1px solid #333' : 'none';
                            const borderRight = needsRightBorder ? '1px solid #333' : 'none';
                            
                            return (
                                <div
                                    key={`${rowIndex}-${colIndex}`}
                                    className="w-3 h-3"
                                    style={{
                                        backgroundColor: cell.color,
                                        borderTop: borderTop,
                                        borderBottom: borderBottom,
                                        borderLeft: borderLeft,
                                        borderRight: borderRight,
                                    }}
                                    title={cell.label ? `${cell.label} (${colIndex}, ${rowIndex})` : `(${colIndex}, ${rowIndex})`}
                                />
                            );
                        })
                    )}
                </div>
            </div>
            <MapLegend />
        </div>
    );
};