import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import CaptainDetails from "../../components/CaptainDetails";
import RidePopUp from "../../components/RidePopUp";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ConfirmRidePopUp from "../../components/ConfirmRidePopUp";
import { SocketContext } from "../context/SocketContext";
import { useContext } from "react";
import { CaptainDataContext } from "../context/CaptainContext";
import LiveTracking from "../../components/LiveTracking";
import axios from "axios";

const CaptainHome = () => {
  const [ridePopUpPanel, setRidePopUpPanel] = useState(false);

  const ridePopUppanelRef = useRef(null);

  const [confirmridePopUpPanel, setConfirmRidePopUpPanel] = useState(false);

  const confirmridePopUppanelRef = useRef(null);
  const [ride, setRide] = useState(null);

  const { socket } = useContext(SocketContext);
  const { captain } = useContext(CaptainDataContext);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/captain-login");
    }
  }, [navigate]);

  useEffect(() => {
    socket.emit("join", { userId: captain._id, userType: "captain" });

    const locationInterval = setInterval(() => {
      navigator.geolocation.getCurrentPosition((position) => {
        socket.emit("update-location-captain", {
          userId: captain._id,
          location: {
            ltd: position.coords.latitude,
            lng: position.coords.longitude,
          },
        });
      });
    }, 10000);

    // return () => clearInterval(locationInterval);
  }, [captain]);

  socket.on("new-ride", (data) => {
    setRide(data);
    setRidePopUpPanel(true);
  });

  async function confirmRide() {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/confirm`,
      {
        rideId: ride._id,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  }

  useGSAP(() => {
    if (ridePopUpPanel) {
      gsap.to(ridePopUppanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(ridePopUppanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [ridePopUpPanel]);

  useGSAP(() => {
    if (confirmridePopUpPanel) {
      gsap.to(confirmridePopUppanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(confirmridePopUppanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [confirmridePopUpPanel]);
  return (
    <div className="h-screen relative">
      {/* 🗺️ MAP — BASE LAYER */}
      <LiveTracking follow={true} />

      {/* UI OVERLAY */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {/* 🔝 HEADER */}
        <div className="flex items-center justify-between w-full fixed p-4 top-0 pointer-events-auto">
          <img className="w-16" src="/photos/drivoBlack.png" />

          <Link
            className="flex h-8 w-8 bg-white items-center justify-center rounded-full"
            to="/captain/logout"
          >
            <IoIosLogOut className="h-7 w-7" />
          </Link>
        </div>

        {/* 👤 CAPTAIN DETAILS (FLOATING CARD) */}
        <div className="absolute bottom-0 w-full bg-white p-4 rounded-t-2xl pointer-events-auto z-20">
          <CaptainDetails />
        </div>
      </div>

      {/* 🚨 RIDE POPUP */}
      <div
        ref={ridePopUppanelRef}
        className="fixed z-30 w-full bottom-0 bg-white px-3 py-6 pt-12 translate-y-full"
      >
        <RidePopUp
          ride={ride}
          setRidePopUpPanel={setRidePopUpPanel}
          setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
          confirmRide={confirmRide}
        />
      </div>

      {/* ✅ CONFIRM POPUP */}
      <div
        ref={confirmridePopUppanelRef}
        className="fixed z-30 w-full bottom-0 bg-white px-3 py-6 pt-12 translate-y-full h-screen"
      >
        <ConfirmRidePopUp
          ride={ride}
          setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
          setRidePopUpPanel={setRidePopUpPanel}
        />
      </div>
    </div>
  );
};

export default CaptainHome;
