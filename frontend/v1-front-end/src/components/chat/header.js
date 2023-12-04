// src/components/Header.js
import React from "react";

const Header = () => {
  return (
    <header className="bg-gray-800 text-white fixed top-0 left-0 right-0 z-50">
      <nav className="container mx-auto flex justify-between items-center p-4 text-sm">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src="https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"
            alt="Logo"
            className="h-8 mr-2"
          />
        </div>

        {/* Navigation Links */}
        <div className="space-x-4">
          <a href="/" className="hover:text-gray-300">
            Home
          </a>
          <a href="/explore-rooms" className="hover:text-gray-300">
            Explore Rooms
          </a>
          {/* Other navigation links can go here */}
        </div>

        {/* User Profile */}
        <div className="flex items-center text-sm">
          <img
            src="https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"
            alt="User"
            className="h-8 w-8 rounded-full mr-2"
          />{" "}
          {/* Replace with actual user profile image */}
          <span>Username</span> {/* Replace with actual username */}
        </div>
      </nav>
    </header>
  );
};

export default Header;
