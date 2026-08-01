# 🚀 PulseBoard

**Create polls in seconds. Watch votes roll in live. No refresh needed.**

PulseBoard is a real-time polling platform — spin up a poll, share it, and watch the results update instantly as votes come in, with a live analytics dashboard behind secure Google & JWT authentication.

---

## 📑 Table of Contents

- [About the Project](#-about-the-project)
- [Live Demo](#-live-demo)
- [Features](#-features)
- [Tech Stack](#️-tech-stack)
- [Folder Structure](#-folder-structure)
- [Prerequisites](#-prerequisites)
- [Run Locally](#-run-locally)
- [Environment Variables](#-environment-variables)
- [How It Works](#-how-it-works)
- [Deployment](#-deployment)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)
- [Author](#-author)

---

## 📖 About the Project

Most polling tools either feel outdated or lock live results behind a paywall. PulseBoard is a lightweight, open-source alternative built to show how a modern real-time app comes together end to end — authentication, a REST API, a database, and instant updates on the client, all in one project.

It's aimed at:
- **Developers** who want a working reference for building real-time features (voting, live dashboards) with the MERN stack.
- **Communities, classrooms, or teams** who need a quick way to run a live poll and see results update as votes are cast, without refreshing the page.

At its core, a user signs in with Google, creates a poll with custom options, shares the poll link, and watches votes and analytics update live as people respond.

---

## 🌐 Live Demo

| | Link |
|---|---|
| **Frontend** | [pulse-board-ebon.vercel.app](https://pulse-board-ebon.vercel.app) |
| **Backend** | [pulseboard-o4dg.onrender.com](https://pulseboard-o4dg.onrender.com) |

> Note: the backend is hosted on Render's free tier, so the first request after a period of inactivity may take a few seconds to wake up.

---

## ✨ Features

- **Google Authentication** — sign in quickly and securely using your Google account, no separate password to manage.
- **JWT Authentication** — protected API routes issue and verify JSON Web Tokens to keep user sessions secure.
- **Create Live Polls** — build a poll with a question and multiple custom answer options in seconds.
- **Real-time Voting** — cast a vote and see the results update instantly for everyone viewing the poll.
- **Live Analytics Dashboard** — view vote counts and result breakdowns as they happen, without refreshing.
- **Responsive UI** — works smoothly across desktop, tablet, and mobile screens.
- **Protected Routes** — only authenticated users can create polls or access certain dashboard pages.
- **MongoDB Database** — polls, votes, and user data are stored reliably using MongoDB.

---

## 🛠️ Tech Stack

**Frontend**
- React.js — component-based UI
- Vite — fast dev server and build tool
- Tailwind CSS — utility-first styling
- Axios — API requests to the backend
- React Router DOM — client-side routing

**Backend**
- Node.js — JavaScript runtime
- Express.js — REST API framework
- MongoDB — NoSQL database for polls, votes, and users
- Passport.js — Google OAuth authentication strategy
- JWT (jsonwebtoken) — stateless session authentication

---

## 📁 Folder Structure

```bash
PulseBoard/
│
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/           # Route-level pages (Home, Poll, Dashboard, etc.)
│   │   └── ...
│   └── public/
│
├── backend/
│   ├── routes/               # API route definitions
│   ├── controllers/          # Request handling / business logic
│   ├── models/                # MongoDB schemas (User, Poll, Vote)
│   └── middleware/            # Auth & error-handling middleware
│
└── README.md
```

---

## ✅ Prerequisites

Before running the project locally, make sure you have:

- **Node.js** (v16 or higher recommended)
- **npm** (comes with Node.js)
- A **MongoDB** database — either a local instance or a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster
- A **Google OAuth Client ID & Secret** — create one from the [Google Cloud Console](https://console.cloud.google.com/) to enable Google login

---

## 🚀 Run Locally

### 1. Clone the Repository
```bash
git clone https://github.com/kashyav367/PulseBoard.git
cd PulseBoard
```

### 2. 💻 Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
The frontend will start on `http://localhost:5173` (Vite's default port).

### 3. ⚙️ Backend Setup
```bash
cd backend
npm install
npm run server
```
The backend will start on the port defined in your `.env` file (commonly `5000`).

> Make sure MongoDB is running (locally or via Atlas) and your `.env` file is configured before starting the backend — see [Environment Variables](#-environment-variables) below.

---

## 🔑 Environment Variables

Create a `.env` file inside the **backend** folder with the following variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
CLIENT_URL=http://localhost:5173
```

And in the **frontend** folder, create a `.env` file with:

```env
VITE_API_BASE_URL=http://localhost:5000
```

Adjust values for production deployment (e.g. your live backend URL and OAuth redirect URIs).

---

## ⚙️ How It Works

1. **Sign in** — the user logs in via Google OAuth (Passport.js), and the backend issues a JWT used to authenticate future requests.
2. **Create a poll** — an authenticated user submits a question and answer options, which are saved to MongoDB.
3. **Share & vote** — the poll is shareable via a link; anyone can open it and cast a vote.
4. **Live updates** — as votes come in, the results and analytics dashboard update in real time, so everyone viewing the poll sees the latest counts without refreshing.

---

## 🚀 Deployment

| Layer | Platform |
|---|---|
| Frontend | Vercel |
| Backend | Render |

To deploy your own copy: push the `frontend` and `backend` folders to separate Vercel/Render projects (or configure them as monorepo sub-projects), and set the environment variables listed above on each platform.

---

## 🗺️ Roadmap

- [ ] Poll expiry / scheduled closing time
- [ ] Export poll results (CSV/PDF)
- [ ] Anonymous voting option
- [ ] Multiple-choice (select more than one option) polls
- [ ] Dark mode

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m "Add your feature"`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

Please open an issue first for major changes so we can discuss what you'd like to add.

---

## 📄 License

This project is licensed under the MIT License — feel free to use, modify, and share it.

---

## 👨‍💻 Author

**Ankit Kumar Singh**
