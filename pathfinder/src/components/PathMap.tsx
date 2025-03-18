import React, { useState, useEffect,  } from "react";
import { tileData, CellType, TileType } from "./tileData"; // Import the tile data
import { MapGrid } from "./mapComponents/MapGrid";
import { Cell } from "./mapComponents/Cell";
import { PathMapContainer } from "./mapComponents/PathMapContainer";
import { Header } from "./mapComponents/Header";
import { Title } from "./mapComponents/Title";
import { MapVisualization } from "./mapComponents/MapVisualization";
import { Legend,LegendItem ,ColorSquare,LegendText} from "./mapComponents/Legend";
import { SelectionControls } from "./mapComponents/SelectionControls";
import { RadioControl, RadioLabel } from "./mapComponents/RadioControl";
import { ResultText,ResultValue,Results } from "./mapComponents/Results";
import { Content } from "./mapComponents/Content";

// Predefined map layout
const exampleLayout = Array.from({ length: 60 }, () => Array(60).fill(0)); // Initialize a 60x60 grid

// Example layout with specific areas
exampleLayout[0][3] = 1; // Example classroom
exampleLayout[1][1] = 2; // Example stairs
exampleLayout[2][2] = 3; // Example bathroom
exampleLayout[3][3] = 4; // Example fire equipment
exampleLayout[4][4] = 5; // Example elevator
exampleLayout[5][5] = 6; // Example utility room
exampleLayout[6][6] = 7; // Example start
exampleLayout[7][7] = 8; // Example end

// Define the PathMapProps interface
interface PathMapProps {
  title?: string;
  onFindPath?: () => void;
  onReset?: () => void;
}

const PathMap: React.FC<PathMapProps> = ({
  title = "Path Map",
  onFindPath,
  onReset,
}) => {
  // Initialize grid
  const [grid, setGrid] = useState<CellType[][]>(() => {
    const initialGrid: CellType[][] = [];
    for (let row = 0; row < 60; row++) {
      const currentRow: CellType[] = [];
      for (let col = 0; col < 60; col++) {
        const terrainType = exampleLayout[row][col];
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
          onMouseDown={() => handleMouseDown(rowIdx, colIdx)}
          onMouseEnter={() => handleMouseMove(rowIdx, colIdx)}
          onClick={() => handleCellClick(rowIdx, colIdx)}
        />
      ))
    );
  };

  const handleCellClick = (row: number, col: number) => {
    const newGrid = [...grid];
    // Update the clicked cell
    if (selectionMode === "start" || selectionMode === "end") {
      for (let r = 0; r < newGrid.length; r++) {
        for (let c = 0; c < newGrid[0].length; c++) {
          newGrid[r][c];
        }
      }
    }
    const cell = newGrid[row][col];

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
    <div className={"text-[28px] font-bold text-[#333333] m-0"}>
      <PathMapContainer>
        <Header>
          <Title>{title}</Title>
        </Header>

        <Content>
          <MapVisualization onMouseUp={handleMouseUp}>
            <MapGrid>{renderGrid()}</MapGrid>
          </MapVisualization>

         <Legend>
            {Object.entries(tileData).map(([key, value]) => (
              <LegendItem key={key} label={value.label} bgColor={value.color} />
            ))}
          </Legend>

          <SelectionControls>
            <RadioControl>
              <input
                type="radio"
                id="startMode"
                name="selectionMode"
                checked={selectionMode === "start"}
                onChange={() => setSelectionMode("start")}
                aria-label="Set Start mode"
              />
              <RadioLabel htmlFor="startMode">Set Start</RadioLabel>
            </RadioControl>

            <RadioControl>
              <input
                type="radio"
                id="endMode"
                name="selectionMode"
                checked={selectionMode === "end"}
                onChange={() => setSelectionMode("end")}
                aria-label="Set End mode"
              />
              <RadioLabel htmlFor="endMode">Set End</RadioLabel>
            </RadioControl>

            {Object.entries(tileData).map(([key, value]) => (
              <RadioControl key={key}>
                <input
                  type="radio"
                  id={`${key}Mode`}
                  name="selectionMode"
                  checked={selectionMode === key}
                  onChange={() => setSelectionMode(key as keyof typeof tileData)}
                  aria-label={`Set ${value.label} mode`}
                />
                <RadioLabel htmlFor={`${key}Mode`}>Set {value.label}</RadioLabel>
              </RadioControl>
            ))}
          </SelectionControls>
        </Content>
      </PathMapContainer>
    </div>
  );
};

//     // Update the clicked cell
//     setGrid(newGrid);

//   const handleMouseDown = (row: number, col: number) => {
//     setIsDrawing(true);
//     updateCell(row, col);
//   };

//   const handleMouseMove = (row: number, col: number) => {
//     if (isDrawing) {
//       updateCell(row, col);
//     }
//   };

//   const handleMouseUp = () => {
//     setIsDrawing(false);
//   };

//   const updateCell = (row: number, col: number) => {
//     const newGrid = [...grid];
//     const cell = newGrid[row][col];

//     // Update the cell based on the current selection mode
//     if (selectionMode === "start") {
//       cell.isStart = true;
//       cell.isEnd = false;
//     } else if (selectionMode === "end") {
//       cell.isEnd = true;
//       cell.isStart = false;
//     } else {
//       cell.type = selectionMode;
//     }

//     setGrid(newGrid);
//   };

//   return (
//     <div className={"text-[28px] font-bold text-[#333333] m-0"}>
//       <PathMapContainer>
//         <Header>
//           <Title>{title}</Title>
//         </Header>

//         <Content>
//           <MapVisualization onMouseUp={handleMouseUp}>
//             <MapGrid>
//               {grid.map((row, rowIdx) =>
//                 row.map((cell, colIdx) => (
//                   <Cell
//                     key={`${rowIdx}-${colIdx}`}
//                     isClassroom={cell.isClassroom}
//                     isStairs={cell.isStairs}
//                     isBathroom={cell.isBathroom}
//                     isFireEquipment={cell.isFireEquipment}
//                     isElevator={cell.isElevator}
//                     isUtilityRoom={cell.isUtilityRoom}
//                     isStart={cell.isStart}
//                     isEnd={cell.isEnd}
//                     onMouseDown={() => handleMouseDown(rowIdx, colIdx)}
//                     onMouseEnter={() => handleMouseMove(rowIdx, colIdx)}
//                     onClick={() => handleCellClick(rowIdx, colIdx)}
//                   />
//                 ))
//               )}
//             </MapGrid>
//           </MapVisualization>

//           <Legend>
//             {Object.entries(tileData).map(([key, value]) => (
//               <LegendItem key={key}>
//                 <ColorSquare bgColor={value.color} />
//                 <LegendText>{value.label}</LegendText>
//               </LegendItem>
//             ))}
//           </Legend>

//           <SelectionControls>
//             <RadioControl>
//               <input
//                 type="radio"
//                 id="startMode"
//                 name="selectionMode"
//                 checked={selectionMode === "start"}
//                 onChange={() => setSelectionMode("start")}
//                 aria-label="Set Start mode"
//               />
//               <RadioLabel htmlFor="startMode">Set Start</RadioLabel>
//             </RadioControl>

//             <RadioControl>
//               <input
//                 type="radio"
//                 id="endMode"
//                 name="selectionMode"
//                 checked={selectionMode === "end"}
//                 onChange={() => setSelectionMode("end")}
//                 aria-label="Set End mode"
//               />
//               <RadioLabel htmlFor="endMode">Set End</RadioLabel>
//             </RadioControl>

//             {Object.entries(tileData).map(([key, value]) => (
//               <RadioControl key={key}>
//                 <input
//                   type="radio"
//                   id={`${key}Mode`}
//                   name="selectionMode"
//                   checked={selectionMode === key}
//                   onChange={() => setSelectionMode(key as keyof typeof tileData)}
//                   aria-label={`Set ${value.label} mode`}
//                 />
//                 <RadioLabel htmlFor={`${key}Mode`}>Set {value.label}</RadioLabel>
//               </RadioControl>
//             ))}
//           </SelectionControls>
//         </Content>
//       </PathMapContainer>
//     </div>
//   );
// };

export default PathMap;
