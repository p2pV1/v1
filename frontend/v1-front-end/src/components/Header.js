import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";
import Logo from "../assets/logo-min.jpg";
import avatar from "../assets/avatars/avatar_1_mainprofile.svg";

function Header() {
  const { logout } = useAuth();
  const userEmail = useSelector((state) => state.user.userEmail);
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    logout();
    navigate("/signin");
  };
  return (
    <>
      {/* <header className="bg-gray-100 px-4 py-6 border-b border-b-gray-200 flex justify-between items-center  gap-4 ">
        <span className="text-gray-700 font-bold ">Welcome, {userEmail} </span>
        <button className="bg-gray-800 text-white p-4" onClick={handleClick}>
          Logout
        </button>
      </header> */}
      <header className=" px-2 py-4 bg-gray-800 text-white fixed top-0 left-0 right-0 z-50">
        <nav className="container mx-auto flex justify-between items-center text-sm">
          {/* Logo */}
          <div className="flex items-center">
            <img src={Logo} alt="Logo" className="h-10 mr-2" />
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
          <div className="flex items-center text-sm gap-6">
            <img
              src={avatar}
              alt="User"
              className="h-8 w-8 rounded-full mr-2"
            />
            <span className="text-white">{userEmail || "Not Signed In"}</span>
            <button
              className="bg-purple-700 text-white p-2 rounded hover:bg-purple-800"
              onClick={handleClick}
            >
              Logout
            </button>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Header;
