import React, { ReactEventHandler } from "react";

// MapVisualization.tsx

interface MapVisualizationProps {
    children: React.ReactNode;
    onMouseUp: ReactEventHandler;
  }
  
  export const MapVisualization = ({ children, onMouseUp }: MapVisualizationProps) => {
    return (
      <div
        className="flex w-full bg-[#4778a8] rounded-lg p-0.5 flex-col items-center"
        onMouseUp={onMouseUp}
      >
        {children}
      </div>
    );
  };