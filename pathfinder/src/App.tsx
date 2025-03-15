import React from 'react';
import styled from 'styled-components';
import PathMap from './components/PathMap';

const AppContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px 16px;
  background-color: #f5f5f5;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 32px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 8px;
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: #666;
`;

function App() {
  const handleFindPath = () => {
    console.log('Finding path...');
    // Implement path finding algorithm logic here
  };

  const handleReset = () => {
    console.log('Resetting map...');
    // Implement map reset logic here
  };

  return (
    <AppContainer>
      <Header>
        <Title>Interactive Map Pathfinder</Title>
        <Subtitle>Find the optimal path through different terrains</Subtitle>
      </Header>

      <PathMap
        title="Terrain Map"
        onFindPath={handleFindPath}
        onReset={handleReset}
      />
    </AppContainer>
  );
}

export default App; 