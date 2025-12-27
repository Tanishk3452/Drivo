const express = require("express");
const router = express.Router();
const { body, query } = require("express-validator");
const rideController = require("../Controllers/ride.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post(
  "/create",
  authMiddleware.authUser,

  body("pickup")
    .isString()
    .isLength({ min: 3 })
    .withMessage("pickup is required"),
  body("destination")
    .isString()
    .isLength({ min: 3 })
    .withMessage("destination is required"),
  body("vehicleType")
    .isIn(["auto", "car", "moto"])
    .withMessage("Invalid vehicle type"),
  rideController.createRide
);

router.get(
  "/get-fare",
  authMiddleware.authUser,
  query("pickup").isString().isLength({ min: 3 }),
  query("destination").isString().isLength({ min: 3 }),
  rideController.getFare
);

router.post(
  "/confirm",
  authMiddleware.authCaptain,
  body("rideId").isMongoId().withMessage("Invalid ride ID"),
  rideController.confirmRide
);

router.post(
  "/start-ride",
  authMiddleware.authCaptain,
  body("rideId").isMongoId().withMessage("Invalid ride ID"),
  body("otp").isLength({ min: 6, max: 6 }).withMessage("Invalid OTP"),
  rideController.startRide
);

router.post(
  "/end-ride",
  authMiddleware.authCaptain,
  body("rideId").isMongoId().withMessage("Invalid ride ID"),
  rideController.endRide
);

module.exports = router;
