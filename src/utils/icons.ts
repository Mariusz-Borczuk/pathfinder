import React from "react";
import { IoMdEye } from "react-icons/io";
import { LuType } from "react-icons/lu";
import { FaRestroom,FaFireExtinguisher,FaWrench } from "react-icons/fa";
import { SiGoogleclassroom } from "react-icons/si";
import {
  MdDarkMode,
  MdElevator,
  MdFemale,
  MdHome,
  MdLocationOn,
  MdMale,
  MdOutlineDirectionsWalk,
  MdSearch,
  MdSportsTennis,
  MdWater,
  MdStairs,
  MdLocationPin
} from "react-icons/md";
// Export all icons as named exports
export {
  IoMdEye, LuType, MdDarkMode, MdElevator, MdFemale, MdHome, SiGoogleclassroom, MdLocationOn, MdMale, MdOutlineDirectionsWalk, MdSearch, MdSportsTennis, MdWater, MdStairs, FaRestroom, FaFireExtinguisher, FaWrench, MdLocationPin
};

// Export commonly used icon combinations
export const RestroomIcon = () =>
  React.createElement("span", { className: "flex flex-row" }, [
    React.createElement(MdFemale, { key: "female" }),
    React.createElement(MdMale, { key: "male" }),
  ]);

// Export icon types for type safety
export type IconType = React.ReactNode;
