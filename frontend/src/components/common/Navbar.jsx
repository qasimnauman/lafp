import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import aulogo from '../../assets/aulogo.png';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Lost Items', path: '/items/Lost' },
    { name: 'Found Items', path: '/items/Found' },
    { name: 'Report Item', path: '/reportitem' },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav className=" p-5 shadow-md rounded-2xl ">
      <div className="flex flex-wrap justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2 text-[1.5rem]">
          <Link to="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-2">
            <img src={aulogo} alt="AU Logo" width="50" height="30" />
            <h1 className="text-[#004080] text-[1.8rem] m-0 font-semibold">AU L&F</h1>
          </Link>
        </div>

        {/* Hamburger icon */}
        <div
          className="flex flex-col cursor-pointer gap-1.5 md:hidden"
          onClick={toggleMenu}
        >
          <span className={`h-[3px] w-[25px] bg-[#333] rounded transition-transform duration-300 ${
            menuOpen ? 'rotate-45 translate-x-[5px] translate-y-[5px]' : ''
          }`} />
          <span className={`h-[3px] w-[25px] bg-[#333] rounded transition-opacity duration-300 ${
            menuOpen ? 'opacity-0' : 'opacity-100'
          }`} />
          <span className={`h-[3px] w-[25px] bg-[#333] rounded transition-transform duration-300 ${
            menuOpen ? '-rotate-45 -translate-x-[6px] translate-y-[-6px]' : ''
          }`} />
        </div>

        {/* Nav Links */}
        <div className={`flex flex-col md:flex-row md:items-center gap-3 md:gap-4 w-full md:w-auto ${
          menuOpen ? 'flex' : 'hidden'
        } md:flex`}>
          {navItems.map(({ name, path }) => (
            <Link
              key={name}
              to={path}
              onClick={() => setMenuOpen(false)}
              className={`rounded-full px-4 py-2 font-medium transition-colors ${
                isActive(path)
                  ? 'bg-blue-500 text-white'
                  : 'text-[#333] hover:bg-[#f0f4ff] hover:text-[#004080]'
              }`}
            >
              {name}
            </Link>
          ))}
        </div>

        {/* Auth Buttons */}
        <div className="flex gap-3 w-full md:w-auto mt-3 md:mt-0">
          <Link
            to="/login"
            onClick={() => setMenuOpen(false)}
            className="flex-1 max-w-[120px] rounded-full bg-blue-500 text-white font-semibold py-2 px-5 hover:bg-blue-400 transition-colors text-center"
          >
            Login
          </Link>
          <Link
            to="/register"
            onClick={() => setMenuOpen(false)}
            className="flex-1 max-w-[120px] rounded-full bg-blue-500 text-white font-semibold py-2 px-5 hover:bg-blue-400 transition-colors text-center"
          >
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
