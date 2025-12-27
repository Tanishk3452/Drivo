import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import Usercontext from "./assets/context/Usercontext.jsx";
import CaptainContext from "./assets/context/CaptainContext.jsx";
import SocketProvider from "./assets/context/SocketContext.jsx";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SocketProvider>
      <CaptainContext>
        <Usercontext>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Usercontext>
      </CaptainContext>
    </SocketProvider>
  </StrictMode>
);
