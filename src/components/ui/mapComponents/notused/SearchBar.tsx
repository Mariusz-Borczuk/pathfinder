import { Search } from "lucide-react";
import { useState } from "react";
import { getTextClass } from "./Text_Class";


export const SearchBar = () => {
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <div className="relative mb-6">
            <label htmlFor="location-search" className="sr-only">
                Search for a location
            </label>
            <input
                id="location-search"
                type="search"
                placeholder="Search for a room..."
                className={`${getTextClass} w-full p-3 pl-10 bg-gray-700 text-gray-100 border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search locations"
            />
            <Search
                className="absolute left-3 top-3 text-gray-400"
                size={20}
                aria-hidden="true"
            />
        </div>
    );
};