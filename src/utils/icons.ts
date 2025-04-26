import React from "react";
import { IoMdEye, IoMdGrid, } from "react-icons/io";
import { FaRestroom, FaFireExtinguisher, FaWrench, FaMapMarkerAlt, FaPlay, FaRoute, FaWheelchair, FaArrowRight, FaCheck } from "react-icons/fa";
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
  MdLocationPin,
} from "react-icons/md";
import { FiType } from "react-icons/fi";

// Export all icons as named exports
/**
 * Exports various icons from different icon libraries for use in the application.
 * 
 * Includes icons for:
 * - UI elements (eye, search, dark mode, etc.)
 * - Navigation (location, directions, home, etc.)
 * - Facilities (restroom, water, elevator, stairs, etc.)
 * - Gender indicators (male, female)
 * - Other utilities (fire extinguisher, wrench, etc.)
 * 
 * @module icons
 */
export {
  IoMdEye, MdDarkMode, MdElevator, MdFemale, MdHome, SiGoogleclassroom, MdLocationOn, MdMale, MdOutlineDirectionsWalk, MdSearch, MdSportsTennis, MdWater, MdStairs, FaRestroom, FaFireExtinguisher, FaWrench, MdLocationPin, FaMapMarkerAlt, FaPlay, FaRoute, FaWheelchair, FaArrowRight, FaCheck, FiType, IoMdGrid
};

// Export commonly used icon combinations
export const RestroomIcon = () =>
  React.createElement("span", { className: "flex flex-row" }, [
    React.createElement(MdFemale, { key: "female" }),
    React.createElement(MdMale, { key: "male" }),
  ]);

// Export icon types for type safety
export type IconType = React.ReactNode;
