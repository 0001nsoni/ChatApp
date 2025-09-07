# QuickChat

A modern, full-stack real-time chat application built with React, Vite, TailwindCSS, Express, MongoDB, Socket.io, and Cloudinary.  
**Live Demo:** [https://chat-app-tau-green.vercel.app/](https://chat-app-tau-green.vercel.app/)

---

## Features

- **Real-time Messaging:** Instant chat powered by Socket.io.
- **User Authentication:** Secure signup and login with JWT.
- **Profile Management:** Update profile info and avatar (Cloudinary image upload).
- **Online Status:** See which users are online.
- **Media Sharing:** Send images in chat.
- **Responsive UI:** Mobile-friendly, clean design with TailwindCSS.
- **Message Seen Status:** Tracks unread messages.
- **Sidebar & Search:** Easily find users and see unread counts.

---

## Tech Stack

- **Frontend:** React, Vite, TailwindCSS, Socket.io-client, Axios
- **Backend:** Express, MongoDB (Mongoose), Socket.io, Cloudinary
- **Deployment:** Vercel (Frontend), (Backend: configure as needed)

---

## Getting Started

### Prerequisites

- Node.js & npm
- MongoDB Atlas account
- Cloudinary account

### Environment Variables

#### Client (`client/.env`)
```
VITE_BACKEND_URL='http://localhost:5000'
```

#### Server (`server/.env`)
```
MONGODB_URI="your_mongodb_connection_string"
PORT=5000
JWT_SECRET="your_jwt_secret"
CLOUDINARY_CLOUD_NAME="your_cloudinary_cloud_name"
CLOUDINARY_API_KEY="your_cloudinary_api_key"
CLOUDINARY_API_SECRET="your_cloudinary_api_secret"
```

### Installation

#### 1. Clone the repository
```sh
git clone https://github.com/yourusername/quickchat.git
cd quickchat
```

#### 2. Install dependencies

**Client:**
```sh
cd client
npm install
```

**Server:**
```sh
cd ../server
npm install
```

#### 3. Start the development servers

**Server:**
```sh
npm start
```

**Client:**
```sh
cd ../client
npm run dev
```

- The client runs on [http://localhost:5173](http://localhost:5173)
- The server runs on [http://localhost:5000](http://localhost:5000)

---

## Usage

1. **Sign Up:** Create a new account and set your profile.
2. **Login:** Access your chats.
3. **Chat:** Select a user from the sidebar and start messaging.
4. **Send Images:** Use the gallery icon to send images.
5. **Profile:** Edit your profile and avatar from the menu.
6. **Logout:** Securely log out from the sidebar or right panel.

---

## Project Structure

```
client/
  src/
    components/      # React UI components
    pages/           # Page components (Home, Login, Profile)
    lib/             # Utility functions
    assets/          # Images and icons
  context/           # Auth and Chat context providers
  index.html
  vite.config.js
  .env
server/
  controllers/       # Express route controllers
  models/            # Mongoose models
  routes/            # API routes
  lib/               # DB and Cloudinary config
  middleware/        # Auth middleware
  server.js
  .env
```

---

## Deployment

- **Frontend:** Deployed on Vercel at [https://chat-app-tau-green.vercel.app/](https://chat-app-tau-green.vercel.app/)
- **Backend:** Deploy to services like Render, Railway, or your own VPS.  
  Update `VITE_BACKEND_URL` in client `.env` to your backend URL.

---

## Contributing

Pull requests are welcome!  
For major changes, please open an issue first to discuss what you would like to change.

---

## License

MIT

---

## Acknowledgements

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [Socket.io](https://socket.io/)
- [Cloudinary](https://cloudinary.com/)
- [MongoDB Atlas](https://www.mongodb.com/cloud