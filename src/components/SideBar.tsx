import { Sidebar, Spinner, Tooltip } from "flowbite-react";
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
import { useTravel } from "./hooks/useTravel";
import DateRangeComponent from "./utils/DateRange";

interface SideBarProps {
  showSidebar: boolean;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SideBar: React.FC<SideBarProps> = ({
  showSidebar,
  setShowSidebar,
}) => {
  const { id } = useParams();
  const { isLoading, travel } = useTravel();
  const startDate = new Date(travel.start);
  const endDate = new Date(travel.end);

  console.log(id);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="fixed top-0 left-0 h-full z-50">
      {!showSidebar && (
        <div className="px-6 py-5 text-xl">
          <Tooltip
            arrow={false}
            content="Show Menu"
            trigger="hover"
            placement="right"
            animation="duration-300"
          >
            <button onClick={toggleSidebar}>
              <HiMenu />
            </button>
          </Tooltip>
        </div>
      )}

      <div className="px-0 py-0 h-dvh">
        {showSidebar && (
          <Sidebar theme={CustomSideBar} aria-label="travel">
            <Sidebar.Items>
              <Sidebar.ItemGroup>
                <Tooltip
                  arrow={false}
                  content="Hide Menu"
                  trigger="hover"
                  placement="right"
                  animation="duration-300"
                >
                  <Sidebar.Item onClick={toggleSidebar}>
                    <HiChevronDoubleLeft />
                  </Sidebar.Item>
                </Tooltip>

                <Sidebar.Item>
                  <Tooltip
                    arrow={false}
                    content="Edit"
                    trigger="hover"
                    placement="right"
                    animation="duration-300"
                  >
                    <NavLink to={`/${id}/edit`}>
                      <strong>{travel.name}</strong>
                      <DateRangeComponent
                        startDate={startDate}
                        endDate={endDate}
                      />
                    </NavLink>
                  </Tooltip>
                </Sidebar.Item>
                <Sidebar.ItemGroup>
                  <NavLink to="home">
                    <Sidebar.Item icon={HiHome}>Homepage</Sidebar.Item>
                  </NavLink>
                </Sidebar.ItemGroup>
              </Sidebar.ItemGroup>
              <Sidebar.ItemGroup>
                {/* <NavLink to={`/${id}/schedule`}>
                  <Sidebar.Item icon={HiMap}>Schedule</Sidebar.Item>
                </NavLink> */}
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
            </Sidebar.Items>
          </Sidebar>
        )}
      </div>
    </div>
  );
};
