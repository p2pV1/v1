import { useSelector } from "react-redux";

function Header() {
  const userEmail = useSelector((state) => state.user.userEmail);
  return (
    <>
      <header className="bg-gray-800 text-white p-4">
        Welcom, {userEmail}
      </header>
      <button className="bg-gray-800 text-white p-4">Logout</button>
    </>
  );
}

export default Header;
