import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../context/Usercontext";

const UserSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userdata, setUserdata] = useState({});
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserDataContext);
  const submitHandler = async (e) => {
    e.preventDefault();
    const newUser = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email: email,
      password: password,
    };
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/register`,
      newUser
    );
    if (response.status === 201) {
      const data = response.data;
      setUser(data.user);
      localStorage.setItem("token", data.token);

      navigate("/home");
    }
    setEmail("");
    setFirstName("");
    setLastName("");
    setPassword("");
  };

  return (
    <>
      <div className=" pt-8 relative z-0 bg-center bg-cover bg-[url(../public\photos\user-login.webp)] h-screen  flex  flex-col w-full   ">
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
                Write your name
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
                Write your email
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
              <button className=" bg-[#0c3c95] text-white mb-2 rounded px-4 py-2  w-full text-lg placeholder:text-base ">
                Create Account
              </button>
              <p className="text-white text-center">
                Already have a account ?
                <Link to="/login" className="text-blue-600 pl-2">
                  Login here
                </Link>
              </p>
            </form>
          </div>
          <div>
            <p className="text-[10px] text-white leading-tight ">
              By proceeding, you consent to get calls, WhatsApp or SMS messages,
              including by automated means, from Uber and its affiliates to the
              number provided
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserSignup;
