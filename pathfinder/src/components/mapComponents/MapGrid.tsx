import styled from "styled-components";

export const MapGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(60, 15px);
  grid-template-rows: repeat(60, 15px);
  gap: 1px;
  margin: 0 auto;
  background-color: #e0e5ec;
  padding: 2px;
  border-radius: 8px;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.1);
`;
