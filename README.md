Drivo - Ride Hailing Application
Drivo is a full-stack ride-hailing application  built using the MERN stack (MongoDB, Express.js, React, Node.js). It facilitates seamless connections between passengers ("Users") and drivers ("Captains"), offering real-time ride tracking, location searching, and secure authentication.

🚀 Features
User & Captain Authentication: Secure signup and login for both passengers and drivers using JWT.

Real-time Connection: Socket.io integration for real-time communication between server, drivers, and users.

Ride Management: Request, accept, and manage rides.

Location Services: Integration with Google Maps API for location search, distance calculation, and route visualization.

Live Tracking: Real-time tracking of rides.

Responsive UI: Modern and responsive frontend built with React and Vite.

🛠️ Tech Stack
Backend
Node.js: Runtime environment.

Express.js: Web framework for handling API requests.

MongoDB: NoSQL database for storing users, captains, and ride data.

Mongoose: ODM library for MongoDB.

Socket.io: For real-time, bi-directional communication.

Bcrypt: For password hashing.

JWT (JSON Web Tokens): For secure authentication.

Frontend
React: UI library.

Vite: Fast build tool and development server.

React Router: For client-side routing.

Context API: For state management (UserContext, CaptainContext, SocketContext).

GSAP: For smooth animations.

📂 Project Structure
Bash

Drivo/
├── backend/                # Backend API (Node.js & Express)
│   ├── Controllers/        # Request handlers (user, captain, maps, ride)
│   ├── models/             # Mongoose models (User, Captain, Ride, Blacklist)
│   ├── Routes/             # API routes
│   ├── services/           # Business logic services
│   ├── db/                 # Database connection logic
│   ├── middlewares/        # Auth and validation middlewares
│   ├── socket.js           # Socket.io configuration
│   ├── server.js           # Entry point
│   └── app.js              # App configuration
├── frontend/               # Frontend Client (React & Vite)
│   └── Drivo/
│       ├── src/
│       │   ├── assets/     # Images and static files
│       │   ├── components/ # Reusable UI components
│       │   ├── context/    # Context providers
│       │   ├── pages/      # Application pages (Login, Signup, Home, Riding)
│       │   └── App.jsx     # Main component & Routes
│       └── vite.config.js  # Vite configuration
└── README.md               # Project Documentation
⚙️ Installation & Setup
Prerequisites
Node.js (v14 or higher) installed.

MongoDB installed locally or a MongoDB Atlas connection string.

Leaflet for Maps.

1. Backend Setup
Navigate to the backend directory and install dependencies:

Bash

cd backend
npm install
Create a .env file in the backend directory and add the following environment variables:

Code snippet



Bash

npm start
# or for development with nodemon
npm run dev


2. Frontend Setup
Navigate to the frontend directory:

Bash

cd frontend/Drivo
npm install
Start the development server:

Bash

npm run dev
The application will be accessible at http://localhost:5173.

🔌 API Endpoints
The backend exposes several RESTful API endpoints. Here are the key routes:

User Auth:

POST /users/register - Register a new user.

POST /users/login - Login an existing user.

GET /users/profile - Get authenticated user profile.

GET /users/logout - Logout user.

Captain Auth:

POST /captains/register - Register a new captain (driver).

POST /captains/login - Login a captain.

GET /captains/profile - Get authenticated captain profile.

GET /captains/logout - Logout captain.

Maps:

GET /maps/get-coordinates - Convert address to coordinates.

GET /maps/get-distance-time - Get distance and time between two points.

GET /maps/get-suggestions - Get location suggestions (autocomplete).

Rides:

POST /rides/create - Create a new ride request.

GET /rides/get-fare - Estimate fare for a ride.

🤝 Contributing
Contributions are welcome! Please follow these steps:

Fork the repository.

Create a new branch (git checkout -b feature/YourFeature).

Commit your changes (git commit -m 'Add some feature').

Push to the branch (git push origin feature/YourFeature).

Open a Pull Request.
