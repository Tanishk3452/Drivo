import React, { useRef, useState, useEffect, useContext } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import axios from "axios";
import { RiArrowDownWideLine } from "react-icons/ri";
import { useNavigate, Link } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";

import LocationSearchPanel from "../../components/LocationSearchPanel";
import VehiclePanel from "../../components/VehiclePanel";
import LiveTracking from "../../components/LiveTracking";
import ConfirmRide from "../../components/ConfirmRide";
import LookingForDriver from "../../components/LookingForDriver";
import WaitingForDriver from "../../components/WaitingForDriver";

import { SocketContext } from "../context/SocketContext";
import { UserDataContext } from "../context/Usercontext";

const HomeOG = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [activeField, setActiveField] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  const [panelOpen, setPanelOpen] = useState(false);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);

  const [fare, setFare] = useState({});
  const [vehicleType, setVehicleType] = useState(null);
  const [ride, setRide] = useState(null);

  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);

  const navigate = useNavigate();
  const { socket } = useContext(SocketContext);
  const { user } = useContext(UserDataContext);

  // SOCKET JOIN
  useEffect(() => {
    socket.emit("join", { userId: user._id, userType: "user" });
  }, [user]);

  // SOCKET EVENTS
  useEffect(() => {
    const rideConfirmed = (data) => {
      setVehicleFound(false);
      setWaitingForDriver(true);
      setRide(data);
    };

    const rideStarted = (data) => {
      setWaitingForDriver(false);

      navigate("/riding", { state: { ride: data } });
    };

    socket.on("ride-confirmed", rideConfirmed);
    socket.on("ride-started", rideStarted);

    return () => {
      socket.off("ride-confirmed", rideConfirmed);
      socket.off("ride-started", rideStarted);
    };
  }, [socket, navigate]);

  const token = localStorage.getItem("token");

  // SUGGESTIONS
  useEffect(() => {
    const query = activeField === "pickup" ? pickup : destination;
    if (!query || query.length < 3 || !panelOpen) return setSuggestions([]);

    axios
      .get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
        params: { input: query },
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setSuggestions(res.data.data.map((i) => i.displayName)))
      .catch(() => setSuggestions([]));
  }, [pickup, destination, activeField, panelOpen]);

  // GSAP ANIMATIONS
  useGSAP(() => {
    gsap.to(panelRef.current, {
      height: panelOpen ? "70%" : "0%",
      duration: 0.3,
    });
  }, [panelOpen]);

  useGSAP(() => {
    gsap.to(vehiclePanelRef.current, {
      y: vehiclePanel ? "0%" : "100%",
      duration: 0.4,
      ease: "power3.out",
    });
  }, [vehiclePanel]);

  useGSAP(() => {
    gsap.to(confirmRidePanelRef.current, {
      y: confirmRidePanel ? "0%" : "100%",
      duration: 0.4,
      ease: "power3.out",
    });
  }, [confirmRidePanel]);

  useGSAP(() => {
    gsap.to(vehicleFoundRef.current, {
      y: vehicleFound ? "0%" : "100%",
      duration: 0.4,
      ease: "power3.out",
    });
  }, [vehicleFound]);

  useGSAP(() => {
    gsap.to(waitingForDriverRef.current, {
      y: waitingForDriver ? "0%" : "100%",
      duration: 0.4,
      ease: "power3.out",
    });
  }, [waitingForDriver]);

  async function findtrip() {
    setVehiclePanel(true);
    setPanelOpen(false);

    const res = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
      {
        params: { pickup, destination },
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setFare(res.data.fare);
  }

  async function createRide() {
    await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/create`,
      { pickup, destination, vehicleType },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  }

  return (
    <div className="h-screen relative overflow-hidden">
      <LiveTracking />

      {/* HEADER WITH LOGO AND LOGOUT */}
      <div className="absolute top-0 left-0 z-10 p-4 pointer-events-auto flex items-center justify-between w-full">
        <img className="w-16" src="/photos/drivoBlack.png" alt="Uber Logo" />
        <Link
          className="flex h-8 w-8 bg-white items-center justify-center rounded-full"
          to="/user/logout"
        >
          <IoIosLogOut className="h-7 w-7" />
        </Link>
      </div>

      {/* UI LAYER */}
      <div className="absolute inset-0 z-10 flex flex-col justify-end pointer-events-none">
        <div className="bg-white p-5 pointer-events-auto rounded-t-2xl">
          <h4 className="text-2xl font-semibold">Find a trip</h4>
          {panelOpen && (
            <RiArrowDownWideLine
              ref={panelCloseRef}
              className="absolute top-6 right-5 text-2xl cursor-pointer"
              onClick={() => setPanelOpen(false)}
            />
          )}

          <input
            value={pickup}
            onClick={() => {
              setPanelOpen(true);
              setActiveField("pickup");
            }}
            onChange={(e) => setPickup(e.target.value)}
            className="bg-[#eee] px-4 py-2 rounded-lg w-full mt-4"
            placeholder="Pickup location"
          />

          <input
            value={destination}
            onClick={() => {
              setPanelOpen(true);
              setActiveField("destination");
            }}
            onChange={(e) => setDestination(e.target.value)}
            className="bg-[#eee] px-4 py-2 rounded-lg w-full mt-3"
            placeholder="Destination"
          />

          <button
            onClick={findtrip}
            className="bg-black text-white w-full py-2 mt-4 rounded-lg"
          >
            Find Trip
          </button>
        </div>

        <div
          ref={panelRef}
          className="bg-white overflow-hidden pointer-events-auto"
        >
          <LocationSearchPanel
            suggestions={suggestions}
            onSelect={(loc) => {
              activeField === "pickup" ? setPickup(loc) : setDestination(loc);
              setSuggestions([]);
            }}
          />
        </div>
      </div>

      {/* PANELS */}
      <div
        ref={vehiclePanelRef}
        className="fixed bottom-0 w-full z-30 bg-white"
      >
        <VehiclePanel
          fare={fare}
          selectVehicle={setVehicleType}
          setVehiclePanel={setVehiclePanel}
          setConfirmRidePanel={setConfirmRidePanel}
        />
      </div>

      <div
        ref={confirmRidePanelRef}
        className="fixed bottom-0 w-full z-30 bg-white"
      >
        <ConfirmRide
          createRide={createRide}
          pickup={pickup}
          destination={destination}
          vehicleType={vehicleType}
          fare={fare}
          setVehicleFound={setVehicleFound}
          setVehiclePanel={setVehiclePanel}
          setConfirmRidePanel={setConfirmRidePanel}
        />
      </div>

      <div
        ref={vehicleFoundRef}
        className="fixed bottom-0 w-full z-30 bg-white"
      >
        <LookingForDriver
          setVehicleFound={setVehicleFound}
          pickup={pickup}
          destination={destination}
          vehicleType={vehicleType}
          fare={fare}
        />
      </div>

      <div
        ref={waitingForDriverRef}
        className="fixed bottom-0 w-full z-30 bg-white"
      >
        <WaitingForDriver
          ride={ride}
          setVehicleFound={setVehicleFound}
          waitingForDriver={waitingForDriver}
          setWaitingForDriver={setWaitingForDriver}
        />
      </div>
    </div>
  );
};

export default HomeOG;
