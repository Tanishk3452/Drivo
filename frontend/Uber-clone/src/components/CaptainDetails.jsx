import React, { useContext } from "react";
import { IoMdTime } from "react-icons/io";
import { RiSpeedUpLine } from "react-icons/ri";
import { BiNotepad } from "react-icons/bi";
import { CaptainDataContext } from "../assets/context/CaptainContext";

const CaptainDetails = () => {
  const { captain } = useContext(CaptainDataContext);

  if (!captain) {
    return <div>Loading captain details...</div>;
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            className="h-10 w-10 rounded-full object-cover"
            src={captain.profilePicture || "../public/photos/randompeople.jpeg"}
            alt="Captain Profile"
          />
          <h4 className="text-lg font-medium capitalize">
            {captain.fullname.firstname} {captain.fullname.lastname}
          </h4>
        </div>
        <div>
          <h4 className="text-xl font-semibold">₹{captain.earnings || 275}</h4>
          <p className="text-sm text-gray-600">Earned</p>
        </div>
      </div>
      <div className="flex justify-center gap-5 bg-gray-100 rounded-xl mt-3">
        <div className="text-center">
          <IoMdTime className="w-full h-10" />
          <h5 className="text-lg font-medium">{captain.hoursOnline || 11}</h5>
          <p className="text-sm text-gray-600">Hours Online</p>
        </div>
        <div className="text-center">
          <RiSpeedUpLine className="w-full h-10" />
          <h5 className="text-lg font-medium">
            {captain.completedRides || 16}
          </h5>
          <p className="text-sm text-gray-600">Completed Rides</p>
        </div>
        <div className="text-center">
          <BiNotepad className="w-full h-10" />
          <h5 className="text-lg font-medium">{captain.reviews || 4.3}</h5>
          <p className="text-sm text-gray-600">Reviews</p>
        </div>
      </div>
    </>
  );
};

export default CaptainDetails;
