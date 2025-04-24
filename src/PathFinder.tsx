import { allFloorData, Coordinate, LocationSearchResult } from './components/types/types';

// Define path segment interface
export interface PathSegment {
  start: Coordinate;
  end: Coordinate;
  floor: number;
}

// Updated props interface to accept full location search results
interface PathFinderProps {
  startLocation: LocationSearchResult | null;
  endLocation: LocationSearchResult | null;
  onPathFound: (path: PathSegment[]) => void;
  onError: (message: string) => void;
}

/**
 * Core PathFinder function that calculates paths between locations.
 * Enhanced to handle room entries and connect them via path tiles.
 */
export const PathFinder = ({
  startLocation,
  endLocation,
  onPathFound,
  onError
}: PathFinderProps) => {
  
  /**
   * Check if a tile is a valid path tile or an entry point of any room type
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

    // Check if it's an entry point to a classroom
    for (const room of floorData.classrooms) {
      if (Array.isArray(room.entry)) {
        // Handle multiple entries
        for (const entry of room.entry) {
          if (entry.x === x && entry.y === y) return true;
        }
      } else if (room.entry && room.entry.x === x && room.entry.y === y) {
        // Handle single entry
        return true;
      }
    }

    // Check if it's an entry point to a bathroom
    for (const bathroom of floorData.bathrooms) {
      if (bathroom.entry && bathroom.entry.x === x && bathroom.entry.y === y) {
        return true;
      }
    }

    // Check if it's an entry point to an elevator
    for (const elevator of floorData.elevators) {
      if (elevator.entry && elevator.entry.x === x && elevator.entry.y === y) {
        return true;
      }
    }

    // Check stair entry points (center of stairs)
    for (const stair of floorData.stairs) {
      const centerX = Math.floor((stair.start.x + stair.end.x) / 2);
      const centerY = Math.floor((stair.start.y + stair.end.y) / 2);
      if (x === centerX && y === centerY) return true;
    }

    // Check utility room entry points (center of room)
    for (const utilityRoom of floorData.utilityRooms) {
      const centerX = Math.floor((utilityRoom.start.x + utilityRoom.end.x) / 2);
      const centerY = Math.floor((utilityRoom.start.y + utilityRoom.end.y) / 2);
      if (x === centerX && y === centerY) return true;
    }

    return false;
  };

  /**
   * Find the nearest valid path tile if the current position is not on a path
   */
  const findNearestPathTile = (floorData: any, x: number, y: number): Coordinate | null => {
    // If the current position is already a valid path tile, return it
    if (isValidPathTile(floorData, x, y)) {
      return { x, y };
    }

    // Search for nearby valid path tiles in increasing radius
    for (let radius = 1; radius <= 5; radius++) {
      // Check points in a square pattern around the given position
      for (let dy = -radius; dy <= radius; dy++) {
        for (let dx = -radius; dx <= radius; dx++) {
          // Only check points on the perimeter of the square (makes it more like a circle)
          if (Math.abs(dx) === radius || Math.abs(dy) === radius) {
            const newX = x + dx;
            const newY = y + dy;
            
            if (isValidPathTile(floorData, newX, newY)) {
              return { x: newX, y: newY };
            }
          }
        }
      }
    }
    
    return null; // No valid path tile found nearby
  };

  // Directions for BFS: up, right, down, left
  const directions = [
    { x: 0, y: -1 }, // up
    { x: 1, y: 0 },  // right
    { x: 0, y: 1 },  // down
    { x: -1, y: 0 }, // left
  ];

  // Input validation
  if (!startLocation || !endLocation) {
    onError("Please select both start and end locations");
    return null;
  }

  // Check if start and end are on the same floor
  if (startLocation.floor !== endLocation.floor) {
    onError("Pathfinding between different floors is not supported yet");
    return null;
  }

  const floor = startLocation.floor;
  const floorIndex = floor - 1;
  
  if (floorIndex < 0 || floorIndex >= allFloorData.length) {
    onError(`Invalid floor number: ${floor}`);
    return null;
  }
  
  const floorData = allFloorData[floorIndex];
  
  // Get coordinates from the locations
  const startCoord = startLocation.location;
  const endCoord = endLocation.location;

  // Find valid path tiles near start and end points
  const validStartCoord = findNearestPathTile(floorData, startCoord.x, startCoord.y);
  const validEndCoord = findNearestPathTile(floorData, endCoord.x, endCoord.y);

  if (!validStartCoord) {
    onError(`Cannot find a valid path near the start location`);
    return null;
  }

  if (!validEndCoord) {
    onError(`Cannot find a valid path near the end location`);
    return null;
  }

  // Breadth-First Search implementation for path finding
  const findPathBFS = () => {
    const queue: Array<{ x: number; y: number; path: Coordinate[] }> = [];
    
    // Start path with original start coordinate followed by nearest valid path tile if different
    let initialPath: Coordinate[] = [];
    
    if (startCoord.x === validStartCoord.x && startCoord.y === validStartCoord.y) {
      initialPath = [startCoord];
    } else {
      initialPath = [startCoord, validStartCoord];
    }
    
    queue.push({ 
      x: validStartCoord.x, 
      y: validStartCoord.y, 
      path: initialPath 
    });

    const visited = new Set<string>();
    visited.add(`${validStartCoord.x},${validStartCoord.y}`);

    // BFS Loop
    while (queue.length > 0) {
      const { x, y, path } = queue.shift()!;

      // Check if we've reached the destination
      if (x === validEndCoord.x && y === validEndCoord.y) {
        // Complete path by adding end coordinate if needed
        let finalPath = path;
        
        // If the valid end coordinate is different from the actual end coordinate,
        // add the actual end coordinate to the path
        if (validEndCoord.x !== endCoord.x || validEndCoord.y !== endCoord.y) {
          finalPath = [...path, endCoord];
        }
        
        // Convert path coordinates to segments
        const segments: PathSegment[] = [];
        for (let i = 0; i < finalPath.length - 1; i++) {
          const start = finalPath[i];
          const end = finalPath[i + 1];
          if (start && end) {
            segments.push({
              start: start,
              end: end,
              floor: floor
            });
          }
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
    onError("No valid path found between the selected locations");
  }
  
  // This function doesn't render anything
  return null;
};