import PathMap from "./PathMap"; // Ensure the file exists at this path or update the path accordingly

/**
 * Main application component for the path finding visualization.
 * 
 * Renders the application container with a PathMap component that allows users
 * to find paths through a terrain map and reset the map state.
 * 
 * @returns The rendered App component
 */

const AppContainer: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="w-full h-full flex flex-col items-center">
      {children}
    </div>
  );
};

// const Header = styled.header`
//   text-align: center;
//   margin-bottom: 32px;
// `;

// const Title = styled.h1`
//   font-size: 2.5rem;
//   color: #333;
//   margin-bottom: 8px;
// `;

// const Subtitle = styled.p`
//   font-size: 1.1rem;
//   color: #666;
// `;

function App() {
  const handleFindPath = () => {
    console.log("Finding path...");
    // Implement path finding algorithm logic here
  };

  const handleReset = () => {
    console.log("Resetting map...");
    // Implement map reset logic here
  };

  return (
    <AppContainer>
      <PathMap
        title="Terrain Map"
        onFindPath={handleFindPath}
        onReset={handleReset}
      />
    </AppContainer>
  );
}

export default App;
