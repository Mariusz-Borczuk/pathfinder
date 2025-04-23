import { tileData } from './components/types/tileData';
import { allFloorData, Coordinate } from './components/types/types';

// Define path segment interface
export interface PathSegment {
  start: Coordinate;
  end: Coordinate;
  floor: number;
}

// Updated props - Accepts only coordinates
interface PathFinderProps {
  startCoord: Coordinate | null;
  endCoord: Coordinate | null;
  currentFloor: number;
  onPathFound: (path: PathSegment[]) => void;
  onError: (message: string) => void;
}

/**
 * Core PathFinder function that calculates paths using only coordinates.
 * Paths are restricted to "path" type tiles as defined in tileData.ts.
 * 
 * IMPORTANT: This is not a React component, so no hooks are used.
 */
export const PathFinder = ({
  startCoord,
  endCoord,
  currentFloor,
  onPathFound,
  onError
}: PathFinderProps) => {
  
  // No hooks used - this is a pure function that calculates paths

  /**
   * Check if a tile is a valid path tile based on floor data
   */
  const isValidPathTile = (floorData: any, x: number, y: number): boolean => {
    // Check grid bounds
    if (x < 0 || y < 0 || x >= 60 || y >= 60) return false;

    // Check if the coordinate falls within any path rectangle
    for (const path of floorData.paths) {
      if (
        x >= Math.min(path.start.x, path.end.x) &&
        x <= Math.max(path.start.x, path.end.x) &&
        y >= Math.min(path.start.y, path.end.y) &&
        y <= Math.max(path.start.y, path.end.y)
      ) {
        // Valid path tile
        return true;
      }
    }
    // Not on a path tile
    return false;
  };

  // Directions for BFS: up, right, down, left
  const directions = [
    { x: 0, y: -1 },
    { x: 1, y: 0 },
    { x: 0, y: 1 },
    { x: -1, y: 0 }
  ];

  // Immediately execute path finding - no hooks needed
  console.log("PathFinder core received coordinates:", { startCoord, endCoord, currentFloor });

  // Input validation
  if (!startCoord || !endCoord) {
    onError("Missing start or end coordinates");
    return null;
  }

  // Validate floor number
  if (currentFloor <= 0 || currentFloor > allFloorData.length) {
    onError(`Invalid floor number: ${currentFloor}`);
    return null;
  }

  // Get floor data (floors are 1-indexed, array is 0-indexed)
  const floorIndex = currentFloor - 1;
  const floorData = allFloorData[floorIndex];

  // Validate start and end points are on path tiles
  if (!isValidPathTile(floorData, startCoord.x, startCoord.y)) {
    onError(`Start point (${startCoord.x}, ${startCoord.y}) is not on a valid path tile (type: "${tileData.path.type}").`);
    return null;
  }

  if (!isValidPathTile(floorData, endCoord.x, endCoord.y)) {
    onError(`End point (${endCoord.x}, ${endCoord.y}) is not on a valid path tile (type: "${tileData.path.type}").`);
    return null;
  }

  // Breadth-First Search implementation for path finding
  const findPathBFS = () => {
    const queue: Array<{ x: number; y: number; path: Coordinate[] }> = [];
    queue.push({ x: startCoord.x, y: startCoord.y, path: [startCoord] });

    const visited = new Set<string>();
    visited.add(`${startCoord.x},${startCoord.y}`);

    // BFS Loop
    while (queue.length > 0) {
      const { x, y, path } = queue.shift()!;

      // Check if we've reached the destination
      if (x === endCoord.x && y === endCoord.y) {
        // Convert path coordinates to segments
        const segments: PathSegment[] = [];
        for (let i = 0; i < path.length - 1; i++) {
          segments.push({
            start: path[i],
            end: path[i + 1],
            floor: currentFloor
          });
        }
        
        console.log("Path found with segments:", segments.length);
        return segments;
      }

      // Explore all four directions
      for (const dir of directions) {
        const newX = x + dir.x;
        const newY = y + dir.y;
        const key = `${newX},${newY}`;

        // Only move to unvisited valid path tiles
        if (!visited.has(key) && isValidPathTile(floorData, newX, newY)) {
          visited.add(key);
          const newPath = [...path, { x: newX, y: newY }];
          queue.push({ x: newX, y: newY, path: newPath });
        }
      }
    }

    // No path found
    return null;
  };

  // Execute the BFS and return the result
  const pathResult = findPathBFS();
  
  if (pathResult) {
    onPathFound(pathResult);
  } else {
    onError("No valid path found between the selected locations.");
  }
  
  // This function doesn't render anything
  return null;
};