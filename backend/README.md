# Backend Service Documentation

This document provides an overview of the backend services for the Uber Clone application. It includes details about the available endpoints, their usage, and example requests/responses.

## Table of Contents

1. [User Endpoints](#user-endpoints)
   - [Register](#usersregister)
   - [Login](#userslogin)
   - [Profile](#usersprofile)
   - [Logout](#userslogout)
2. [Captain Endpoints](#captain-endpoints)
   - [Register](#captainsregister)
   - [Login](#captainslogin)
   - [Profile](#captainsprofile)
   - [Logout](#captainslogout)
3. [Ride Endpoints](#ride-endpoints)
   - [Create Ride](#ridescreate)
   - [Get Fare](#ridesfare)

---

## User Endpoints

### `/users/register`

Registers a new user. Validates input, hashes the password, and returns a JWT token.

- **Method:** POST
- **Endpoint:** `/users/register`
- **Request Body:**
  ```json
  {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "securePassword"
  }
  ```
- **Response:**
  ```json
  {
    "token": "<JWT_TOKEN>",
    "user": {
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com"
    }
  }
  ```

### `/users/login`

Authenticates a user and returns a JWT token.

- **Method:** POST
- **Endpoint:** `/users/login`
- **Request Body:**
  ```json
  {
    "email": "john.doe@example.com",
    "password": "securePassword"
  }
  ```
- **Response:**
  ```json
  {
    "token": "<JWT_TOKEN>",
    "user": {
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com"
    }
  }
  ```

### `/users/profile`

Retrieves the profile of the authenticated user.

- **Method:** GET
- **Endpoint:** `/users/profile`
- **Headers:**
  ```bash
  Authorization: Bearer <JWT_TOKEN>
  ```
- **Response:**
  ```json
  {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
  ```

### `/users/logout`

Logs out the user by invalidating the token.

- **Method:** GET
- **Endpoint:** `/users/logout`
- **Response:**
  ```json
  {
    "message": "Logged Out"
  }
  ```

---

## Captain Endpoints

### `/captains/register`

Registers a new captain with vehicle details.

- **Method:** POST
- **Endpoint:** `/captains/register`
- **Request Body:**
  ```json
  {
    "fullname": {
      "firstname": "Mike",
      "lastname": "Johnson"
    },
    "email": "mike.johnson@example.com",
    "password": "securepass123",
    "vehicle": {
      "color": "Black",
      "plate": "ABC123",
      "capacity": 4,
      "vehicletype": "car"
    }
  }
  ```
- **Response:**
  ```json
  {
    "token": "<JWT_TOKEN>",
    "captain": {
      "fullname": {
        "firstname": "Mike",
        "lastname": "Johnson"
      },
      "email": "mike.johnson@example.com",
      "vehicle": {
        "color": "Black",
        "plate": "ABC123",
        "capacity": 4,
        "vehicletype": "car"
      },
      "status": "inactive"
    }
  }
  ```

### `/captains/login`

Authenticates a captain and returns a JWT token.

- **Method:** POST
- **Endpoint:** `/captains/login`
- **Request Body:**
  ```json
  {
    "email": "mike.johnson@example.com",
    "password": "securepass123"
  }
  ```
- **Response:**
  ```json
  {
    "token": "<JWT_TOKEN>",
    "captain": {
      "fullname": {
        "firstname": "Mike",
        "lastname": "Johnson"
      },
      "email": "mike.johnson@example.com",
      "vehicle": {
        "color": "Black",
        "plate": "ABC123",
        "capacity": 4,
        "vehicletype": "car"
      },
      "status": "inactive"
    }
  }
  ```

### `/captains/profile`

Retrieves the profile of the authenticated captain.

- **Method:** GET
- **Endpoint:** `/captains/profile`
- **Headers:**
  ```bash
  Authorization: Bearer <JWT_TOKEN>
  ```
- **Response:**
  ```json
  {
    "captain": {
      "fullname": {
        "firstname": "Mike",
        "lastname": "Johnson"
      },
      "email": "mike.johnson@example.com",
      "status": "active",
      "vehicle": {
        "color": "Black",
        "plate": "ABC123",
        "capacity": 4,
        "vehicletype": "car"
      }
    }
  }
  ```

### `/captains/logout`

Logs out the captain by invalidating the token.

- **Method:** GET
- **Endpoint:** `/captains/logout`
- **Response:**
  ```json
  {
    "message": "Logged Out"
  }
  ```

---

## Ride Endpoints

### `/rides/create`

Creates a new ride request.

- **Method:** POST
- **Endpoint:** `/rides/create`
- **Request Body:**
  ```json
  {
    "user": "<USER_ID>",
    "pickup": "<PICKUP_LOCATION>",
    "destination": "<DESTINATION_LOCATION>",
    "vehicleType": "car"
  }
  ```
- **Response:**
  ```json
  {
    "ride": {
      "id": "<RIDE_ID>",
      "fare": "<FARE_AMOUNT>",
      "status": "pending"
    }
  }
  ```

### `/rides/fare`

Calculates the fare for a ride based on pickup and destination.

- **Method:** GET
- **Endpoint:** `/rides/fare`
- **Query Parameters:**
  - `pickup`: Pickup location
  - `destination`: Destination location
- **Response:**
  ```json
  {
    "fare": {
      "auto": "<FARE_AMOUNT>",
      "car": "<FARE_AMOUNT>",
      "moto": "<FARE_AMOUNT>"
    }
  }
  ```
