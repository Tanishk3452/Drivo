const rideModel = require("../models/ride.model");
const mapsService = require("../services/maps.service");
const crypto = require("crypto");

async function getFare(pickup, destination) {
  if (!pickup || !destination) {
    throw new Error("Pickup and destination are required to calculate fare");
  }

  const distanceTime = await mapsService.getDistanceAndTime(
    pickup,
    destination
  );

  if (
    !distanceTime ||
    !distanceTime.distanceKm ||
    !distanceTime.travelTimeMinutes
  ) {
    throw new Error("Unable to calculate distance and time");
  }

  const { distanceKm, travelTimeMinutes } = distanceTime;

  // Define base fares and per km/min rates for different vehicle types
  const fareRates = {
    auto: { baseFare: 20, perKm: 10, perMin: 1 },
    car: { baseFare: 50, perKm: 15, perMin: 2 },
    moto: { baseFare: 15, perKm: 8, perMin: 1 },
  };

  // Calculate fares for each vehicle type
  const fare = {};
  for (const [vehicle, rates] of Object.entries(fareRates)) {
    fare[vehicle] = Math.round(
      rates.baseFare +
        distanceKm * rates.perKm +
        travelTimeMinutes * rates.perMin
    );
  }

  return fare;
}

module.exports.getFare = getFare;

function getOtp(num) {
  const min = 0;
  const max = Math.pow(10, num) - 1;
  const otp = crypto.randomInt(min, max + 1);
  return otp.toString().padStart(num, "0");
}

module.exports.createRide = async ({
  user,
  pickup,
  destination,
  vehicleType,
}) => {
  if (!user || !pickup || !destination || !vehicleType) {
    throw new Error("Missing required fields to create a ride.");
  }

  const fare = await getFare(pickup, destination);

  const ride = new rideModel({
    user,
    pickup,
    destination,
    otp: getOtp(6),
    fare: fare[vehicleType],
  });

  await ride.save();

  return ride;
};

module.exports.confirmRide = async ({ rideId, captainId }) => {
  if (!rideId || !captainId) {
    throw new Error("Ride ID and Captain ID required");
  }

  const ride = await rideModel
    .findByIdAndUpdate(
      rideId,
      {
        status: "accepted",
        captain: captainId,
      },
      { new: true }
    )
    .populate("user")
    .populate("captain")
    .select("+otp");

  if (!ride) {
    throw new Error("Ride not found");
  }

  return ride;
};

module.exports.startRide = async ({ rideId, otp, captainId }) => {
  if (!rideId || !otp || !captainId) {
    throw new Error("Ride ID, OTP and Captain ID required");
  }

  const ride = await rideModel
    .findOne({
      _id: rideId,
      captain: captainId,
      otp: otp,
    })
    .populate("user")
    .populate("captain");

  if (!ride) {
    throw new Error("Invalid ride ID, captain ID, or OTP");
  }

  ride.status = "ongoing";
  ride.otp = undefined;

  await ride.save();

  return ride;
};

module.exports.endRide = async ({ rideId, captainId }) => {
  if (!rideId || !captainId) {
    throw new Error("Ride ID and Captain ID required");
  }
  const ride = await rideModel
    .findOne({
      _id: rideId,
      captain: captainId,
      status: "ongoing",
    })
    .populate("user")
    .populate("captain");
  if (!ride) {
    throw new Error("Invalid ride ID or captain ID, or ride not ongoing");
  }
  ride.status = "completed";

  await ride.save();
  return ride;
};
