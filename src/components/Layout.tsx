import { Outlet } from "react-router-dom";
import { SideBar } from "./SideBar";
import { useState } from "react";

export default function Layout() {
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <div className="flex flex-row h-dvh">
      <div>
        <SideBar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      </div>
      <div
        className={`flex-1 ${
          showSidebar ? "ml-64" : "ml-16"
        } overflow-y-auto px-10 py-5`}
      >
        <Outlet />
      </div>
    </div>
  );
}
