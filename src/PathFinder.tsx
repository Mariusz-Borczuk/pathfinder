import { allFloorData, Coordinate, PathFinderProps2, PathSegment } from './components/types/types';

/**
 * Core PathFinder function that calculates paths between locations.
 * Enhanced to handle wheelchair accessibility and multi-floor navigation.
 */
export const PathFinder = ({
  startLocation,
  endLocation,
  isWheelchair,
  onPathFound,
  onError
}: PathFinderProps2) => {
  
  /**
   * Find all elevator entry points on a floor
   */
  const findElevatorEntryPoints = (floorData: any): Coordinate[] => {
    const entryPoints: Coordinate[] = [];
    
    floorData.elevators.forEach((elevator: any) => {
      if (elevator.entry) {
        entryPoints.push(elevator.entry);
      } else {
        // Use center point as fallback
        const centerX = Math.floor((elevator.start.x + elevator.end.x) / 2);
        const centerY = Math.floor((elevator.start.y + elevator.end.y) / 2);
        entryPoints.push({ x: centerX, y: centerY });
      }
    });
    
    return entryPoints;
  };
  
  /**
   * Find all stair entry points on a floor
   */
  const findStairEntryPoints = (floorData: any): Coordinate[] => {
    const entryPoints: Coordinate[] = [];
    
    floorData.stairs.forEach((stair: any) => {
      // Use center point for stairs
      const centerX = Math.floor((stair.start.x + stair.end.x) / 2);
      const centerY = Math.floor((stair.start.y + stair.end.y) / 2);
      entryPoints.push({ x: centerX, y: centerY });
    });
    
    return entryPoints;
  };
  
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
   * Determine if a point is an elevator entry
   */
  const isElevatorEntry = (floorData: any, x: number, y: number): boolean => {
    for (const elevator of floorData.elevators) {
      if (elevator.entry && elevator.entry.x === x && elevator.entry.y === y) {
        return true;
      }
      
      // Check center point as fallback
      const centerX = Math.floor((elevator.start.x + elevator.end.x) / 2);
      const centerY = Math.floor((elevator.start.y + elevator.end.y) / 2);
      if (x === centerX && y === centerY) return true;
    }
    return false;
  };
  
  /**
   * Determine if a point is a stair entry
   */
  const isStairEntry = (floorData: any, x: number, y: number): boolean => {
    for (const stair of floorData.stairs) {
      const centerX = Math.floor((stair.start.x + stair.end.x) / 2);
      const centerY = Math.floor((stair.start.y + stair.end.y) / 2);
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
  
  /**
   * Find the nearest stair or elevator entry point depending on wheelchair mode
   */
  const findNearestTransitPoint = (floorData: any, startX: number, startY: number): { coord: Coordinate, isElevator: boolean } | null => {
    const transitPoints: { coord: Coordinate, isElevator: boolean }[] = [];
    
    // Always include elevators
    const elevatorEntries = findElevatorEntryPoints(floorData);
    elevatorEntries.forEach(entry => {
      transitPoints.push({ coord: entry, isElevator: true });
    });
    
    // Only include stairs if not in wheelchair mode
    if (!isWheelchair) {
      const stairEntries = findStairEntryPoints(floorData);
      stairEntries.forEach(entry => {
        transitPoints.push({ coord: entry, isElevator: false });
      });
    }
    
    if (transitPoints.length === 0) {
      return null;
    }
    
    // Find the nearest transit point
    let nearestPoint: { coord: Coordinate, isElevator: boolean } | null = transitPoints.length > 0 ? transitPoints[0] : null;
    let minDistance = nearestPoint ? calculateDistance(startX, startY, nearestPoint.coord.x, nearestPoint.coord.y) : Infinity;
    
    for (let i = 1; i < transitPoints.length; i++) {
      const point = transitPoints[i];
      const distance = point ? calculateDistance(startX, startY, point.coord.x, point.coord.y) : Infinity;
      
      if (distance < minDistance && point) {
        minDistance = distance;
        nearestPoint = point;
      }
    }
    
    return nearestPoint;
  };
  
  /**
   * Calculate Euclidean distance between two points
   */
  const calculateDistance = (x1: number, y1: number, x2: number, y2: number): number => {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
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
  if (startLocation.floor === endLocation.floor) {
    // Same floor path finding
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

    // Breadth-First Search implementation for path finding on same floor
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
              const isElevatorTransit = isElevatorEntry(floorData, start.x, start.y) || isElevatorEntry(floorData, end.x, end.y);
              const isStairTransit = isStairEntry(floorData, start.x, start.y) || isStairEntry(floorData, end.x, end.y);
              
              segments.push({
                start: start,
                end: end,
                floor: floor,
                isTransitPoint: isElevatorTransit || isStairTransit,
                transitType: isElevatorTransit ? 'elevator' : (isStairTransit ? 'stairs' : undefined)
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

    // Execute the BFS and return the result for same floor
    const pathResult = findPathBFS();
    
    if (pathResult) {
      onPathFound(pathResult);
      return null;
    } else {
      onError("No valid path found between the selected locations");
      return null;
    }
  } else {
    // Multi-floor path finding
    // Get start floor data
    const startFloorIndex = startLocation.floor - 1;
    const endFloorIndex = endLocation.floor - 1;
    
    if (startFloorIndex < 0 || startFloorIndex >= allFloorData.length || 
        endFloorIndex < 0 || endFloorIndex >= allFloorData.length) {
      onError(`Invalid floor number`);
      return null;
    }
    
    const startFloorData = allFloorData[startFloorIndex];
    const endFloorData = allFloorData[endFloorIndex];
    
    // Get coordinates
    const startCoord = startLocation.location;
    const endCoord = endLocation.location;
    
    // Find valid path tiles
    const validStartCoord = findNearestPathTile(startFloorData, startCoord.x, startCoord.y);
    const validEndCoord = findNearestPathTile(endFloorData, endCoord.x, endCoord.y);
    
    if (!validStartCoord || !validEndCoord) {
      onError("Cannot find valid path tiles near the selected locations");
      return null;
    }
    
    // Find nearest transit point on start floor (elevator or stairs)
    const startFloorTransit = findNearestTransitPoint(startFloorData, validStartCoord.x, validStartCoord.y);
    
    if (!startFloorTransit) {
      onError("Cannot find a way to transition between floors");
      return null;
    }
    
    // Find corresponding transit point on end floor
    let endFloorTransit: { coord: Coordinate, isElevator: boolean } | null = null;
    
    if (startFloorTransit.isElevator) {
      // If using elevator, find the nearest elevator on destination floor
      const elevators = findElevatorEntryPoints(endFloorData);
      
      if (elevators.length > 0) {
        let nearest = elevators[0];
        let minDist = nearest ? calculateDistance(validEndCoord.x, validEndCoord.y, nearest.x, nearest.y) : Infinity;
        
        for (let i = 1; i < elevators.length; i++) {
          const elevator = elevators[i];
          if (elevator) {
            const dist = calculateDistance(validEndCoord.x, validEndCoord.y, elevator.x, elevator.y);
            if (dist < minDist) {
              minDist = dist;
            nearest = elevators[i];
          }
        }
        endFloorTransit = nearest ? { coord: nearest, isElevator: true } : null;
      }
    } else {
      // If using stairs, find the nearest stair on destination floor
      // If using stairs, find the nearest stair on destination floor
      const stairs = findStairEntryPoints(endFloorData);
      
      if (stairs.length > 0) {
        let nearest: any = stairs[0] || null;
        let minDist = nearest ? calculateDistance(validEndCoord.x, validEndCoord.y, nearest.x, nearest.y) : Infinity;
        
        for (let i = 1; i < stairs.length; i++) {
          const stair = stairs[i];
          if (stair) {
            const dist = calculateDistance(validEndCoord.x, validEndCoord.y, stair.x, stair.y);
            if (dist < minDist) {
              minDist = dist;
              nearest = stair;
            }
          }
        }
        
        endFloorTransit = nearest ? { coord: nearest, isElevator: false } : null;
      }
    }
    
    if (!endFloorTransit) {
      onError("Cannot find a matching transit point on the destination floor");
      return null;
    }
    
    // Find path from start location to start floor transit point
    const startFloorPath = findPathBetweenPoints(
      startFloorData,
      startCoord,
      validStartCoord,
      startFloorTransit.coord,
      startLocation.floor
    );
    
    // Find path from end floor transit point to end location
    const endFloorPath = findPathBetweenPoints(
      endFloorData,
      endFloorTransit.coord,
      validEndCoord,
      endCoord,
      endLocation.floor
    );
    
    if (!startFloorPath || !endFloorPath) {
      onError("Cannot find a complete path between floors");
      return null;
    }
    
    // Create the connection segment between floors
    const transitSegment: PathSegment = {
      start: startFloorTransit.coord,
      end: endFloorTransit.coord,
      floor: startFloorTransit.isElevator ? -1 : -2, // Special code to indicate vertical movement
      isTransitPoint: true,
      transitType: startFloorTransit.isElevator ? 'elevator' : 'stairs'
    };
    
    // Combine all path segments
    const fullPath = [...startFloorPath, transitSegment, ...endFloorPath];
    
    console.log("Multi-floor path found with segments:", fullPath.length);
    onPathFound(fullPath);
    return null;
  }
  
  /**
   * Find path between points on the same floor
   */
  function findPathBetweenPoints(
    floorData: any,
    startCoord: Coordinate,
    validStartCoord: Coordinate,
    endCoord: Coordinate,
    floor: number
  ): PathSegment[] | null {
    const queue: Array<{ x: number; y: number; path: Coordinate[] }> = [];
    
    // Start path
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
      if (x === endCoord.x && y === endCoord.y) {
        // Convert path coordinates to segments
        const segments: PathSegment[] = [];
        for (let i = 0; i < path.length - 1; i++) {
          const start = path[i];
          const end = path[i + 1];
          if (start && end) {
            const isElevatorTransit = isElevatorEntry(floorData, start.x, start.y) || isElevatorEntry(floorData, end.x, end.y);
            const isStairTransit = isStairEntry(floorData, start.x, start.y) || isStairEntry(floorData, end.x, end.y);
            
            segments.push({
              start: start,
              end: end,
              floor: floor,
              isTransitPoint: isElevatorTransit || isStairTransit,
              transitType: isElevatorTransit ? 'elevator' : (isStairTransit ? 'stairs' : undefined)
            });
          }
        }
        
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
  }
  }
};