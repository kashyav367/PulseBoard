import { Navigate, useLocation } from "react-router-dom"

function ProtectedRoutes({ children }) {

  const location = useLocation()

  const token = localStorage.getItem("token")

  // Invalid Token Check
  const isAuthenticated =
    token &&
    token !== "undefined" &&
    token !== "null"

  // Not Logged In
  if (!isAuthenticated) {

    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />
    )

  }

  // Logged In
  return children

}

export default ProtectedRoutes