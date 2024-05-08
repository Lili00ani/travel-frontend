import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";

export default function Layout() {
  return (
    <div className="flex flex-row">
      <div>
        <SideBar />
      </div>
      <div className="inset-x-1.5 flex justify-center w-full px-10 py-5 h-screen ">
        <Outlet />
      </div>
    </div>
  );
}
