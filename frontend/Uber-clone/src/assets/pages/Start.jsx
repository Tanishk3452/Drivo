import React from "react";
import { FaArrowRight } from "react-icons/fa";

import { Link } from "react-router-dom";

const Start = () => {
  return (
    <div>
      <div className=" pt-8 relative bg-center bg-cover bg-[url(../public\photos\Homepage.jpg)] h-screen  flex justify-between flex-col w-full   ">
        {/* <div className="absolute inset-0 bg-black/4 backdrop-blur-sm"></div> */}
        <img
          className="ml-2 z-1 w-16 "
          src="../../../public/photos/drivoWhite.png"
        />
        <div className="z-2 bg-white pb-7 py-5 px-10">
          <h2 className="text-2xl font-bold">Get Started with Drivo</h2>
          <Link
            to="/login"
            className=" font-medium relative w-full bg-black text-white py-3 mt-4 rounded-lg flex items-center justify-center gap-3"
          >
            Continue
            <FaArrowRight className="w-4 h-4 mt-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Start;
