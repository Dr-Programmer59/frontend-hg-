"use client";

import { useState } from "react";

const filterOptions = [
  "All",
  "Music",
  "Lo-fi",
  "Jukebox",
  "Mixes",
  "Sonu Nigam",
  "MasterChef Canada",
  "News",
  "Mohammed Irfan",
  "Disha Vakani",
  "Movie musicals",
];

export default function CategoryBar() {
  const [selectedFilter, setSelectedFilter] = useState("All");

  return (
    <div className="w-full bg-[#1F2226] p-4">
      <div className="flex flex-row max-w-full overflow-x-scroll no-scrollbar space-x-2">
        {filterOptions.map((option) => (
          <button
            key={option}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
              selectedFilter === option
                ? "bg-primary text-[#1F2226]"
                : "bg-[#2A2E33] text-white hover:bg-primary hover:text-[#1F2226]"
            }`}
            onClick={() => setSelectedFilter(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
