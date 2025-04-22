import React, { useEffect, useState } from 'react';
import { allFloorData, Coordinate, LocationSearchResult } from './components/types/types';

// Define path segment interface to represent a segment of the path
export interface PathSegment {
  start: Coordinate;
  end: Coordinate;
  floor: number;
}

interface PathFinderProps {
  startLocation: LocationSearchResult | null;
  endLocation: LocationSearchResult | null;
  currentFloor: number;
  onPathFound: (path: PathSegment[]) => void;
  onError: (message: string) => void;
}

/**
 * PathFinder component handles the logic for finding the shortest path between two points
 * on a floor grid. It uses a breadth-first search algorithm to find the shortest path
 * and returns path segments.
 */
export const PathFinder: React.FC<PathFinderProps> = ({ 
  startLocation, 
  endLocation, 
  currentFloor: _, // Renamed to _ since it's not used directly
  onPathFound,
  onError
}) => {
  const [path, setPath] = useState<PathSegment[]>([]);
  const [isPathValid, setIsPathValid] = useState<boolean>(false);

  // Effect to monitor path and its validity status
  useEffect(() => {
    if (path.length > 0 && isPathValid) {
      console.log("Valid path found with", path.length, "segments");
      onPathFound(path);
    } else if (path.length === 0) {
      setIsPathValid(false);
    }
  }, [path, isPathValid, onPathFound]);

  // Reset path when locations change
  useEffect(() => {
    setPath([]);
    setIsPathValid(false);
  }, [startLocation, endLocation]);

  /**
   * Checks if a cell is valid for pathfinding (is a path or an entry)
   */
  const isValidCell = (floorData: any, x: number, y: number): boolean => {
    // Check if coordinates are within grid bounds
    if (x < 0 || y < 0 || x >= 60 || y >= 60) return false;

    // Check if the cell is a path
    for (const path of floorData.paths) {
      if (
        x >= Math.min(path.start.x, path.end.x) && 
        x <= Math.max(path.start.x, path.end.x) && 
        y >= Math.min(path.start.y, path.end.y) && 
        y <= Math.max(path.start.y, path.end.y)
      ) {
        return true;
      }
    }

    // Check if it's an entry point to a room
    for (const room of floorData.classrooms) {
      if (Array.isArray(room.entry)) {
        for (const entry of room.entry) {
          if (entry.x === x && entry.y === y) return true;
        }
      } else if (room.entry && room.entry.x === x && room.entry.y === y) {
        return true;
      }
    }

    // Check other entry points (bathrooms, elevators)
    for (const bathroom of floorData.bathrooms) {
      if (bathroom.entry.x === x && bathroom.entry.y === y) return true;
    }
    
    for (const elevator of floorData.elevators) {
      if (elevator.entry.x === x && elevator.entry.y === y) return true;
    }

    // Check stair entry points
    for (const stair of floorData.stairs) {
      // Use center points of stairs as valid cells for pathfinding
      const centerX = Math.floor((stair.start.x + stair.end.x) / 2);
      const centerY = Math.floor((stair.start.y + stair.end.y) / 2);
      if (x === centerX && y === centerY) return true;
    }

    // Check utility room entry points (assuming center points)
    for (const utilityRoom of floorData.utilityRooms) {
      const centerX = Math.floor((utilityRoom.start.x + utilityRoom.end.x) / 2);
      const centerY = Math.floor((utilityRoom.start.y + utilityRoom.end.y) / 2);
      if (x === centerX && y === centerY) return true;
    }

    return false;
  };

  /**
   * Find a nearby valid path cell if the given location is not on a path
   * This helps when a room's entry point is not directly on a path
   */
  const findNearestPathCell = (floorData: any, x: number, y: number): Coordinate | null => {
    // If the cell itself is valid, return it
    if (isValidCell(floorData, x, y)) return { x, y };

    // Check surrounding cells in increasing radius
    for (let radius = 1; radius <= 3; radius++) {
      // Check in a square pattern around the point
      for (let offsetY = -radius; offsetY <= radius; offsetY++) {
        for (let offsetX = -radius; offsetX <= radius; offsetX++) {
          // Skip checking the corners of the square to make it more like a circle
          if (Math.abs(offsetX) === radius && Math.abs(offsetY) === radius) continue;

          const newX = x + offsetX;
          const newY = y + offsetY;

          if (isValidCell(floorData, newX, newY)) {
            return { x: newX, y: newY };
          }
        }
      }
    }
    return null;
  };

  // Adjacent cells in 4 directions (up, right, down, left)
  const directions = [
    { x: 0, y: -1 }, // up
    { x: 1, y: 0 },  // right
    { x: 0, y: 1 },  // down
    { x: -1, y: 0 }, // left
  ];

  /**
   * Find the shortest path using breadth-first search algorithm
   */
  const findPath = (): void => {
    if (!startLocation || !endLocation) {
      onError("Please select both start and end locations");
      return;
    }

    // Check if start and end are on the same floor
    if (startLocation.floor !== endLocation.floor) {
      onError("Pathfinding between different floors is not supported yet");
      return;
    }

    const floor = startLocation.floor;
    const floorData = allFloorData[floor - 1];
    
    if (!floorData) {
      onError(`Floor data for floor ${floor} not found`);
      return;
    }

    const startX = startLocation.location.x;
    const startY = startLocation.location.y;
    const endX = endLocation.location.x;
    const endY = endLocation.location.y;

    // Find valid path cells near the start and end points if they're not already valid
    const validStartCell = findNearestPathCell(floorData, startX, startY);
    const validEndCell = findNearestPathCell(floorData, endX, endY);

    if (!validStartCell) {
      onError("Could not find a valid path near the start location");
      return;
    }

    if (!validEndCell) {
      onError("Could not find a valid path near the end location");
      return;
    }

    // Use the valid cells for pathfinding
    const pathStartX = validStartCell.x;
    const pathStartY = validStartCell.y;
    const pathEndX = validEndCell.x;
    const pathEndY = validEndCell.y;

    // BFS queue
    const queue: Array<{x: number, y: number, path: Coordinate[]}> = [];
    
    // Start from the valid path cell, but include the original start point in the path
    let initialPath: Coordinate[] = [];
    if (pathStartX === startX && pathStartY === startY) {
      initialPath = [{ x: startX, y: startY }];
    } else {
      initialPath = [
        { x: startX, y: startY },
        { x: pathStartX, y: pathStartY }
      ];
    }

    queue.push({
      x: pathStartX,
      y: pathStartY,
      path: initialPath
    });

    // Keep track of visited cells
    const visited = new Set<string>();
    visited.add(`${pathStartX},${pathStartY}`);

    while (queue.length > 0) {
      const { x, y, path } = queue.shift()!;

      // Check if we reached the destination or are close to it
      if (x === pathEndX && y === pathEndY) {
        // Complete the path by adding the final destination if needed
        let finalPath = path;
        
        // If the end cell found is not the actual destination, add the destination as the final point
        if (pathEndX !== endX || pathEndY !== endY) {
          finalPath = [...path, { x: endX, y: endY }];
        }
        
        // Convert path coordinates to path segments
        const segments: PathSegment[] = [];
        for (let i = 0; i < finalPath.length - 1; i++) {
          const current = finalPath[i];
          const next = finalPath[i + 1];
          
          if (current && next && 
              typeof current.x === 'number' && typeof current.y === 'number' &&
              typeof next.x === 'number' && typeof next.y === 'number') {
            segments.push({
              start: { x: current.x, y: current.y },
              end: { x: next.x, y: next.y },
              floor
            });
          }
        }

        setPath(segments);
        setIsPathValid(true);
        onPathFound(segments);
        return;
      }

      // Check all four directions
      for (const direction of directions) {
        const newX = x + direction.x;
        const newY = y + direction.y;
        const key = `${newX},${newY}`;

        // If cell is valid and not visited yet
        if (isValidCell(floorData, newX, newY) && !visited.has(key)) {
          visited.add(key);
          queue.push({
            x: newX,
            y: newY,
            path: [...path, { x: newX, y: newY }]
          });
        }
      }
    }

    // If we get here, no path was found
    onError("No valid path found between the selected locations");
  };

  // useEffect to call findPath when locations change
  useEffect(() => {
    if (startLocation && endLocation) {
      findPath();
    }
  }, [startLocation, endLocation]);
  
  // Return null as this is a logic component, not a UI component
  return null;
};