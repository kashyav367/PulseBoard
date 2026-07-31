import { Link, useLocation, useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import {
  LayoutDashboard,
  PlusCircle,
  LogOut,
  Sparkles,
  LogIn
} from "lucide-react"

function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const token = localStorage.getItem("token")

  const navLinks = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={18} />
    },
    {
      name: "Create Poll",
      path: "/create-poll",
      icon: <PlusCircle size={18} />
    }
  ]

  const handleLogout = () => {
    localStorage.removeItem("token")
    toast.success("Logged out successfully 👋")
    navigate("/")
  }

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-orange-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <h1 className="text-4xl font-black tracking-tight">
            <span className="text-orange-500">Pulse</span>
            <span className="text-stone-900">Board</span>
          </h1>
          <Sparkles size={20} className="text-orange-400" />
        </Link>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {token ? (
            <>
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-medium transition-all duration-300 ${
                    location.pathname === link.path
                      ? "bg-orange-500 text-white shadow-lg shadow-orange-200"
                      : "text-stone-700 hover:bg-orange-50"
                  }`}
                >
                  {link.icon}
                  {link.name}
                </Link>
              ))}

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-stone-900 hover:bg-black text-white px-5 py-3 rounded-2xl transition-all duration-300 shadow-md hover:scale-105"
              >
                <LogOut size={18} />
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-orange-200 hover:scale-105"
            >
              <LogIn size={18} />
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar