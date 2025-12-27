const rideService = require("../services/ride.service");
const { validationResult } = require("express-validator");
const mapsService = require("../services/maps.service");
const { sendMessageToSocketId } = require("../socket");
const rideModel = require("../models/ride.model");

module.exports.createRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { userId, pickup, destination, vehicleType } = req.body;

  try {
    const pickupCoords = await mapsService.getAddressCordinates(pickup);

    const captainInRadius = await mapsService.getCaptainInTheRadius(
      pickupCoords.lat,
      pickupCoords.lng,
      3
    );

    const ride = await rideService.createRide({
      user: req.user._id,
      pickup,
      destination,
      vehicleType,
    });

    const temp = ride.otp;

    ride.otp = "";

    const rideWithUser = await ride.populate("user");

    captainInRadius.map((captain) => {
      sendMessageToSocketId(captain.socketId, {
        event: "new-ride",
        data: rideWithUser,
      });
    });

    ride.otp = temp;

    res.status(201).json({ ride });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getFare = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { pickup, destination } = req.query;

  try {
    const fare = await rideService.getFare(pickup, destination);
    res.status(200).json({ fare });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.confirmRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { rideId } = req.body;
  const captainId = req.captain._id;

  try {
    const ride = await rideService.confirmRide({
      rideId,
      captainId,
    });

    sendMessageToSocketId(ride.user.socketId, {
      event: "ride-confirmed",
      data: ride,
    });

    return res.status(200).json({ ride });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.startRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { rideId, otp } = req.body;

  try {
    const ride = await rideService.startRide({
      rideId,
      otp,
      captainId: req.captain._id,
    });

    sendMessageToSocketId(ride.user.socketId, {
      event: "ride-started",
      data: ride,
    });

    res.status(200).json({ ride });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.endRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { rideId } = req.body;

  try {
    const ride = await rideService.endRide({
      rideId,
      captainId: req.captain._id,
    });

    sendMessageToSocketId(ride.user.socketId, {
      event: "ride-ended",
      data: ride,
    });

    res.status(200).json({ ride });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
