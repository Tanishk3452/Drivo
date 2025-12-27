import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { CaptainDataContext } from "../context/CaptainContext";

const CaptainLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { setCaptain } = useContext(CaptainDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captains/login`,
        {
          email,
          password,
        }
      );

      if (response.status === 200) {
        const data = response.data;
        setCaptain(data.captain);
        localStorage.setItem("token", data.token);
        navigate("/captain-home");
      }
    } catch (err) {
      if (err.response?.status === 401 || err.response?.status === 400) {
        setError("Invalid email or password");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="pt-8 relative z-0 bg-center bg-cover bg-[url(../public/photos/captain.jpg)] h-screen flex flex-col w-full">
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

        <img
          className="ml-2 z-10 w-16"
          src="../../../public/photos/drivoWhite.png"
          alt="logo"
        />

        <div className="p-7 z-10 h-screen flex flex-col justify-between">
          <div>
            <form onSubmit={submitHandler}>
              <h3 className="text-xl pt-2 pb-3 text-white font-medium">
                What's your email Captain?
              </h3>

              <input
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg"
                type="email"
                placeholder="email@example.com"
              />

              <h3 className="text-xl pt-2 pb-3 text-white font-medium">
                Enter Password Captain
              </h3>

              <input
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg"
                placeholder="password"
              />

              <button
                disabled={loading}
                className={`${
                  loading ? "bg-gray-400" : "bg-[#0c3c95]"
                } text-white mb-2 rounded px-4 py-2 w-full text-lg transition`}
              >
                {loading ? "Logging in..." : "Login"}
              </button>

              {error && (
                <p className="text-red-400 text-sm text-center mt-2 font-medium">
                  {error}
                </p>
              )}

              <p className="text-white text-center mt-3">
                Want to earn?
                <Link to="/captain-signup" className="text-blue-400 pl-2">
                  Register as a Captain
                </Link>
              </p>
            </form>
          </div>

          <div>
            <Link
              to="/login"
              className="bg-[#d4e961] text-black mb-7 rounded px-4 py-2 w-full text-lg flex items-center justify-center"
            >
              Sign in as User
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CaptainLogin;
