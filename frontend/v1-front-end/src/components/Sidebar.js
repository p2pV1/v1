import {
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlineHomeModern,
  HiOutlineUsers,
} from "react-icons/hi2";
function Sidebar() {
  return (
    <aside className="bg-gray-100 px-4 py-6 border-r border-r-gray-200 row-span-full flex flex-col gap-8">
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
    </aside>
  );
}

export default Sidebar;
