import React, { useState, useEffect, useRef } from "react";
import { Cell, CellProps } from "./Cell";

export const ScallableMapGrid = () => {
  const gridSize = 60;
  const baseTileSize = 25;
  const [scale, setScale] = useState(1);
  const [posX, setPosX] = useState(0);
  const [posY, setPosY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const mapRef = useRef<HTMLDivElement>(null);

  const tileSize = baseTileSize * scale;

  const createGrid = () => {
    if (mapRef.current) {
      mapRef.current.style.width = `${gridSize * tileSize}px`;
      mapRef.current.style.height = `${gridSize * tileSize}px`;
      mapRef.current.style.transform = `translate(${posX}px, ${posY}px)`;
    }
  };

  useEffect(() => {
    createGrid();
  }, [scale, posX, posY]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - posX, y: e.clientY - posY });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    setPosX(e.clientX - dragStart.x);
    setPosY(e.clientY - dragStart.y);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.2, 3));
  };

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 0.2, 0.5));
  };

  const handleArrowKey = (e: React.KeyboardEvent) => {
    const moveStep = 30;
    switch (e.key) {
      case "ArrowUp":
        setPosY((prev) => prev + moveStep);
        break;
      case "ArrowDown":
        setPosY((prev) => prev - moveStep);
        break;
      case "ArrowLeft":
        setPosX((prev) => prev + moveStep);
        break;
      case "ArrowRight":
        setPosX((prev) => prev - moveStep);
        break;
      case "+":
      case "=":
        handleZoomIn();
        break;
      case "-":
        handleZoomOut();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragStart]);

  return (
    <div
      className="relative w-full h-full overflow-hidden border-2 border-blue-800 rounded-lg"
      tabIndex={0}
      onKeyDown={handleArrowKey}
    >
      <div
        ref={mapRef}
        className="absolute cursor-grab"
        onMouseDown={handleMouseDown}
        style={{
          transform: `translate(${posX}px, ${posY}px)`,
        }}
      >
        {Array.from({ length: gridSize * gridSize }).map((_, index) => {
          const x = index % gridSize;
          const y = Math.floor(index / gridSize);
            const cellTypes: CellProps["type"][] = ["path", "classroom", "start", "end"];
            const cellType: CellProps["type"] = cellTypes[index % cellTypes.length] || "path"; // Ensure a fallback value

          return (
            <div
              key={index}
              className="absolute"
              style={{
                left: `${x * tileSize}px`,
                top: `${y * tileSize}px`,
                width: `${tileSize}px`,
                height: `${tileSize}px`,
              }}
            >
              <Cell type={cellType} />
            </div>
          );
        })}
      </div>
     
    </div>
  );
};