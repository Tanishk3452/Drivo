import React, { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { IoLocation } from "react-icons/io5";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ConfirmRidePopUp = ({
  ride,
  setConfirmRidePopUpPanel,
  setRidePopUpPanel,
}) => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!otp.trim()) return;

    const token = localStorage.getItem("token");
    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/start-ride`,
        {
          rideId: ride._id,
          otp: otp.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setConfirmRidePopUpPanel(false);
        setRidePopUpPanel(false);
        navigate("/captain-riding", { state: { ride } });
      }
    } catch (error) {
      console.error("Error starting ride:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-t-3xl px-4 pt-3 pb-4 shadow-xl">
      {/* Drag Handle */}
      <div className="flex justify-center mb-2">
        <div className="w-12 h-1.5 bg-gray-300 rounded-full"></div>
      </div>

      <h3 className="text-xl font-semibold text-center mb-3">
        Confirm Ride & Start
      </h3>

      {/* User Card */}
      <div className="flex items-center justify-between bg-yellow-400 rounded-xl p-3">
        <div className="flex items-center gap-3">
          <img
            className="h-11 w-11 rounded-full object-cover"
            src="/photos/randompeople.jpeg"
            alt="User"
          />
          <span className="text-base font-medium">
            {ride?.user?.fullname?.firstname} {ride?.user?.fullname?.lastname}
          </span>
        </div>

        <span className="bg-black text-white text-sm px-2.5 py-1 rounded-full">
          Nearby
        </span>
      </div>

      {/* Pickup */}
      <div className="mt-3 flex gap-3 border-b pb-2">
        <FaLocationDot className="text-green-600 text-xl mt-1" />
        <div>
          <p className="text-base font-medium line-clamp-2">{ride?.pickup}</p>
          <p className="text-sm font-semibold text-gray-600">Pickup</p>
        </div>
      </div>

      {/* Destination */}
      <div className="mt-2 flex gap-3 border-b pb-2">
        <IoLocation className="text-red-500 text-xl mt-1" />
        <div>
          <p className="text-base font-medium line-clamp-2">
            {ride?.destination}
          </p>
          <p className="text-sm font-semibold text-gray-600">Destination</p>
        </div>
      </div>

      {/* Fare */}
      <div className="mt-2 flex gap-3">
        <RiMoneyRupeeCircleFill className="text-green-700 text-xl mt-1" />
        <div>
          <p className="text-base font-semibold">₹{ride?.fare}</p>
          <p className="text-sm font-medium text-gray-600">Cash</p>
        </div>
      </div>

      {/* OTP */}
      <input
        onChange={(e) => setOtp(e.target.value)}
        value={otp}
        type="text"
        placeholder="6-digit OTP"
        className="mt-3 bg-gray-100 px-4 py-3 text-lg rounded-xl w-full text-center tracking-widest font-mono focus:outline-none focus:ring-2 focus:ring-green-500"
      />

      {/* Buttons */}
      <button
        onClick={submitHandler}
        className="mt-3 w-full bg-green-600 text-white py-3 rounded-xl text-base font-semibold"
      >
        Confirm
      </button>

      <button
        onClick={() => setConfirmRidePopUpPanel(false)}
        className="mt-2 w-full bg-red-600 text-white py-3 rounded-xl text-base font-semibold"
      >
        Cancel
      </button>
    </div>
  );
};

export default ConfirmRidePopUp;
