import React from 'react';
import { 
  FiSearch, 
  FiMap, 
  FiInfo, 
  FiSettings 
} from 'react-icons/fi';
import { 
  Accordion, 
  AccordionItem, 
  AccordionTrigger, 
  AccordionContent, 
  AccordionHeader, 
  AccordionPanel 
} from '@radix-ui/react-accordion';
import { 
  Tabs, 
  TabsList, 
  TabsTrigger, 
  TabsContent, 
  TabsPanel 
} from '@radix-ui/react-tabs';

const WayfindingApp = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Sidebar - Navigation Controls */}
      <div className="w-64 bg-white shadow-lg p-4">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Campus Navigator</h1>
        </div>
        
        {/* Search Bar */}
        <div className="flex items-center bg-gray-100 rounded-lg p-2 mb-4">
          <FiSearch className="w-5 h-5 text-gray-500" />
          <input 
            type="text"
            placeholder="Search location..."
            className="bg-transparent ml-2 w-full outline-none"
          />
        </div>

        {/* Quick Filters */}
        <div className="space-y-2 mb-6">
          <button className="w-full p-2 text-left rounded-lg hover:bg-blue-50 text-blue-700">
            ♿️ Accessible Routes
          </button>
          <button className="w-full p-2 text-left rounded-lg hover:bg-blue-50 text-blue-700">
            🚻 Restrooms
          </button>
          <button className="w-full p-2 text-left rounded-lg hover:bg-blue-50 text-blue-700">
            🛗 Elevators
          </button>
        </div>

        {/* Floor Selector */}
        <div className="mb-6">
          <h2 className="font-semibold mb-2">Floor Level</h2>
          <div className="flex gap-2">
            <button className="p-2 rounded bg-blue-600 text-white">1</button>
            <button className="p-2 rounded hover:bg-gray-100">2</button>
            <button className="p-2 rounded hover:bg-gray-100">3</button>
          </div>
        </div>
      </div>

      {/* Main Content - Map View */}
      <div className="flex-1 p-4">
        {/* Top Navigation Bar */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-4">
            <button className="p-2 rounded-lg hover:bg-gray-100">
              <FiMap className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-lg hover:bg-gray-100">
              <FiInfo className="w-5 h-5" />
            </button>
          </div>
          <button className="p-2 rounded-lg hover:bg-gray-100">
            <FiSettings className="w-5 h-5" />
          </button>
        </div>

        {/* Map Container */}
        <div className="bg-white rounded-lg shadow-lg p-4 h-[calc(100%-4rem)]">
          {/* Your existing map content would go here */}
          <div className="w-full h-full border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
            <span className="text-gray-500">Map View</span>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Details Panel */}
      <div className="w-72 bg-white shadow-lg p-4">
        <h2 className="text-xl font-semibold mb-4">Location Details</h2>
        <Accordion type="single" collapsible>
          <AccordionItem value="current-location">
            <AccordionHeader>
              <AccordionTrigger className="p-3 bg-gray-50 rounded-lg">
                <h3 className="font-medium">Current Location</h3>
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent>
              <AccordionPanel className="p-3 bg-gray-50 rounded-lg">
                <p className="text-gray-600">Building A, Floor 1</p>
              </AccordionPanel>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="accessibility-features">
            <AccordionHeader>
              <AccordionTrigger className="p-3 bg-gray-50 rounded-lg">
                <h3 className="font-medium">Accessibility Features</h3>
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent>
              <AccordionPanel className="p-3 bg-gray-50 rounded-lg">
                <ul className="text-gray-600 list-disc ml-4">
                  <li>Wheelchair accessible</li>
                  <li>Automatic doors</li>
                  <li>Accessible restroom nearby</li>
                </ul>
              </AccordionPanel>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default WayfindingApp;
