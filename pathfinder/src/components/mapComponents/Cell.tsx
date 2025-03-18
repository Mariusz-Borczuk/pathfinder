/**
 * A styled `div` component representing a cell in the map grid.
 *
 * @component
 * @param {keyof typeof tileData} type - The type of the cell, which determines its background color.
 *
 * @styled
 * - Width: 15px
 * - Height: 15px
 * - Border-radius: 2px
 * - Transition: All properties with a duration of 0.2s and ease timing function
 * - Cursor: Pointer
 *
 * @background-color
 * - Dynamically set based on the `type` prop using the `tileData` object.
 * - Defaults to white (`#ffffff`) if no matching type is found.
 *
 * @border
 * - Solid border with a color of `#e0e0e0`.
 *
 * @hover
 * - Scales the cell slightly (1.05x) on hover.
 * - Adds a subtle box shadow for a raised effect.
 */
import styled from "styled-components";
import { tileData } from "../tileData";

export const Cell = styled.div<{ type: keyof typeof tileData }>`
  width: 15px;
  height: 15px;
  border-radius: 2px;
  transition: all 0.2s ease;
  cursor: pointer;

  background-color: ${(props) =>
    tileData[props.type]?.color ||
    "#ffffff"}; // White background for empty cells

  border: 1px solid #e0e0e0;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  }
`;
