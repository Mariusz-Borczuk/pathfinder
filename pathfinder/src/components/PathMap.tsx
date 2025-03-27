import React, { useState, useEffect, ReactEventHandler } from "react";
import styled from "styled-components";
import { tileData, CellType } from "./tileData"; // Import the tile data

// Main container for the Path Map component
const PathMapContainer = ({ children: jsx }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col w-full max-w-[1200px] mx-auto p-6 bg-white rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.08)]">
      {jsx}
    </div>
  );
};
//Header
const Header = ({ children: jsx }: { children: React.ReactNode }) => {
  return <div className="flex justify-between items-center mb-6">{jsx}</div>;
};
// Tile
const Title = ({ children: jsx }: { children: React.ReactNode }) => {
  return (
    <div className="flex text-[28px] text-[#333333] items-m-0  font-bold">
      {jsx}
    </div>
  );
};
// Main content area
const Content = ({ children: jsx }: { children: React.ReactNode }) => {
  return <div className="flex gap-[24px] flex-col ">{jsx}</div>;
};
// Map visualization component
interface MapVisualizationProps {
  children: React.ReactNode;
  onMouseUp: ReactEventHandler;
}

const MapVisualization = ({ children, onMouseUp }: MapVisualizationProps) => {
  return (
    <div
      className="flex w-full bg-[#f0f4f8] rounded-lg p-4 flex-col items-center"
      onMouseUp={onMouseUp}
    >
      {children}
    </div>
  );
};
const MapGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(60, 15px);
  grid-template-rows: repeat(60, 15px);
  gap: 1px;
  margin: 0 auto;
  background-color: #e0e5ec;
  padding: 2px;
  border-radius: 8px;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Cell = styled.div<{ type: keyof typeof tileData }>`
  width: 15px;
  height: 15px;
  border-radius: 2px;
  transition: all 0.2s ease;
  cursor: pointer;

  background-color: ${(props) =>
    tileData[props.type]?.color ||
    "#ffffff"}; // White background for empty cells

  border: 1px solid #e0e0e0;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  }
`;

// Controls section
const Controls = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex flex-wrap gap-3 my-4">{children}</div>;
};

const Button = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className="px-5 py-3 bg-blue-600 text-white rounded-lg font-semibold text-sm transition-all duration-200 ease-in-out hover:bg-blue-500 hover:-translate-y-0.5 active:translate-y-0"
    >
      {children}
    </button>
  );
};
const SecondaryButton = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className="px-5 py-3 bg-gray-300 text-gray-800 rounded-lg font-semibold text-sm transition-all duration-200 ease-in-out hover:bg-gray-400 hover:-translate-y-0.5 active:translate-y-0"
    >
      {children}
    </button>
  );
};
const SelectionControls = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-wrap gap-3 mt-4 p-4 bg-gray-100 rounded-lg">
      {children}
    </div>
  );
};

const RadioControl = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex items-center gap-1.5">{children}</div>;
};
const RadioLabel = ({
  htmlFor,
  children,
}: {
  htmlFor: string;
  children: React.ReactNode;
}) => {
  return (
    <label htmlFor={htmlFor} className="text-sm text-gray-600 cursor-pointer">
      {children}
    </label>
  );
};

// Legend section
const Legend = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-wrap gap-4 mt-4 p-4 bg-gray-100 rounded-lg">
      {children}
    </div>
  );
};
const LegendItem = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex items-center gap-2">{children}</div>;
};
const ColorSquare = ({ bgColor }: { bgColor: string }) => {
  return (
    <div
      className="w-4 h-4 rounded-sm"
      style={{ backgroundColor: bgColor }}
    ></div>
  );
};

const LegendText = ({ children }: { children: React.ReactNode }) => {
  return <span className="text-sm text-gray-600 font-medium">{children}</span>;
};

// Results section
const Results = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mt-6 p-5 bg-gray-100 rounded-lg border-l-4 border-blue-600">
      {children}
    </div>
  );
};

const ResultText = ({ children }: { children: React.ReactNode }) => {
  return (
    <p className="text-base text-gray-800 mb-2 flex items-center gap-2">
      {children}
    </p>
  );
};

const ResultValue = ({ children }: { children: React.ReactNode }) => {
  return <span className="font-semibold text-blue-600">{children}</span>;
};

interface PathMapProps {
  title?: string;
  onFindPath?: () => void;
  onReset?: () => void;
}

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

const PathMap: React.FC<PathMapProps> = ({
  title = "Path Map",
  onFindPath,
  onReset,
}) => {
  // Initialize grid
  const [grid, setGrid] = useState<CellType[][]>([]);
  const [selectionMode, setSelectionMode] = useState<
    "start" | "end" | keyof typeof tileData
  >("start");
  const [isDrawing, setIsDrawing] = useState<boolean>(false);

  // Initialize grid on component mount
  useEffect(() => {
    initializeGrid();
  }, []);
  const initializeGrid = () => {
      const newGrid: CellType[][] = [];
  
      for (let row = 0; row < 60; row++) {
        const currentRow: CellType[] = [];
      for (let col = 0; col < 60; col++) {
        const terrainType = exampleLayout[row][col];
        const tileKey = Object.keys(tileData)[terrainType] as keyof typeof tileData;
        const tileProps = tileData[tileKey];

        currentRow.push({
          row,
          col,
          ...tileProps,
          type: tileKey as keyof typeof tileData,
        });
      }
      newGrid.push(currentRow);
    }

    setGrid(newGrid);
  };

  const handleCellClick = (row: number, col: number) => {
    const newGrid = [...grid];

    // If we're setting start or end, clear any previous start or end
    if (selectionMode === "start" || selectionMode === "end") {
      for (let r = 0; r < newGrid.length; r++) {
        for (let c = 0; c < newGrid[0].length; c++) {
        }
      }
    }

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
      const newGrid = [...grid];
      const cell = newGrid[row][col];
  
      // Ensure cell.type is a valid key of tileData
      if (Object.keys(tileData).includes(cell.type)) {
          cell.type = cell.type as keyof typeof tileData;
      }
  
      setGrid(newGrid);
  };

  return (
    <div className={"text-[28px] font-bold text-[#333333] m-0"}>
      <PathMapContainer>
        <Header>
          <Title>{title}</Title>
        </Header>

        <Content>
          <MapVisualization onMouseUp={handleMouseUp}>
                {grid.map((row, rowIdx) =>
                  row.map((cell, colIdx) => (
                    <Cell
                      key={`${rowIdx}-${colIdx}`}
                      type={cell.type as keyof typeof tileData}
                      onMouseDown={() => handleMouseDown(rowIdx, colIdx)}
                      onMouseEnter={() => handleMouseMove(rowIdx, colIdx)}
                      onClick={() => handleCellClick(rowIdx, colIdx)}
                    />
                  ))
                )}
          </MapVisualization>

          <Legend>
            {Object.entries(tileData).map(([key, value]) => (
              <LegendItem key={key}>
                <ColorSquare bgColor={value.color} />
                <LegendText>{value.label}</LegendText>
              </LegendItem>
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
          </SelectionControls>
        </Content>
      </PathMapContainer>
    </div>
  );
};

export default PathMap;
