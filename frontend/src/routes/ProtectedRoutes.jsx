import { Navigate } from "react-router-dom"

function ProtectedRoutes({
  children
}) {

  const token =
    localStorage.getItem("token")

  // Not Logged In
  if (!token) {

    return (

      <Navigate
        to="/"
        replace
      />

    )

  }

  // Logged In
  return children

}

export default ProtectedRoutes