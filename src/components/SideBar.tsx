import { Sidebar } from "flowbite-react";
import {
  HiCalendar,
  HiChevronDoubleLeft,
  HiHome,
  HiLocationMarker,
  HiMap,
  HiMenu,
  HiOutlineTable,
} from "react-icons/hi";
import { useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { CustomSideBar } from "./flowbite/SideBar";

export default function SideBar() {
  const [showSidebar, setShowSidebar] = useState(true);
  const { id } = useParams();

  console.log(id);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div>
      {!showSidebar && (
        <div className="px-3 py-3 text-xl">
          <button onClick={toggleSidebar}>
            <HiMenu />
          </button>
        </div>
      )}

      <div className="px-0 py-0">
        {showSidebar && (
          <Sidebar theme={CustomSideBar} aria-label="travel">
            <Sidebar.Items>
              <Sidebar.ItemGroup>
                <Sidebar.Item onClick={toggleSidebar}>
                  <HiChevronDoubleLeft />
                </Sidebar.Item>

                <Sidebar.Item>Name of the Trip</Sidebar.Item>
                <NavLink to={`/${id}/schedule`}>
                  <Sidebar.Item icon={HiMap}>Schedule</Sidebar.Item>
                </NavLink>
                {/* <NavLink to="day">
                  <Sidebar.Collapse icon={HiCalendar} label="Daily Schedule">
                    <Sidebar.Item href="#">Day 1</Sidebar.Item>
                    <Sidebar.Item href="#">Day 2</Sidebar.Item>
                    <Sidebar.Item href="#">Day 3</Sidebar.Item>
                    <Sidebar.Item href="#">Day 4</Sidebar.Item>
                  </Sidebar.Collapse>
                </NavLink> */}
                <NavLink to={`/${id}/places`}>
                  <Sidebar.Item icon={HiLocationMarker}>Places</Sidebar.Item>
                </NavLink>
                <NavLink to={`/${id}/organize`}>
                  <Sidebar.Item icon={HiOutlineTable}>Organize</Sidebar.Item>
                </NavLink>
              </Sidebar.ItemGroup>
              <Sidebar.ItemGroup>
                <NavLink to="home">
                  <Sidebar.Item icon={HiHome}>Homepage</Sidebar.Item>
                </NavLink>
              </Sidebar.ItemGroup>
            </Sidebar.Items>
          </Sidebar>
        )}
      </div>
    </div>
  );
}
