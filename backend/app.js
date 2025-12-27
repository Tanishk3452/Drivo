const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const connectDB = require("./db/db");
const userroutes = require("./Routes/user.routes");
const captainroutes = require("./Routes/captain.routes");
const mapsroutes = require("./Routes/maps.routes");
const rideRoutes = require("./Routes/ride.routes");

connectDB();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/users", userroutes);
app.use("/captains", captainroutes);
app.use("/maps", mapsroutes);
app.use("/rides", rideRoutes);
app.get("/", (req, res) => {
  res.send("Hello world");
});

module.exports = app;
