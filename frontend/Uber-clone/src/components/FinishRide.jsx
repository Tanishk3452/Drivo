import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { IoLocation } from "react-icons/io5";
import { RiArrowDownWideFill, RiMoneyRupeeCircleFill } from "react-icons/ri";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FinishRide = (props) => {
  const navigate = useNavigate();

  async function endRide() {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/end-ride`,
      {
        rideId: props.rideData._id,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.status === 200) {
      navigate("/captain-home");
    }
  }

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-md max-w-lg mx-auto relative">
      <RiArrowDownWideFill
        onClick={() => {
          props.setFinishRidePanel(false);
        }}
        className="text-2xl text-gray-500 absolute top-4 left-1/2 transform -translate-x-1/2 cursor-pointer"
      />
      <h3 className="text-xl font-semibold mb-5 pt-3 text-center text-blue-800">
        Finish this Ride
      </h3>

      <div className="flex items-center justify-between p-4 bg-yellow-100 rounded-lg shadow-md">
        <div className="flex items-center gap-4">
          <img
            className="h-12 w-12 rounded-full object-cover"
            src={
              props.rideData?.user.profilePicture ||
              "../public/photos/randompeople.jpeg"
            }
            alt="User"
          />
          <h2 className="text-base font-medium text-gray-800">
            {props.rideData?.user.fullname.firstname}{" "}
            {props.rideData?.user.fullname.lastname}
          </h2>
        </div>
        <h5 className="text-sm font-medium text-gray-600">Ride Completed</h5>
      </div>

      <div className="mt-5 space-y-4">
        <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-md">
          <FaLocationDot className="text-lg text-red-500" />
          <div>
            <h3 className="text-sm font-medium text-gray-800">
              {props.rideData?.pickup}
            </h3>
            <p className="text-xs text-gray-500">Pickup Location</p>
          </div>
        </div>

        <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-md">
          <IoLocation className="text-lg text-blue-500" />
          <div>
            <h3 className="text-sm font-medium text-gray-800">
              {props.rideData?.destination}
            </h3>
            <p className="text-xs text-gray-500">Drop-off Location</p>
          </div>
        </div>

        <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-md">
          <RiMoneyRupeeCircleFill className="text-lg text-green-500" />
          <div>
            <h3 className="text-sm font-medium text-gray-800">
              ₹{props.rideData?.fare}
            </h3>
            <p className="text-xs text-gray-500">Fare Amount</p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <button
          onClick={endRide}
          className="w-full bg-green-600 text-white font-medium py-3 rounded-lg shadow-md hover:bg-green-700 transition"
        >
          Complete Ride
        </button>
      </div>
    </div>
  );
};

export default FinishRide;
