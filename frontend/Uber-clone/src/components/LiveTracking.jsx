import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { FaLocationArrow } from "react-icons/fa";

const LiveTracking = ({ follow = false }) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const userLatLngRef = useRef(null);
  const watchIdRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) return;

    // 🗺️ MAP INIT
    mapRef.current = L.map(mapContainerRef.current, {
      zoomControl: false,
      attributionControl: false,
      dragging: true,
      scrollWheelZoom: true,
      doubleClickZoom: true,
      touchZoom: true,
    });

    // 🌍 TILE LAYER
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
    }).addTo(mapRef.current);

    // 🔍 ZOOM CONTROLS
    L.control.zoom({ position: "topright" }).addTo(mapRef.current);

    // 🔄 FIX SIZE
    setTimeout(() => {
      if (mapRef.current) {
        mapRef.current.invalidateSize();
      }
    }, 300);

    // 📡 LIVE LOCATION TRACKING
    // 📡 SUCCESS HANDLER
    const onLocationSuccess = (pos) => {
      const latlng = [pos.coords.latitude, pos.coords.longitude];
      userLatLngRef.current = latlng;

      if (!markerRef.current) {
        markerRef.current = L.marker(latlng).addTo(mapRef.current);
        mapRef.current.setView(latlng, 16);
      } else {
        markerRef.current.setLatLng(latlng);
      }

      if (follow) {
        if (mapRef.current) {
          mapRef.current.panTo(latlng, { animate: true, duration: 0.5 });
        }
      }
    };

    // ❌ ERROR HANDLER WITH FALLBACK
    const onLocationError = (err) => {
      if (err.code === 3) {
        console.warn("High accuracy timeout → retrying low accuracy");

        // Retry with LOW accuracy
        watchIdRef.current = navigator.geolocation.watchPosition(
          onLocationSuccess,
          (e) => console.error("Low accuracy failed", e),
          {
            enableHighAccuracy: false,
            timeout: 30000,
            maximumAge: 10000,
          }
        );
        return;
      }

      console.error("Geolocation error:", err);
    };

    // 📡 INITIAL HIGH-ACCURACY WATCH
    watchIdRef.current = navigator.geolocation.watchPosition(
      onLocationSuccess,
      onLocationError,
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 1000,
      }
    );

    return () => {
      if (watchIdRef.current) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
      mapRef.current.remove();
      mapRef.current = null;
    };
  }, [follow]);

  // 🎯 RECENTER BUTTON
  const recenterMap = () => {
    if (!mapRef.current || !userLatLngRef.current) return;

    mapRef.current.flyTo(userLatLngRef.current, 16, {
      animate: true,
      duration: 1,
    });
  };

  return (
    <>
      {/* MAP */}
      <div
        ref={mapContainerRef}
        className="absolute inset-0 z-0"
        style={{ pointerEvents: "auto" }}
      />

      {/* RECENTER */}
      <button
        onClick={recenterMap}
        className="absolute top-32 right-2 z-1000 bg-white rounded-full w-11 h-11 flex items-center justify-center shadow-lg"
      >
        <FaLocationArrow size={18} />
      </button>
    </>
  );
};

export default LiveTracking;
