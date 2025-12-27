import React from "react";
import { RiArrowDownWideFill } from "react-icons/ri";
import { FaUser, FaLocationDot } from "react-icons/fa6";
import { IoLocation } from "react-icons/io5";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";

const WaitingForDriver = (props) => {
  return (
    <div className="p-6 bg-gray-50 h-full">
      <RiArrowDownWideFill
        onClick={() => {
          props.setWaitingForDriver(false);
        }}
        className="text-3xl text-gray-500 absolute top-4 left-1/2 transform -translate-x-1/2 cursor-pointer"
      />

      <div className="flex items-center justify-between mb-6">
        <img
          className="h-20 w-20 object-cover rounded-lg"
          src="../public/photos/UberGo.jpeg"
          alt="Vehicle"
        />
        <div className="text-right">
          <h2 className="text-xl font-semibold capitalize">
            {props.ride?.captain.fullname.firstname}{" "}
            {props.ride?.captain.fullname.lastname}
          </h2>
          <h4 className="text-lg font-medium text-gray-700">
            {props.ride?.captain.vehicle.plate}
          </h4>
          <h1 className="text-lg font-bold text-blue-600">
            OTP: {props.ride?.otp}
          </h1>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-md">
          <FaLocationDot className="text-2xl text-red-500" />
          <div>
            <h3 className="text-lg font-medium">{props.ride?.pickup}</h3>
            <p className="text-sm text-gray-500">Pickup Location</p>
          </div>
        </div>

        <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-md">
          <IoLocation className="text-2xl text-blue-500" />
          <div>
            <h3 className="text-lg font-medium">{props.ride?.destination}</h3>
            <p className="text-sm text-gray-500">Drop-off Location</p>
          </div>
        </div>

        <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-md">
          <RiMoneyRupeeCircleFill className="text-2xl text-green-500" />
          <div>
            <h3 className="text-lg font-medium">₹{props.ride?.fare}</h3>
            <p className="text-sm text-gray-500">Fare Amount</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitingForDriver;
