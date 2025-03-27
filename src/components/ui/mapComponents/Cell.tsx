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
import { tileData } from "../tileData";
import React from "react";

interface CellProps {
  type: keyof typeof tileData;
}

export const Cell: React.FC<CellProps> = ({ type }) => {
  const backgroundColor = tileData[type]?.color || "#ffffff";

  return (
    <div
      className={`w-[15px] h-[15px] rounded-[2px] border border-gray-300 cursor-pointer transition-transform duration-200 ease-in-out hover:scale-105 hover:shadow-md`}
      style={{ backgroundColor }}
    ></div>
  );
};
