import React from "react";
import { Link, useLocation } from "react-router-dom";
import aulogo from "../../assets/aulogo.png";

const Navbar = () => {
  // const [menuOpen, setMenuOpen] = useState(false);
  // const toggleMenu = () => setMenuOpen(!menuOpen);
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "How it Works", path: "/items/Lost" },
    { name: "Lost Items", path: "/items/Found" },
    { name: "Contact Us", path: "/reportitem" },
  ];

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="w-[90%] mx-auto bg-gray-200 shadow-md rounded-full px-6 py-4 mt-3 mb-6">
      <div className="mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={aulogo} alt="AU Logo" className="w-10 h-auto" />
        </Link>

        {/* Centered Nav Links */}
        <div className="hidden md:flex gap-8 text-sm font-medium">
          {navItems.map(({ name, path }) => (
            <Link
              key={name}
              to={path}
              className={`transition-colors ${
                isActive(path)
                  ? "text-blue font-semibold"
                  : "text-gray-700 hover:text-blue-500"
              }`}
            >
              {name}
            </Link>
          ))}
        </div>

        <div className="md:flex gap-2">
          <Link
            to="/get-started"
            className="bg-blue-500 text-white font-semibold px-6 py-2 rounded-full hover:bg-blue-500 transition"
          >
            Login
          </Link>
          <Link
            to="/get-started"
            className="bg-blue-500 text-white font-semibold px-6 py-2 rounded-full hover:bg-blue-500 transition"
          >
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
