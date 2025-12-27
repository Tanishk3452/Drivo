import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CaptainSignup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");

  const { captain, setCaptain } = React.useContext(CaptainDataContext);
  const submitHandler = async (e) => {
    e.preventDefault();
    const captainData = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicletype: vehicleType,
      },
    };
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/captains/register`,
      captainData
    );
    if (response.status === 201) {
      const data = response.data;
      setCaptain(data.captain);
      localStorage.setItem("token", data.token);
      navigate("/captain-home");
    }
    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
    setVehicleColor("");
    setVehiclePlate("");
    setVehicleCapacity("");
    setVehicleType("");
  };

  return (
    <>
      <div className=" pt-8 relative z-0 bg-center bg-cover bg-[url(../public\photos\captain.jpg)] h-screen  flex  flex-col w-full   ">
        <div className="absolute inset-0 bg-black/4 backdrop-blur-sm"></div>
        <img
          className="ml-2 z-1 w-16 "
          src="../../../public/photos/drivoWhite.png"
        />
        <div className="p-7 pt-1 z-10 h-screen flex  flex-col justify-between ">
          <div>
            <form
              onSubmit={(e) => {
                submitHandler(e);
              }}
            >
              <h3 className="text-base pt-2 pb-3 rounded  text-white font-medium ">
                Write our Captain's name
              </h3>
              <div className="flex gap-2 mb-2">
                <input
                  required
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                  className="bg-[#eeeeee]  rounded px-4 py-2 border w-1/2 text-lg placeholder:text-[15px] "
                  type="text"
                  placeholder="First Name "
                />
                <input
                  required
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                  className="bg-[#eeeeee]  rounded px-4 py-2 border w-1/2 text-lg placeholder:text-[15px]"
                  type="text"
                  placeholder="Last Name "
                />
              </div>
              <h3 className="text-base pt-2 pb-3 rounded  text-white font-medium ">
                Write our Captain's email
              </h3>
              <input
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="bg-[#eeeeee] mb-3 rounded px-4 py-2 border w-full text-lg placeholder:text-[15px]"
                type="email"
                placeholder="email@example.com "
              />
              <h3 className="text-base pt-2 pb-3 rounded  text-white font-medium ">
                Set Password
              </h3>
              <input
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="password"
                className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-[15px] "
                placeholder="password"
              />
              <h3 className="text-base pt-2 pb-3 rounded text-white font-medium">
                Vehicle Information
              </h3>
              <div className="flex gap-2 mb-2">
                <input
                  required
                  value={vehicleColor}
                  onChange={(e) => {
                    setVehicleColor(e.target.value);
                  }}
                  className="bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-lg placeholder:text-[15px]"
                  type="text"
                  placeholder="Vehicle Color"
                />
                <input
                  required
                  value={vehiclePlate}
                  onChange={(e) => {
                    setVehiclePlate(e.target.value);
                  }}
                  className="bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-lg placeholder:text-[15px]"
                  type="text"
                  placeholder="Vehicle Plate"
                />
              </div>
              <div className="flex gap-2 mb-2">
                <input
                  required
                  value={vehicleCapacity}
                  onChange={(e) => {
                    setVehicleCapacity(e.target.value);
                  }}
                  className="bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-lg placeholder:text-[15px]"
                  type="number"
                  placeholder="Vehicle Capacity"
                />
                <select
                  required
                  value={vehicleType}
                  onChange={(e) => {
                    setVehicleType(e.target.value);
                  }}
                  className="bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-lg placeholder:text-[15px]"
                >
                  <option value="" disabled>
                    Select Vehicle Type
                  </option>
                  <option value="car">Car</option>
                  <option value="motorcycle">Moto</option>
                  <option value="auto">Auto</option>
                </select>
              </div>
              <button className=" bg-[#0c3c95] text-white mb-2 rounded px-4 py-2  w-full text-lg placeholder:text-base ">
                Create Captain Account
              </button>
              <p className="text-white text-center">
                Already have a account ?
                <Link to="/captain-login" className="text-blue-600 pl-2">
                  Login here
                </Link>
              </p>
            </form>
          </div>
          <div>
            <p className="text-[10px] text-white leading-tight ">
              This site is protected by reCAPTCHA and the{" "}
              <span className="underline">Google privacy policy </span> and{" "}
              <span className="underline"> Terms of Service apply </span> .
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CaptainSignup;
