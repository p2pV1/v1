import { useSelector } from "react-redux";

function Header() {
  const userEmail = useSelector((state) => state.user.userEmail);
  return (
    <>
      <header className="bg-gray-100 px-4 py-6 border-b border-b-gray-200">
        Welcom, {userEmail}
        <button className="bg-gray-800 text-white p-4">Logout</button>
      </header>
    </>
  );
}

export default Header;
