import { Routes, Route } from "react-router-dom"

import Home from "../pages/Home"
import Dashboard from "../pages/Dashboard"
import Login from "../pages/Login"
import Register from "../pages/Register"
import CreatePoll from "../pages/CreatePoll"
import PollForm from "../pages/PollForm"
import Analytics from "../pages/Analytics"
import PublishedResults from "../pages/PublishedResults"
import ProtectedRoutes from "./ProtectedRoutes"
import AuthSuccess from "../pages/AuthSuccess"

function AppRoutes() {
  return (
    <Routes>

      <Route path="/" element={<Home />} />

      <Route
  path="/auth-success"
  element={<AuthSuccess />}
/>

      <Route
  path="/dashboard"
  element={
    <ProtectedRoutes>
      <Dashboard />
    </ProtectedRoutes>
  }
/>

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

  <Route
  path="/create-poll"
  element={
    <ProtectedRoutes>
      <CreatePoll />
    </ProtectedRoutes>
  }
/>

      <Route  path="/poll/:id" element={<PollForm />} />

<Route
  path="/analytics/:id"
  element={<Analytics />}
/>

      <Route path="/results/:id" element={<PublishedResults />} />

    </Routes>
  )
}

export default AppRoutes