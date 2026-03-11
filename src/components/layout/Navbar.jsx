import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {

  const [isOpen, setIsOpen] = useState(false);

  const { isAuthenticated, logout } = useAuth();

  const navigate = useNavigate();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Impact", href: "/impact" },
    { name: "Awareness", href: "/articles" },
    { name: "Donate", href: "/donate" },
    { name: "Buy Compost", href: "/compost" }
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-lg">

      <div className="container-custom">

        <div className="flex justify-between h-16">

          <Link to="/" className="flex items-center text-2xl font-bold text-primary-600">
            EcoGreen innovations Africa
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">

            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium"
              >
                {item.name}
              </Link>
            ))}

            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-gray-700 hover:text-primary-600 px-3 py-2"
                >
                  Dashboard
                </Link>

                <button
                  onClick={handleLogout}
                  className="btn-secondary"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-secondary">
                  Login
                </Link>

                <Link to="/register" className="btn-primary">
                  Register
                </Link>
              </>
            )}

          </div>

          {/* Mobile Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            â˜°
          </button>

        </div>

      </div>

      {/* Mobile Menu */}
      {isOpen && (

        <div className="md:hidden px-4 pb-4">

          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="block py-2"
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}

          {isAuthenticated ? (

            <button
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
              className="w-full btn-secondary"
            >
              Logout
            </button>

          ) : (
            <>
              <Link to="/login" className="block py-2">Login</Link>
              <Link to="/register" className="block py-2">Register</Link>
            </>
          )}

        </div>

      )}

    </nav>
  );
};

export default Navbar;
