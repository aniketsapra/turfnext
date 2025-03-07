import React, { useState, useEffect, useRef } from "react";
import Button from "./Button";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import CloseIcon from "@mui/icons-material/Close";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const sidebarRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem('hasVisited');
    if (!hasVisited) {
      localStorage.removeItem('token'); // Clear token on first load
      sessionStorage.setItem('hasVisited', 'true'); // Mark that the user has visited
    }

    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);
  
  const handleSignOut = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setShowLogoutPopup(true);
    setTimeout(() => setShowLogoutPopup(false), 3000);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-gray-900 p-7 flex items-center justify-between md:justify-start relative z-50">
      <div className="md:hidden">
        <button onClick={() => setIsOpen(true)}>
          <MenuIcon className="text-white text-3xl" />
        </button>
      </div>

      <div className="flex-1 flex justify-center md:justify-start">
    <Link to="/home" className="inline-block">
      <h1 className="footerlogo font-bold text-white text-2xl md:text-5xl">
        Turf<span className="text-amber-300 italic">Sync</span>
      </h1>
    </Link>
  </div>

      <div className="hidden md:flex gap-7 items-center ml-auto">
        <Link to="/main">
          <h2 className="footerlogo hover:text-gray-400 cursor-pointer text-white text-2xl">
            Explore
          </h2>
        </Link>
        {isLoggedIn ? (
          <div className="relative" ref={dropdownRef}>
            <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              <AccountCircleRoundedIcon sx={{ fontSize: 40 }} className="text-white text-3xl cursor-pointer" />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 text-white rounded-md shadow-lg py-2">
                <Link to="/profile" className="block px-4 py-2 hover:bg-gray-700">
                  Profile
                </Link>
                <Link to="/main" className="block px-4 py-2 hover:bg-gray-700">
                  Explore
                </Link>
                <Link to="/about" className="block px-4 py-2 hover:bg-gray-700">
                  About Us
                </Link>
                <button onClick={handleSignOut} className="block w-full text-left px-4 py-2 hover:bg-gray-700">
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login">
            <Button label="Register Now" />
          </Link>
        )}
      </div>

      <div ref={sidebarRef} className={`fixed top-0 left-0 h-full w-3/4 bg-gray-800 shadow-lg p-5 flex flex-col gap-5 items-center md:hidden transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full hidden"}`}>
        <Link to="/home" className="text-white text-xl hover:text-gray-400" onClick={() => setIsOpen(false)}>
          Home
        </Link>
        <Link to="/main" className="text-white text-xl hover:text-gray-400" onClick={() => setIsOpen(false)}>
          Explore
        </Link>
        <Link to="/about" className="text-white text-xl hover:text-gray-400" onClick={() => setIsOpen(false)}>
          About Us
        </Link>

        {isLoggedIn ? (
          <>
            <Link to="/profile" onClick={() => setIsOpen(false)} className="text-white text-xl hover:text-gray-400">
              Profile
            </Link>
            <button onClick={() => { handleSignOut(); setIsOpen(false); }} className="text-white text-xl hover:text-gray-400">
              Sign Out
            </button>
          </>
        ) : (
          <Link to="/login" onClick={() => setIsOpen(false)}>
            <Button label="Register Now" />
          </Link>
        )}
      </div>

      {showLogoutPopup && (
        <div className="fixed bottom-5 right-5 bg-gray-800 p-4 rounded-lg shadow-lg z-50 flex items-center justify-between gap-4 w-80">
          <p className="text-white text-lg">User Logged Out</p>
          <button onClick={() => setShowLogoutPopup(false)}>
            <CloseIcon className="text-white text-2xl cursor-pointer" />
          </button>
        </div>
      )}
    </div>
  );
}

export default Navbar;
