import { Outlet } from "react-router-dom";
import Header from "./Header";
// import Sidebar from "./Sidebar";

function AppLayout() {
  return (
    <div className="">
      <Header />
      {/* <Sidebar /> */}
      <main className=" ">
        <div className="">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AppLayout;
