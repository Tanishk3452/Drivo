import React, { useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import FinishRide from "../../components/FinishRide";
import LiveTracking from "../../components/LiveTracking";

const CaptainRiding = () => {
  const location = useLocation();
  const rideData = location.state?.ride;

  const finishRidePanelRef = useRef(null);
  const [finishRidePanel, setFinishRidePanel] = useState(false);

  // GSAP CONTROLS PANEL (NO TAILWIND TRANSLATE)
  useGSAP(() => {
    gsap.to(finishRidePanelRef.current, {
      y: finishRidePanel ? "0%" : "100%",
      duration: 0.4,
      ease: "power3.out",
    });
  }, [finishRidePanel]);

  return (
    <div className="h-screen relative overflow-hidden">
      {/* MAP BACKGROUND */}
      <LiveTracking />

      {/* TOP BAR */}
      <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between p-4">
        <img
          className="w-16"
          src="../../../public/photos/drivoBlack.png"
          alt="Uber"
        />

        <Link
          className="flex h-9 w-9 bg-white items-center justify-center rounded-full shadow"
          to="/home"
        >
          <IoIosLogOut className="h-6 w-6" />
        </Link>
      </div>

      {/* BOTTOM STRIP */}
      <div
        className="absolute bottom-4 left-4 right-4 z-20 h-[10%] bg-yellow-300 p-3 flex items-center justify-center cursor-pointer rounded-lg shadow-md"
        onClick={() => setFinishRidePanel(true)}
      >
        <h5 className="text-lg font-semibold text-black">
          Tap to finish the ride
        </h5>
      </div>

      {/* FINISH RIDE PANEL */}
      <div
        ref={finishRidePanelRef}
        className="fixed bottom-0 left-0 w-full h-screen bg-white z-40"
      >
        <FinishRide
          rideData={rideData}
          setFinishRidePanel={setFinishRidePanel}
        />
      </div>
    </div>
  );
};

export default CaptainRiding;
