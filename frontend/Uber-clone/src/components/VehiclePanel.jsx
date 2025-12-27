import { RiArrowDownWideFill } from "react-icons/ri";
import React from "react";
import { FaUser } from "react-icons/fa";

const VehiclePanel = (props) => {
  return (
    <div className="p-4 bg-gray-50 h-full relative">
      <RiArrowDownWideFill
        onClick={() => {
          props.setVehiclePanel(false);
        }}
        className="text-2xl text-gray-500 absolute top-3 left-1/2 transform -translate-x-1/2 cursor-pointer"
      />
      <h3 className="text-2xl font-semibold mb-4 text-center pt-2">
        Choose a Vehicle
      </h3>

      <div
        onClick={() => {
          props.setConfirmRidePanel(true);
          props.selectVehicle("car");
        }}
        className="flex mb-3 border-gray-300 hover:border-black border rounded-lg items-center w-full justify-between p-3 bg-white cursor-pointer"
      >
        <img className="h-12" src="../public/photos/UberGo.jpeg" alt="UberGo" />
        <div className="w-1/2">
          <h4 className="font-medium text-base flex items-center">
            <span className="mr-2">Car</span>
            <FaUser className="text-gray-600" />
            <span className="ml-1">4</span>
          </h4>

          <p className="font-normal text-xs text-gray-600">
            Affordable, compact rides for short distances
          </p>
        </div>
        <p className="text-base font-semibold">
          ₹
          {props.fare?.car ? (
            props.fare.car
          ) : (
            <span className="text-sm font-normal text-gray-500">
              Calculating…
            </span>
          )}
        </p>
      </div>

      <div
        onClick={() => {
          props.setConfirmRidePanel(true);
          props.selectVehicle("moto");
        }}
        className="flex mb-3 border-gray-300 hover:border-black border rounded-lg items-center w-full justify-between p-3 bg-white cursor-pointer"
      >
        <img className="h-10" src="../public/photos/Uberbike.jpeg" alt="Moto" />
        <div className="w-1/2">
          <h4 className="font-medium text-base flex items-center">
            <span className="mr-2">Moto</span>
            <FaUser className="text-gray-600" />
            <span className="ml-1">1</span>
          </h4>

          <p className="font-normal text-xs text-gray-600">
            Quick and budget-friendly motorcycle rides
          </p>
        </div>
        <p className="text-base font-semibold">
          ₹
          {props.fare?.moto ? (
            props.fare.moto
          ) : (
            <span className="text-sm font-normal text-gray-500">
              Calculating…
            </span>
          )}
        </p>
      </div>

      <div
        onClick={() => {
          props.setConfirmRidePanel(true);
          props.selectVehicle("auto");
        }}
        className="flex mb-3 border-gray-300 hover:border-black border rounded-lg items-center w-full justify-between p-3 bg-white cursor-pointer"
      >
        <img
          className="h-10"
          src="../public/photos/UberAuto.jpeg"
          alt="UberAuto"
        />
        <div className="w-1/2">
          <h4 className="font-medium text-base flex items-center">
            <span className="mr-2">Auto</span>
            <FaUser className="text-gray-600" />
            <span className="ml-1">3</span>
          </h4>

          <p className="font-normal text-xs text-gray-600">
            Convenient and affordable auto rides
          </p>
        </div>
        <p className="text-base font-semibold">
          ₹
          {props.fare?.auto ? (
            props.fare.auto
          ) : (
            <span className="text-sm font-normal text-gray-500">
              Calculating…
            </span>
          )}
        </p>
      </div>
    </div>
  );
};

export default VehiclePanel;
