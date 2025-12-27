import React from "react";
import { RiArrowDownWideFill } from "react-icons/ri";
import { FaLocationDot } from "react-icons/fa6";
import { IoLocation } from "react-icons/io5";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";

const LookingForDriver = (props) => {
  return (
    <div className="p-4 bg-gray-50 h-full relative">
      {/* Close Arrow */}
      <RiArrowDownWideFill
        onClick={() => props.setVehicleFound(false)}
        className="text-2xl text-gray-500 absolute top-3 left-1/2 transform -translate-x-1/2 cursor-pointer z-10"
      />

      <h3 className="text-xl font-semibold mb-4 text-center text-blue-800 mt-6">
        Looking For Captain
      </h3>

      <div className="flex flex-col items-center gap-4">
        <div className="w-full p-3 bg-white rounded-lg shadow-md flex justify-center">
          <img
            className="h-16 object-contain rounded-lg"
            src="/photos/UberGo.jpeg"
            alt="Vehicle"
          />
        </div>

        <div className="w-full space-y-3">
          <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-md">
            <FaLocationDot className="text-lg text-red-500" />
            <div>
              <h3 className="text-sm font-medium">{props.pickup}</h3>
              <p className="text-xs text-gray-500">Pickup</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-md">
            <IoLocation className="text-lg text-blue-500" />
            <div>
              <h3 className="text-sm font-medium">{props.destination}</h3>
              <p className="text-xs text-gray-500">Destination</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-md">
            <RiMoneyRupeeCircleFill className="text-lg text-green-500" />
            <div>
              <h3 className="text-sm font-medium">
                ₹{props.fare?.[props.vehicleType]}
              </h3>
              <p className="text-xs text-gray-500">Cash</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LookingForDriver;
