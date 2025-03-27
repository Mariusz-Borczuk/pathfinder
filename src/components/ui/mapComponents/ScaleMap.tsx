import React, { useState, useEffect, useRef } from "react";

/**
 * A React functional component that renders a grid layout for a map.
 *
 * The grid is styled using Tailwind CSS classes to create a 60x60 grid
 * with each cell having a size of 15px by 15px, separated by a 0.5px gap.
 * The grid is centered horizontally with padding, a gray background,
 * rounded corners, and an inner shadow effect.
 *
 * @component
 * @returns {JSX.Element} The rendered grid layout for the map.
 */
export const ScallableMapGrid = () => {
  const gridSize = 60;
  const baseTileSize = 15;
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
      className="relative w-full h-[400px] overflow-hidden border-2 border-red-800 rounded-lg"
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
          const isEven = (x + y) % 2 === 0;
          const tileColor = isEven ? "#e0e0e0" : "#c0c0c0";
          return (
            <div
              key={index}
              className="absolute flex items-center justify-center text-[8px] border border-gray-300"
              style={{
                left: `${x * tileSize}px`,
                top: `${y * tileSize}px`,
                width: `${tileSize}px`,
                height: `${tileSize}px`,
                backgroundColor: tileColor,
              }}
            >
              {`${x},${y}`}
            </div>
          );
        })}
      </div>
      <div className="absolute top-2 left-2 flex space-x-2">
        <button
          className="px-2 py-1 bg-blue-500 text-white rounded"
          onClick={handleZoomIn}
        >
          Zoom In (+)
        </button>
        <button
          className="px-2 py-1 bg-blue-500 text-white rounded"
          onClick={handleZoomOut}
        >
          Zoom Out (-)
        </button>
      </div>
    </div>
  );
};
