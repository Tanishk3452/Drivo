import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const CaptainLogout = () => {
  const token = localStorage.getItem("token");
  const [confirmLogout, setConfirmLogout] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/captains/logout`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          localStorage.removeItem("token");
          navigate("/captain-login");
        }
      });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      {!confirmLogout ? (
        <>
          <h2 className="text-xl font-semibold mb-4">
            Are you sure you want to logout?
          </h2>
          <div className="flex space-x-4">
            <button
              onClick={() => {
                setConfirmLogout(true);
                handleLogout();
              }}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Yes
            </button>
            <button
              onClick={() => navigate("/captain-home")}
              className="bg-gray-600 px-4 py-2 rounded "
            >
              No
            </button>
          </div>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default CaptainLogout;
