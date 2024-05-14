import { Sidebar } from "flowbite-react";
import type { CustomFlowbiteTheme } from "flowbite-react";
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
import { NavLink } from "react-router-dom";

const customTheme: CustomFlowbiteTheme["sidebar"] = {
  root: {
    base: "h-screen",
    collapsed: {
      on: "w-16",
      off: "w-64",
    },
    inner:
      "h-full overflow-y-auto overflow-x-hidden rounded bg-slate-50 px-3 py-4 dark:bg-gray-800",
  },
  collapse: {
    button:
      "group flex w-full items-center rounded-lg p-2 text-base font-normal text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700",
    icon: {
      base: "h-6 w-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white",
      open: {
        off: "",
        on: "text-gray-500",
      },
    },
    label: {
      base: "ml-3 flex-1 whitespace-nowrap text-left",
      icon: {
        base: "h-6 w-6 transition delay-0 ease-in-out",
        open: {
          on: "rotate-180",
          off: "",
        },
      },
    },
    list: "space-y-0 py-0",
  },
  cta: {
    base: "mt-6 rounded-lg bg-gray-50 p-4 dark:bg-gray-700",
    color: {
      blue: "bg-cyan-50 dark:bg-cyan-900",
      dark: "bg-dark-50 dark:bg-dark-900",
      failure: "bg-red-50 dark:bg-red-900",
      gray: "bg-alternative-50 dark:bg-alternative-900",
      green: "bg-green-50 dark:bg-green-900",
      light: "bg-light-50 dark:bg-light-900",
      red: "bg-red-50 dark:bg-red-900",
      purple: "bg-purple-50 dark:bg-purple-900",
      success: "bg-green-50 dark:bg-green-900",
      yellow: "bg-yellow-50 dark:bg-yellow-900",
      warning: "bg-yellow-50 dark:bg-yellow-900",
    },
  },
  item: {
    base: "flex items-center justify-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700",
    active: "bg-gray-50 dark:bg-gray-700",
    collapsed: {
      insideCollapse: "group w-full pl-8 transition duration-75",
      noIcon: "font-bold",
    },
    content: {
      base: "flex-1 whitespace-nowrap px-3",
    },
    icon: {
      base: "h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white",
      active: "text-gray-700 dark:text-gray-100",
    },
    label: "",
    listItem: "",
  },
  items: {
    base: "",
  },
  itemGroup: {
    base: "mt-4 space-y-2 border-t border-gray-200 pt-4 first:mt-0 first:border-t-0 first:pt-0 dark:border-gray-700",
  },
  logo: {
    base: "mb-5 flex items-center pl-2.5",
    collapsed: {
      on: "hidden",
      off: "self-center whitespace-nowrap text-xl font-semibold dark:text-white",
    },
    img: "mr-3 h-6 sm:h-7",
  },
};

export default function SideBar() {
  const [showSidebar, setShowSidebar] = useState(true);

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
          <Sidebar theme={customTheme} aria-label="travel">
            <Sidebar.Items>
              <Sidebar.ItemGroup>
                <Sidebar.Item onClick={toggleSidebar}>
                  <HiChevronDoubleLeft />
                </Sidebar.Item>

                <Sidebar.Item>Name of the Trip</Sidebar.Item>
                <NavLink to="/schedule">
                  <Sidebar.Item icon={HiMap}>Schedule</Sidebar.Item>
                </NavLink>
                <NavLink to="day">
                  <Sidebar.Collapse icon={HiCalendar} label="Daily Schedule">
                    <Sidebar.Item href="#">Day 1</Sidebar.Item>
                    <Sidebar.Item href="#">Day 2</Sidebar.Item>
                    <Sidebar.Item href="#">Day 3</Sidebar.Item>
                    <Sidebar.Item href="#">Day 4</Sidebar.Item>
                  </Sidebar.Collapse>
                </NavLink>
                <NavLink to="places">
                  <Sidebar.Item icon={HiLocationMarker}>Places</Sidebar.Item>
                </NavLink>
                <NavLink to="organize">
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
