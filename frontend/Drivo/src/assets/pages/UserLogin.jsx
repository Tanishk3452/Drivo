import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserDataContext } from "../context/Usercontext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // <-- For error messages

  const { user, setUser } = useContext(UserDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    const userData = { email, password };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/login`,
        userData
      );

      if (response.status === 200) {
        const data = response.data;
        setUser(data.user);
        localStorage.setItem("token", data.token);
        navigate("/home");
      }
    } catch (err) {
      // Handle errors
      if (err.response && err.response.status === 401) {
        setError("Wrong or invalid email or password");
      } else {
        setError("Something went wrong. Please try again.");
      }
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div className="pt-8 relative z-0 bg-center bg-cover bg-[url(../public/photos/user-login.webp)] h-screen flex flex-col w-full">
      <div className="absolute inset-0 bg-black/4 backdrop-blur-sm"></div>
      <img
        className="ml-2 z-1 w-16"
        src="../../../public/photos/drivoWhite.png"
      />
      <div className="p-7 z-10 h-screen flex flex-col justify-between">
        <div>
          <form onSubmit={submitHandler}>
            <h3 className="text-xl pt-2 pb-3 text-white font-medium mb-2">
              What's your email?
            </h3>
            <input
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
              type="email"
              placeholder="email@example.com"
            />
            <h3 className="text-xl pt-2 pb-3 text-white font-medium mb-2">
              Enter Password
            </h3>
            <input
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
              placeholder="password"
            />

            {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

            <button className="bg-[#0c3c95] text-white mb-2 rounded px-4 py-2 w-full text-lg">
              Login
            </button>

            <p className="text-white text-center">
              New here?
              <Link to="/signup" className="text-blue-600 pl-2">
                Create new account
              </Link>
            </p>
          </form>
        </div>
        <div>
          <Link
            to="/captain-login"
            className="bg-[#6df16d] text-black mb-7 rounded px-4 py-2 w-full text-lg flex items-center justify-center"
          >
            Sign in as Captain
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
