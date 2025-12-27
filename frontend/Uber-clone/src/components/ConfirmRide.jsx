import React from "react";
import { RiArrowDownWideFill } from "react-icons/ri";
import { FaLocationDot } from "react-icons/fa6";
import { IoLocation } from "react-icons/io5";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";

const ConfirmRide = (props) => {
  return (
    <div className="p-4 bg-gray-50 h-full relative">
      <RiArrowDownWideFill
        onClick={() => {
          props.setVehiclePanel(false);
          props.setConfirmRidePanel(false);
        }}
        className="text-2xl text-gray-500 absolute top-3 left-1/2 transform -translate-x-1/2 cursor-pointer"
      />
      <h3 className="text-2xl font-semibold mb-5 text-center pt-3 text-blue-800">
        Confirm Your Ride
      </h3>

      <div className="flex flex-col items-center gap-4">
        <div className="w-full p-3 bg-white rounded-lg shadow-md flex justify-center">
          <img
            className="h-20 object-contain rounded-lg"
            src="../public/photos/UberGo.jpeg"
            alt="Vehicle"
          />
        </div>

        <div className="w-full space-y-3">
          <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-md">
            <FaLocationDot className="text-xl text-red-500" />
            <div>
              <h3 className="text-base font-medium">{props.pickup}</h3>
              <p className="text-sm text-gray-500">Pickup Location</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-md">
            <IoLocation className="text-xl text-blue-500" />
            <div>
              <h3 className="text-base font-medium">{props.destination}</h3>
              <p className="text-sm text-gray-500">Drop-off Location</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-md">
            <RiMoneyRupeeCircleFill className="text-xl text-green-500" />
            <div>
              <h3 className="text-base font-medium">
                ₹{props.fare[props.vehicleType]}
              </h3>
              <p className="text-sm text-gray-500">Fare Amount</p>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            props.createRide();
            props.setVehicleFound(true);
            props.setConfirmRidePanel(false);
            props.setVehiclePanel(false);
          }}
          className="mt-4 w-full bg-green-600 text-white font-semibold py-2 rounded-lg shadow-md hover:bg-green-700 transition"
        >
          Confirm Ride
        </button>
      </div>
    </div>
  );
};

export default ConfirmRide;
