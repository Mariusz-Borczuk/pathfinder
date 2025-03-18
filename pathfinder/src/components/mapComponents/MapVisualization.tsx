import React, { ReactEventHandler } from "react";

// MapVisualization.tsx

interface MapVisualizationProps {
    children: React.ReactNode;
    onMouseUp: ReactEventHandler;
  }
  
  export const MapVisualization = ({ children, onMouseUp }: MapVisualizationProps) => {
    return (
      <div
        className="flex w-full bg-[#f0f4f8] rounded-lg p-4 flex-col items-center"
        onMouseUp={onMouseUp}
      >
        {children}
      </div>
    );
  };