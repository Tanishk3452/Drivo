import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { IoLocation } from "react-icons/io5";
import { RiArrowDownWideFill, RiMoneyRupeeCircleFill } from "react-icons/ri";

const RidePopUp = ({
  ride,
  setRidePopUpPanel,
  setConfirmRidePopUpPanel,
  confirmRide,
}) => {
  return (
    <div className="relative bg-white rounded-2xl p-2 shadow-xl">
      {/* Close Icon */}
      <RiArrowDownWideFill
        onClick={() => setRidePopUpPanel(false)}
        className="text-2xl text-gray-400 absolute -top-6 left-1/2 -translate-x-1/2 cursor-pointer"
      />

      {/* Title */}
      <h3 className="text-2xl font-semibold text-center mb-5">
        New Ride Request
      </h3>

      {/* User Info */}
      <div className="flex items-center justify-between p-4 bg-yellow-400 rounded-xl">
        <div className="flex items-center gap-3">
          <img
            className="h-12 w-12 rounded-full object-cover border"
            src="/photos/randompeople.jpeg"
            alt="User"
            onError={(e) => (e.target.src = "/photos/default-user.png")}
          />
          <h2 className="text-lg font-medium">
            {ride?.user?.fullname?.firstname} {ride?.user?.fullname?.lastname}
          </h2>
        </div>

        {/* Distance Badge */}
        <span className="bg-black text-white text-xs px-3 py-1 rounded-full">
          Nearby Ride
        </span>
      </div>

      {/* Ride Details */}
      <div className="mt-5 space-y-3">
        {/* Pickup */}
        <div className="flex gap-4 p-3 border-b">
          <FaLocationDot className="text-xl text-green-600" />
          <div>
            <h4 className="font-medium">{ride?.pickup}</h4>
            <p className="text-sm text-gray-600">Pickup</p>
          </div>
        </div>

        {/* Destination */}
        <div className="flex gap-4 p-3 border-b">
          <IoLocation className="text-xl text-red-500" />
          <div>
            <h4 className="font-medium">{ride?.destination}</h4>
            <p className="text-sm text-gray-600">Destination</p>
          </div>
        </div>

        {/* Fare */}
        <div className="flex gap-4 p-3">
          <RiMoneyRupeeCircleFill className="text-2xl text-green-700" />
          <div>
            <h4 className="font-medium">₹{ride?.fare}</h4>
            <p className="text-sm text-gray-600">Cash Payment</p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-between mt-6">
        <button
          onClick={() => setRidePopUpPanel(false)}
          className="bg-gray-200 hover:bg-gray-300 transition text-gray-700 font-semibold px-8 py-3 rounded-xl"
        >
          Ignore
        </button>

        <button
          onClick={() => {
            setConfirmRidePopUpPanel(true);
            setRidePopUpPanel(false);
            confirmRide();
          }}
          className="bg-green-600 hover:bg-green-700 transition text-white font-semibold px-8 py-3 rounded-xl"
        >
          Accept
        </button>
      </div>
    </div>
  );
};

export default RidePopUp;
