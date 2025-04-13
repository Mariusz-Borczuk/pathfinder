// import { useState } from "react";
// import { Search, Map, Settings, Info } from "lucide-react";
// import { MdDarkMode } from "react-icons/md";
// import { CiLight } from "react-icons/ci";
// import { FaElevator } from "react-icons/fa6";
// import { IoMdFemale, IoMdMale } from "react-icons/io";
// const WayfindingApp = () => {
//   const [isDarkMode, setIsDarkMode] = useState(false);

//   const toggleDarkMode = () => {
//     setIsDarkMode(!isDarkMode);
//   };

//   return (
//     <div
//       className={`flex w-full h-full ${
//         isDarkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-800"
//       }`}
//     >
//       {/* Left Sidebar - Navigation Controls */}
//       <div
//         className={`w-full ${
//           isDarkMode ? "bg-gray-800" : "bg-white"
//         } shadow-lg p-4`}
//       >
//         <div className="mb-6 flex justify-between items-center">
//           <h1 className="text-2xl font-bold">Campus Navigator</h1>
//           <button
//             onClick={toggleDarkMode}
//             className={`p-2 rounded-lg ${
//               isDarkMode
//                 ? "bg-gray-700 text-gray-100"
//                 : "bg-gray-200 text-gray-800"
//             }`}
//           >
//             {isDarkMode ? <CiLight /> : <MdDarkMode />}
//           </button>
//         </div>

//         {/* Search Bar */}
//         <div
//           className={`flex items-center ${
//             isDarkMode ? "bg-gray-700" : "bg-gray-100"
//           } rounded-lg p-2 mb-4`}
//         >
//           <Search
//             className={`w-5 h-5 ${
//               isDarkMode ? "text-gray-400" : "text-gray-500"
//             }`}
//           />
//           <input
//             type="text"
//             placeholder="Search location..."
//             className={`bg-transparent ml-2 w-full outline-none ${
//               isDarkMode ? "text-gray-100" : "text-gray-800"
//             }`}
//           />
//         </div>

//         {/* Quick Filters */}
//         <div className="space-y-2 mb-6">
//           <button
//             className={`w-full p-2 text-left rounded-lg hover:${
//               isDarkMode ? "bg-gray-700" : "bg-blue-50"
//             } ${isDarkMode ? "text-blue-300" : "text-blue-700"}`}
//           >
//             ♿️ Accessible Routes
//           </button>
//           <button
//             className={`w-full p-2 text-left rounded-lg hover:${
//               isDarkMode ? "bg-gray-700" : "bg-blue-50"
//             } ${isDarkMode ? "text-blue-300" : "text-blue-700"}`}
//           >
//             <span className="mr-2 flex">
//             Restrooms
//               <FaElevator />
//             </span>
//           </button>
//           <button
//             className={`w-full p-2 text-left rounded-lg hover:${
//               isDarkMode ? "bg-gray-700" : "bg-blue-50"
//             } ${
//               isDarkMode ? "text-blue-300" : "text-blue-700"
//             } flex items-center`}
//           >
//             <span className="mr-2 flex">
//               < IoMdFemale /><IoMdMale />
//             </span>
//             Elevators
//           </button>
//         </div>

//         {/* Floor Selector */}
//         <div className="mb-6">
//           <h2 className="font-semibold mb-2">Floor Level</h2>
//           <div className="flex gap-2">
//             <button
//               className={`p-2 rounded ${
//                 isDarkMode ? "bg-blue-500 text-white" : "bg-blue-600 text-white"
//               }`}
//             >
//               1
//             </button>
//             <button
//               className={`p-2 rounded hover:${
//                 isDarkMode ? "bg-gray-700" : "bg-gray-100"
//               }`}
//             >
//               2
//             </button>
//             <button
//               className={`p-2 rounded hover:${
//                 isDarkMode ? "bg-gray-700" : "bg-gray-100"
//               }`}
//             >
//               3
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Main Content - Map View */}
//       <div className="flex-1 p-4">
//         {/* Top Navigation Bar */}
//         <div className="flex justify-between items-center mb-4">
//           <div className="flex gap-4">
//             <button
//               className={`p-2 rounded-lg hover:${
//                 isDarkMode ? "bg-gray-700" : "bg-gray-100"
//               }`}
//             >
//               <Map
//                 className={`w-5 h-5 ${
//                   isDarkMode ? "text-gray-400" : "text-gray-800"
//                 }`}
//               />
//             </button>
//             <button
//               className={`p-2 rounded-lg hover:${
//                 isDarkMode ? "bg-gray-700" : "bg-gray-100"
//               }`}
//             >
//               <Info
//                 className={`w-5 h-5 ${
//                   isDarkMode ? "text-gray-400" : "text-gray-800"
//                 }`}
//               />
//             </button>
//           </div>
//           <button
//             className={`p-2 rounded-lg hover:${
//               isDarkMode ? "bg-gray-700" : "bg-gray-100"
//             }`}
//           >
//             <Settings
//               className={`w-5 h-5 ${
//                 isDarkMode ? "text-gray-400" : "text-gray-800"
//               }`}
//             />
//           </button>
//         </div>

//         {/* Map Container */}
//         <div
//           className={`${
//             isDarkMode ? "bg-gray-800" : "bg-white"
//           } rounded-lg shadow-lg p-4 h-[calc(100%-4rem)]`}
//         >
//           {/* Your existing map content would go here */}
//           <div
//             className={`w-full h-full border-2 border-dashed ${
//               isDarkMode ? "border-gray-600" : "border-gray-300"
//             } rounded-lg flex items-center justify-center`}
//           >
//             <span
//               className={`${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
//             >
//               Map View
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* Right Sidebar - Details Panel */}
//       <div
//         className={`w-72 ${
//           isDarkMode ? "bg-gray-800" : "bg-white"
//         } shadow-lg p-4`}
//       >
//         <h2 className="text-xl font-semibold mb-4">Location Details</h2>
//         <div className="space-y-4">
//           <div
//             className={`p-3 ${
//               isDarkMode ? "bg-gray-700" : "bg-gray-50"
//             } rounded-lg`}
//           >
//             <h3 className="font-medium">Current Location</h3>
//             <p className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
//               Building A, Floor 1
//             </p>
//           </div>
//           <div
//             className={`p-3 ${
//               isDarkMode ? "bg-gray-700" : "bg-gray-50"
//             } rounded-lg`}
//           >
//             <h3 className="font-medium">Accessibility Features</h3>
//             <ul
//               className={`${
//                 isDarkMode ? "text-gray-400" : "text-gray-600"
//               } list-disc ml-4`}
//             >
//               <li>Wheelchair accessible</li>
//               <li>Automatic doors</li>
//               <li>Accessible restroom nearby</li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WayfindingApp;
