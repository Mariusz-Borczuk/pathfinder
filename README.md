# Pathfinding Visualizer

This is a React-based pathfinding visualization tool that allows users to see how pathfinding algorithms work in real-time. The application lets you place start and end points, create walls, and visualize the path-finding process.

## Features

- Interactive grid for visualizing pathfinding algorithms
- Place start and end points at custom locations
- Create walls to block paths
- Clear visualization and reset grid
- View results including path length and time taken

## Getting Started

### Prerequisites

- Node.js (v14 or later recommended)
- npm or yarn

### Installation

1. Clone the repository
   ```
   git clone <repository-url>
   cd pathfinding-visualizer
   ```

2. Install dependencies
   ```
   npm install
   ```
   or
   ```
   yarn install
   ```

3. Start the development server
   ```
   npm start
   ```
   or
   ```
   yarn start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## How to Use

1. **Set Start and End Points**: Use the radio buttons to switch to "Set Start" or "Set End" mode, then click on the grid to place the points.

2. **Create Walls**: Switch to "Add Walls" mode and click on cells to toggle walls that block the path.

3. **Find Path**: Click the "Find Path" button to visualize the pathfinding algorithm.

4. **Reset/Clear**: Use "Reset Grid" to start over or "Clear Path" to only clear the visualization.

## Implementation Details

The current implementation uses a simplified algorithm that moves directly toward the end point for demonstration purposes. In a production application, you would replace this with actual pathfinding algorithms such as:

- Dijkstra's Algorithm
- A* Search
- Breadth-First Search (BFS)
- Depth-First Search (DFS)

## Customizing the Design

This project uses styled-components for styling. To match your specific Figma design:

1. Update color values in the styled components
2. Adjust spacing, sizing, and typography as needed
3. Modify the grid dimensions to match your design

## License

This project is licensed under the MIT License - see the LICENSE file for details. 