import { Route, Routes } from "react-router-dom";
import "./App.css";
import Start from "./assets/pages/Start";
import UserLogin from "./assets/pages/UserLogin";
import UserSignup from "./assets/pages/UserSignup";
import CaptainLogin from "./assets/pages/CaptainLogin";
import CaptainSignup from "./assets/pages/CaptainSignup";
import Home from "./assets/pages/Home";
import React, { useContext } from "react";
import UserProtectWrapper from "./assets/pages/UserProtectWrapper";
import UserLogout from "./assets/pages/UserLogout";
import CaptainHome from "./assets/pages/CaptainHome";
import CaptainProtectWrapper from "./assets/pages/CaptainProtectWrapper";
import CaptainLogout from "./assets/pages/CaptainLogout";
import HomeOG from "./assets/pages/HomeOG";
import CaptainRiding from "./assets/pages/CaptainRiding";
import Riding from "./assets/pages/Riding";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Start />}></Route>
        <Route path="/login" element={<UserLogin />}></Route>
        <Route path="/signup" element={<UserSignup />}></Route>
        <Route path="/riding" element={<Riding />}></Route>
        <Route path="/captain-login" element={<CaptainLogin />}></Route>
        <Route path="/captain-signup" element={<CaptainSignup />}></Route>
        <Route
          path="/home"
          element={
            <UserProtectWrapper>
              <HomeOG />
            </UserProtectWrapper>
          }
        />

        <Route
          path="/user/logout"
          element={
            <UserProtectWrapper>
              <UserLogout />
            </UserProtectWrapper>
          }
        />

        <Route
          path="/captain-home"
          element={
            <CaptainProtectWrapper>
              <CaptainHome />
            </CaptainProtectWrapper>
          }
        />

        <Route
          path="/captain-riding"
          element={
            <CaptainProtectWrapper>
              <CaptainRiding />
            </CaptainProtectWrapper>
          }
        />

        <Route
          path="/captain/logout"
          element={
            <CaptainProtectWrapper>
              <CaptainLogout />
            </CaptainProtectWrapper>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
