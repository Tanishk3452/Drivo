const axios = require("axios");
const geolib = require("geolib");
const captainModel = require("../models/captain.model");

function normalizeAddress(address) {
  if (!address) return "";
  const lower = address.toLowerCase();
  if (!lower.includes("india")) {
    return `${address}, India`;
  }
  return address;
}

/**
 * Get coordinates from address (ROBUST)
 */
module.exports.getAddressCordinates = async (address) => {
  try {
    const formattedAddress = normalizeAddress(address);

    const response = await axios.get(
      "https://nominatim.openstreetmap.org/search",
      {
        params: {
          q: formattedAddress,
          format: "json",
          addressdetails: 1,
          limit: 5,
          countrycodes: "in",
        },
        headers: {
          "User-Agent": "tanishqsaini810@gmail.com",
        },
      }
    );

    if (!response.data || response.data.length === 0) {
      throw new Error("No coordinates found");
    }

    const location = response.data[0];

    return {
      lat: Number(location.lat),
      lng: Number(location.lon),
      displayName: location.display_name,
    };
  } catch (error) {
    console.error("❌ Geocoding failed for:", address);
    throw new Error("Unable to get location coordinates");
  }
};

/**
 * Get distance & time
 * Accepts:
 *  - string address
 *  - OR { lat, lng } object (preferred)
 */
module.exports.getDistanceAndTime = async (
  origin,
  destination,
  options = {}
) => {
  try {
    const averageSpeedKmH = options.averageSpeedKmH ?? 40;

    let originCoords;
    let destinationCoords;

    // ✅ If lat/lng already provided, don't geocode again
    if (typeof origin === "object" && origin.lat && origin.lng) {
      originCoords = origin;
    } else {
      originCoords = await module.exports.getAddressCordinates(origin);
    }

    if (typeof destination === "object" && destination.lat && destination.lng) {
      destinationCoords = destination;
    } else {
      destinationCoords = await module.exports.getAddressCordinates(
        destination
      );
    }

    const distanceInMeters = geolib.getDistance(
      {
        latitude: originCoords.lat,
        longitude: originCoords.lng,
      },
      {
        latitude: destinationCoords.lat,
        longitude: destinationCoords.lng,
      }
    );

    const distanceKm = distanceInMeters / 1000;
    const travelTimeHours = distanceKm / averageSpeedKmH;
    const travelTimeSeconds = Math.round(travelTimeHours * 3600);

    const hours = Math.floor(travelTimeSeconds / 3600);
    const minutes = Math.round((travelTimeSeconds % 3600) / 60);

    return {
      origin: originCoords.displayName || origin,
      destination: destinationCoords.displayName || destination,
      distanceKm: Number(distanceKm.toFixed(2)),
      distanceText: `${distanceKm.toFixed(2)} km`,
      travelTimeMinutes: Math.round(travelTimeHours * 60),
      travelTimeText: `${hours}h ${minutes}m`,
    };
  } catch (error) {
    console.error("❌ Distance calculation failed:", error.message);
    throw new Error("Failed to calculate distance and time");
  }
};

/**
 * Autocomplete suggestions (USE THIS IN FRONTEND)
 */
module.exports.getAutoCompleteSuggestions = async (input) => {
  try {
    if (!input || input.trim() === "") return [];

    const response = await axios.get(
      "https://nominatim.openstreetmap.org/search",
      {
        params: {
          q: input,
          format: "json",
          addressdetails: 1,
          limit: 5,
          countrycodes: "in",
        },
        headers: {
          "User-Agent": "tanishqsaini810@gmail.com",
          "Accept-Language": "en",
        },
      }
    );

    return response.data.map((place) => ({
      displayName: place.display_name,
      lat: Number(place.lat),
      lng: Number(place.lon),
      type: place.type,
    }));
  } catch (error) {
    console.error("❌ Autocomplete error:", error.message);
    return [];
  }
};

module.exports.getCaptainInTheRadius = async (ltd, lng, radius) => {
  try {
    // radius in km

    console.log(`Finding captains within ${radius} km of [${ltd}, ${lng}]`);
    const captains = await captainModel.find({
      location: {
        $geoWithin: {
          $centerSphere: [[ltd, lng], radius / 6378.1],
        },
      },
    });

    return captains;
  } catch (error) {
    console.error("❌ Error fetching captains in radius:", error.message);
    throw new Error("Failed to fetch captains in radius");
  }
};
