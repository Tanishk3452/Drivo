import React from "react";
import { FaLocationDot } from "react-icons/fa6";

const LocationSearchPanel = ({ suggestions, onSelect }) => {
  return (
    <div className="p-3">
      {suggestions.length === 0 && (
        <p className="text-gray-400 text-center mt-4">
          Start typing to see suggestions
        </p>
      )}

      {suggestions.map((location, idx) => (
        <div
          key={idx}
          onClick={() => onSelect(location)}
          className="flex gap-4 p-3 border border-gray-200 rounded-xl items-center my-2 cursor-pointer hover:bg-gray-100"
        >
          <div className="bg-[#eee] p-2 rounded-full">
            <FaLocationDot />
          </div>
          <h4 className="font-medium">{location}</h4>
        </div>
      ))}
    </div>
  );
};

export default LocationSearchPanel;
