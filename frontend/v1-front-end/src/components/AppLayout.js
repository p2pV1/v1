import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./chat/sidebar";

function AppLayout() {
  return (
    <div className="grid grid-cols-2 grid-rows-[auto 1fr] h-96">
      <Header />
      <Sidebar />
      <main className="overflow-y-auto pt-16 px-20 pb-24 ">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AppLayout;
