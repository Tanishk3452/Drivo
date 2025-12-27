import React, { useEffect, useContext } from "react";
import { IoLocation } from "react-icons/io5";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";

import { SocketContext } from "../context/SocketContext";
import LiveTracking from "../../components/LiveTracking";

const Riding = () => {
  const location = useLocation();
  const ride = location.state?.ride;

  const { socket } = useContext(SocketContext);
  const navigate = useNavigate();

  // ✅ listen ride end safely
  useEffect(() => {
    socket.on("ride-ended", () => {
      navigate("/home");
    });

    return () => {
      socket.off("ride-ended");
    };
  }, [socket, navigate]);

  return (
    <div className="h-screen relative">
      {/* ================= MAP LAYER ================= */}
      <div className="absolute inset-0 z-0">
        <LiveTracking follow />
      </div>

      {/* ================= UI LAYER ================= */}
      <div className="absolute bottom-0 w-full z-10 bg-white rounded-t-2xl p-5 shadow-lg">
        {/* DRIVER INFO */}
        <div className="flex items-center justify-between mb-5">
          <img
            className="h-12 w-12 object-cover rounded-full"
            src="../public/photos/UberGo.jpeg"
            alt="vehicle"
          />
          <div className="text-right">
            <h2 className="text-base font-medium text-gray-800">
              {ride?.captain?.fullname?.firstname +
                " " +
                ride?.captain?.fullname?.lastname || "Driver"}
            </h2>
            <h4 className="text-sm font-semibold text-gray-600">
              {ride?.captain.vehicle?.plate || "MP-04 BA 2448"}
            </h4>
          </div>
        </div>

        {/* LOCATION + FARE */}
        <div className="w-full space-y-4">
          <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg shadow-md">
            <IoLocation className="text-lg text-blue-500" />
            <div>
              <h3 className="text-sm font-medium text-gray-800">
                {ride?.pickup || "Pickup location"}
              </h3>
              <p className="text-xs text-gray-500">
                {ride?.pickupDetails || "On the way"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg shadow-md">
            <RiMoneyRupeeCircleFill className="text-lg text-green-500" />
            <div>
              <h3 className="text-sm font-medium text-gray-800">
                ₹{ride?.fare || "0"}
              </h3>
              <p className="text-xs text-gray-500">Payment Method: Cash</p>
            </div>
          </div>
        </div>

        {/* PAY BUTTON */}
        <button className="mt-5 w-full bg-green-600 text-white font-medium py-3 rounded-lg shadow-md hover:bg-green-700 transition">
          Make a Payment
        </button>
      </div>
    </div>
  );
};

export default Riding;
