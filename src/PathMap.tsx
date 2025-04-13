import React from "react";
import { PathMapProps } from "./components/types/types";
import WayfindingApp3 from "./components/ui/layouts/Layout3";


const PathMap: React.FC<PathMapProps> = ({
 
}) => {

  // const [selectionMode, setSelectionMode] = useState<"start" | "end" | "classroom" | "path" | "stairs" | "bathroom" | "fireEquipment" | "elevator" | "utilityRoom">("start");
  // const [isDrawing, setIsDrawing] = useState<boolean>(false);

  // const renderGrid = () => {
  //   return grid.map((row, rowIdx) =>
  //     row.map((cell, colIdx) => (
  //       <Cell
  //         key={`${rowIdx}-${colIdx}`}
  //         type={cell.type as keyof typeof tileData}
  //         // onMouseDown={() => handleMouseDown(rowIdx, colIdx)}
  //         // onMouseEnter={() => handleMouseMove(rowIdx, colIdx)}
  //         // onClick={() => handleCellClick(rowIdx, colIdx)}
  //       />
  //     ))
  //   );
  // };

  // const handleCellClick = (row: number, col: number) => {
  //   const newGrid = [...grid];
  //   // Update the clicked cell
  //   if (selectionMode === "start" || selectionMode === "end") {
  //     for (let r = 0; r < newGrid.length; r++) {
  //       for (let c = 0; c < (newGrid[0]?.length ?? 0); c++) {
  //         newGrid[r]?.[c];
  //       }
  //     }
  //   }
  //   const cell = newGrid[row]?.[col];
  //   if (!cell) return; // Safeguard against undefined

  //   setGrid(newGrid);
  // };

  // const handleMouseDown = (row: number, col: number) => {
  //   setIsDrawing(true);
  //   updateCell(row, col);
  // };

  // const handleMouseMove = (row: number, col: number) => {
  //   if (isDrawing) {
  //     updateCell(row, col);
  //   }
  // };

  // const handleMouseUp = () => {
  //   setIsDrawing(false);
  // };

  // const updateCell = (row: number, col: number) => {
  //   setGrid((prevGrid) => {
  //     const newGrid = prevGrid.map((gridRow, rowIndex) =>
  //       gridRow.map((cell, colIndex) => {
  //         if (rowIndex === row && colIndex === col) {
  //           if (selectionMode === "start") {
  //             return { ...cell, isStart: true, isEnd: false, type: "start" };
  //           } else if (selectionMode === "end") {
  //             return { ...cell, isEnd: true, isStart: false, type: "end" };
  //           } else {
  //             return { ...cell, type: selectionMode };
  //           }
  //         }
  //         return cell;
  //       })
  //     );
  //     return newGrid;
  //   });
  // };
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
