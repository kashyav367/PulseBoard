import { useEffect } from "react"

import {
  useNavigate,
  useSearchParams
}
from "react-router-dom"

function AuthSuccess() {

  const navigate =
    useNavigate()

  const [searchParams] =
    useSearchParams()

  useEffect(() => {

    const token =
      searchParams.get("token")

    if (token) {

      localStorage.setItem(
        "token",
        token
      )

      navigate(
        "/dashboard"
      )

    } else {

      navigate("/")

    }

  }, [])

  return (

    <div className="min-h-screen flex items-center justify-center bg-stone-50">

      <h1 className="text-3xl font-bold text-orange-500">

        Logging you in...

      </h1>

    </div>

  )

}

export default AuthSuccess