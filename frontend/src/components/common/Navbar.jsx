import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import aulogo from "../../assets/aulogo.png";

const Navbar = () => {
  // const location = useLocation();

  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeId, setActiveId] = useState("");

  const handleScroll = useCallback(() => {
    const currentY = window.scrollY;

    // Show/hide navbar on scroll direction
    setIsVisible(currentY <= 50 || currentY < lastScrollY);
    setLastScrollY(currentY);

    // Set active section
    const sections = document.querySelectorAll("div[id]");
    let current = "";
    sections.forEach((section) => {
      const top = section.offsetTop - 150; // offset for navbar height
      if (currentY >= top) {
        current = section.getAttribute("id");
      }
    });
    setActiveId(current);
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const navItems = [
    { name: "Home", path: "home" },
    { name: "How it Works", path: "whyus" },
    { name: "Lost Items", path: "experiences" },
    { name: "Contact Us", path: "getstarted" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } bg-gray-200 shadow-md px-6 py-4 rounded-2xl w-[90%] mx-auto mt-3`}
    >
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={aulogo} alt="AU Logo" className="w-10 h-auto" />
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex gap-8 text-sm font-medium">
          {navItems.map(({ name, path }) => (
            <a
              key={name}
              href={`#${path}`}
              className={`transition-colors ${
                activeId === path
                  ? "text-blue-600 font-semibold"
                  : "text-gray-700 hover:text-blue-500"
              }`}
            >
              {name}
            </a>
          ))}
        </div>

        {/* Auth Buttons */}
        <div className="md:flex gap-2">
          <Link
            to="/login"
            className="bg-blue-500 text-white font-semibold px-6 py-2 rounded-full hover:bg-blue-600 transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-blue-500 text-white font-semibold px-6 py-2 rounded-full hover:bg-blue-600 transition"
          >
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
