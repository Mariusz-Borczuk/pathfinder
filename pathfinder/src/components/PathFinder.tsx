import React from 'react';
import styled from 'styled-components';

// Main container for the Path Finder component
const PathFinderContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1200px; // Adjust based on Figma design
  margin: 0 auto;
  padding: 24px;
  
  // Add your background color from Figma here
  background-color:rgb(177, 95, 95); // Replace with the actual color from the design
  
  // Add any border radius, shadows, etc. from the design
  border-radius: 8px; // Replace with actual value from Figma
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1); // Replace with actual shadow values
`;

// Header section styling
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px; // Adjust based on design
`;

const Title = styled.h1`
  font-size: 24px; // Replace with actual size from Figma
  font-weight: 600; // Replace with actual weight from Figma
  color:rgb(164, 6, 6); // Replace with actual color from Figma
  margin: 0;
`;

// Main content area
const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px; // Adjust based on design spacing
`;

// Path visualization component - customize based on your design
const PathVisualization = styled.div`
  width: 100%;
  min-height: 300px; // Replace with actual height from Figma
  background-color: #f6f6f6; // Replace with actual color from Figma
  border-radius: 6px; // Replace with actual value from Figma
  padding: 16px;
  
  // Add any other styling that matches the Figma design
`;

// Controls section
const Controls = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px; // Adjust based on design
  margin: 16px 0;
`;

const Button = styled.button`
  padding: 10px 16px;
  background-color: #4a7bff; // Replace with actual color from Figma
  color: white;
  border: none;
  border-radius: 4px; // Replace with actual value from Figma
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #3a6ae0; // Slightly darker shade for hover
  }
`;

// Legend section
const Legend = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 16px;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ColorSquare = styled.div<{ bgColor: string }>`
  width: 16px;
  height: 16px;
  background-color: ${props => props.bgColor};
  border-radius: 3px; // Replace with actual value from Figma
`;

const LegendText = styled.span`
  font-size: 14px; // Replace with actual size from Figma
  color: #666666; // Replace with actual color from Figma
`;

// Results section
const Results = styled.div`
  margin-top: 24px;
  padding: 16px;
  background-color: #f9f9f9; // Replace with actual color from Figma
  border-radius: 6px; // Replace with actual value from Figma
`;

interface PathFinderProps {
    // Add any props that your component needs
    title?: string;
    onFindPath?: () => void;
    onReset?: () => void;
}

const PathFinder: React.FC<PathFinderProps> = ({
    title = "Path Finder",
    onFindPath,
    onReset,
}) => {
    return (
        <PathFinderContainer>
            <Header>
                <Title>{title}</Title>
                {/* Add any header actions or elements here based on the Figma design */}
            </Header>

            <Content>
                <PathVisualization>
                    {/* 
            This is where your main path visualization would go.
            You might need to implement a canvas, SVG, or grid of elements
            based on your specific Figma design
          */}
                    <div>Grid or visualization area based on Figma design</div>
                </PathVisualization>

                <Controls>
                    <Button onClick={onFindPath}>Find Path</Button>
                    <Button onClick={onReset} style={{ backgroundColor: '#e0e0e0', color: '#333' }}>Reset</Button>
                    {/* Add any other controls from your Figma design */}
                </Controls>

                <Legend>
                    <LegendItem>
                        <ColorSquare bgColor="#4a7bff" />
                        <LegendText>Start</LegendText>
                    </LegendItem>
                    <LegendItem>
                        <ColorSquare bgColor="#ff4a4a" />
                        <LegendText>End</LegendText>
                    </LegendItem>
                    <LegendItem>
                        <ColorSquare bgColor="#333333" />
                        <LegendText>Wall</LegendText>
                    </LegendItem>
                    <LegendItem>
                        <ColorSquare bgColor="#ffdb4a" />
                        <LegendText>Path</LegendText>
                    </LegendItem>
                    {/* Add any other legend items from your Figma design */}
                </Legend>

                <Results>
                    {/* Display results of path finding here */}
                    <p>Path length: 0 steps</p>
                    <p>Time taken: 0ms</p>
                    {/* Add other results data from your Figma design */}
                </Results>
            </Content>
        </PathFinderContainer>
    );
};

export default PathFinder; 