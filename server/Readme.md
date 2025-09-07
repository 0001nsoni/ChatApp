# QuickChat Backend

This is the backend API for QuickChat, a real-time chat application built with Node.js, Express, MongoDB, Socket.io, and Cloudinary.

---

## Features

- User authentication (JWT)
- Real-time messaging with Socket.io
- Online user tracking
- Profile management (including avatar upload via Cloudinary)
- Send and receive text and image messages
- Message seen status
- RESTful API endpoints

---

## Tech Stack

- **Node.js** & **Express**: REST API and server
- **MongoDB** & **Mongoose**: Database and ODM
- **Socket.io**: Real-time communication
- **Cloudinary**: Image upload and hosting
- **JWT**: Authentication

---

## Environment Variables

Create a `.env` file in the `server/` directory:

```
MONGODB_URI="your_mongodb_connection_string"
PORT=5000
JWT_SECRET="your_jwt_secret"
CLOUDINARY_CLOUD_NAME="your_cloudinary_cloud_name"
CLOUDINARY_API_KEY="your_cloudinary_api_key"
CLOUDINARY_API_SECRET="your_cloudinary_api_secret"
```

---

## Installation

```sh
cd server
npm install
```

---

## Running the Server

```sh
npm start
```

The server will run on `http://localhost:5000` by default.

---

## Project Structure

```
server/
  controllers/       # Route controllers (user, message)
  lib/               # DB and Cloudinary config, utilities
  middleware/        # Auth middleware
  models/            # Mongoose models (User, Message)
  routes/            # API route definitions
  server.js          # Main server entry point
  .env               # Environment variables
  package.json
```

---

## API Routes

### Auth Routes (`/api/auth`)

- `POST /signup`  
  Create a new user.  
  **Body:** `{ fullName, email, password, bio }`

- `POST /login`  
  Login user.  
  **Body:** `{ email, password }`

- `PUT /update-profile`  
  Update user profile (name, bio, avatar).  
  **Headers:** `{ token }`  
  **Body:** `{ fullName, bio, profilePic (base64 string) }`

- `GET /check`  
  Check if user is authenticated.  
  **Headers:** `{ token }`

---

### Message Routes (`/api/messages`)

- `GET /users`  
  Get all users except the logged-in user, with unseen message counts.  
  **Headers:** `{ token }`

- `GET /:id`  
  Get all messages between logged-in user and user `:id`.  
  **Headers:** `{ token }`

- `PUT /mark/:id`  
  Mark message `:id` as seen.  
  **Headers:** `{ token }`

- `POST /send/:id`  
  Send a message to user `:id`.  
  **Headers:** `{ token }`  
  **Body:** `{ text?, image? (base64 string) }`

---

## Real-Time Events (Socket.io)

- **Connection:**  
  When a user connects, their socket is mapped to their user ID.

- **getOnlineUsers:**  
  Emits the list of online user IDs to all clients.

- **newMessage:**  
  Emits a new message to the receiver in real-time.

---

## Models

### User

See [`models/User.js`](models/User.js):

- `email` (unique, required)
- `fullName` (required)
- `password` (hashed, required)
- `profilePic` (Cloudinary URL)
- `bio`

### Message

See [`models/Message.js`](models/Message.js):

- `senderId` (User reference)
- `receiverId` (User reference)
- `text`
- `image` (Cloudinary URL)
- `seen` (boolean)
- `createdAt` (timestamp)

---

## Deployment

Deploy the backend to services like Render, Railway, or your own VPS.  
Update the frontend's `VITE_BACKEND_URL` to your backend URL.

---

## License

MIT

---

## Acknowledgements

- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)