import {
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlineHomeModern,
  HiOutlineUsers,
} from "react-icons/hi2";
function sidebar() {
  return (
    <div>
      <ul className="flex flex-col gap-3">
        <li className="flex items-center gap-4 text-gray-500 font-semibold text-xl px-7 py-5 transition duration-300">
          <HiOutlineHome />
          <span>Home</span>
        </li>
        <li className="flex items-center gap-4 text-gray-500 font-semibold text-xl px-7 py-5 transition duration-300">
          <HiOutlineHome />
          <span>Home</span>
        </li>
        <li className="flex items-center gap-4 text-gray-500 font-semibold text-xl px-7 py-5 transition duration-300">
          <HiOutlineHome />
          <span>Home</span>
        </li>
      </ul>
    </div>
  );
}

export default sidebar;
