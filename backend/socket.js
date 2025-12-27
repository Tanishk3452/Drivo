const { Server } = require("socket.io");
const userModel = require("./models/usermodel");
const captainModel = require("./models/captain.model");
const { latitudeKeys } = require("geolib");

let io;

function initializeSocket(server) {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`Socket connected: ${socket.id}`);

    socket.on("join", async (data) => {
      const { userId, userType } = data;
      console.log(`User joined: ${userId} as ${userType}`);
      if (userType === "user") {
        await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
        console.log(`Updated socketId for user ${userId}: ${socket.id}`);
      } else if (userType === "captain") {
        await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
        console.log(`Updated socketId for captain ${userId}: ${socket.id}`);
      }
    });

    socket.on("update-location-captain", async (data) => {
      const { userId, location } = data;

      if (!userId || !location) {
        socket.emit("error", { message: "Invalid data for updating location" });
        return;
      }

      //   console.log(`Updating location for captain ${userId}:`, location);

      await captainModel.findByIdAndUpdate(userId, {
        location: {
          ltd: location.ltd,
          lng: location.lng,
        },
      });
    });

    socket.on("disconnect", () => {
      console.log(`Socket disconnected: ${socket.id}`);
    });
  });
}

function sendMessageToSocketId(socketId, message) {
  if (io) {
    io.to(socketId).emit(message.event, message.data);
  } else {
    console.error("Socket.io is not initialized.");
  }
}

module.exports = { initializeSocket, sendMessageToSocketId };
