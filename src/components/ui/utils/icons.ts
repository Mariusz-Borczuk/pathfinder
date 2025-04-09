import React from "react";
import {
  MdSportsTennis,
  MdOutlineDirectionsWalk,
  MdLocationOn,
  MdHome,
  MdDarkMode,
  MdElevator,
  MdFemale,
  MdMale,
  MdWater,
} from "react-icons/md";
import { LuType } from "react-icons/lu";
import { IoMdEye } from "react-icons/io";
// Export all icons as named exports
export {
  MdSportsTennis,
  MdOutlineDirectionsWalk,
  MdLocationOn,
  MdHome,
  MdDarkMode,
  MdFemale,
  MdMale,
  MdWater,
  MdElevator,
  LuType,
  IoMdEye,
};

// Export commonly used icon combinations
export const RestroomIcon = () =>
  React.createElement("span", { className: "flex flex-row" }, [
    React.createElement(MdFemale, { key: "female" }),
    React.createElement(MdMale, { key: "male" }),
  ]);

// Export icon types for type safety
export type IconType = React.ReactNode;
