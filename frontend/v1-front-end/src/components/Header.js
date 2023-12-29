import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

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
      <header className="bg-gray-100 px-4 py-6 border-b border-b-gray-200">
        Welcom, {userEmail}
        <button className="bg-gray-800 text-white p-4" onClick={handleClick}>
          Logout
        </button>
      </header>
    </>
  );
}

export default Header;
