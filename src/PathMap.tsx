import React, { useState,  } from "react";
import { tileData, CellType } from "./components/ui/tileData"; // Import the tile data
import { Cell } from "./components/ui/mapComponents/Cell";
import WayfindingApp from "./components/ui/mapComponents/Layout";
import WayfindingApp3 from "./components/ui/mapComponents/Layout3";
import { Content } from "@radix-ui/react-accordion";
import { MapVisualization } from "./components/ui/mapComponents/MapVisualization";
import { MapGrid } from "./components/ui/mapComponents/MapGrid";

// Predefined map layout
const exampleLayout = Array.from({ length: 60 }, () => Array(60).fill(0)); // Initialize a 60x60 grid

// Example layout with specific areas
if (exampleLayout[0]) {
  exampleLayout[0][3] = 1; // Example classroom
}
if (exampleLayout[1]) exampleLayout[1][1] = 2; // Example stairs
if (exampleLayout[2]) exampleLayout[2][2] = 3; // Example bathroom
if (exampleLayout[3]) exampleLayout[3][3] = 4; // Example fire equipment
if (exampleLayout[4]) exampleLayout[4][4] = 5; // Example elevator
if (exampleLayout[5]) exampleLayout[5][5] = 6; // Example utility room
if (exampleLayout[6]) exampleLayout[6][6] = 7; // Example start
if (exampleLayout[7]) exampleLayout[7][7] = 8; // Example end

// Define the PathMapProps interface
interface PathMapProps {
  title?: string;
  onFindPath?: () => void;
  onReset?: () => void;
}

const PathMap: React.FC<PathMapProps> = ({
 
}) => {
  // Initialize grid
  const [grid, setGrid] = useState<CellType[][]>(() => {
    const initialGrid: CellType[][] = [];
    for (let row = 0; row < exampleLayout.length; row++) {
      const currentRow: CellType[] = [];
      for (let col = 0; col < (exampleLayout[row]?.length ?? 0); col++) {
        const terrainType = exampleLayout[row]?.[col];
        const tileKey = Object.keys(tileData)[terrainType] as keyof typeof tileData;
        const tileProps = tileData[tileKey];

        currentRow.push({
          ...tileProps,
          row: row,
          col: col,
          type: tileKey,
        });
      }
      initialGrid.push(currentRow);
    }
    return initialGrid;
  });

  const [selectionMode, setSelectionMode] = useState<"start" | "end" | "classroom" | "path" | "stairs" | "bathroom" | "fireEquipment" | "elevator" | "utilityRoom">("start");
  const [isDrawing, setIsDrawing] = useState<boolean>(false);

  const renderGrid = () => {
    return grid.map((row, rowIdx) =>
      row.map((cell, colIdx) => (
        <Cell
          key={`${rowIdx}-${colIdx}`}
          type={cell.type as keyof typeof tileData}
          // onMouseDown={() => handleMouseDown(rowIdx, colIdx)}
          // onMouseEnter={() => handleMouseMove(rowIdx, colIdx)}
          // onClick={() => handleCellClick(rowIdx, colIdx)}
        />
      ))
    );
  };

  const handleCellClick = (row: number, col: number) => {
    const newGrid = [...grid];
    // Update the clicked cell
    if (selectionMode === "start" || selectionMode === "end") {
      for (let r = 0; r < newGrid.length; r++) {
        for (let c = 0; c < (newGrid[0]?.length ?? 0); c++) {
          newGrid[r]?.[c];
        }
      }
    }
    const cell = newGrid[row]?.[col];
    if (!cell) return; // Safeguard against undefined

    setGrid(newGrid);
  };

  const handleMouseDown = (row: number, col: number) => {
    setIsDrawing(true);
    updateCell(row, col);
  };

  const handleMouseMove = (row: number, col: number) => {
    if (isDrawing) {
      updateCell(row, col);
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const updateCell = (row: number, col: number) => {
    setGrid((prevGrid) => {
      const newGrid = prevGrid.map((gridRow, rowIndex) =>
        gridRow.map((cell, colIndex) => {
          if (rowIndex === row && colIndex === col) {
            if (selectionMode === "start") {
              return { ...cell, isStart: true, isEnd: false, type: "start" };
            } else if (selectionMode === "end") {
              return { ...cell, isEnd: true, isStart: false, type: "end" };
            } else {
              return { ...cell, type: selectionMode };
            }
          }
          return cell;
        })
      );
      return newGrid;
    });
  };
  return (
    <>
    
    <WayfindingApp3 children={undefined}>
      
    </WayfindingApp3>
    {/* <WayfindingApp></WayfindingApp> */}
      {/* <Content>
        <MapVisualization onMouseUp={handleMouseUp}>
          <MapGrid> {renderGrid()}</MapGrid>
        </MapVisualization></Content> */}
        </>);
        };


export default PathMap;
