"use client";

import { Button, MegaMenu, Navbar } from "flowbite-react";
import { Link } from "react-router-dom";
import { LogoutButton } from "./button/Logout";
import { CustomNavBar } from "./flowbite/NavBar";

function NavigationBar() {
  return (
    <Navbar theme={CustomNavBar} fluid rounded>
      <Navbar.Brand href="/">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          TravelPin
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Button as={Link} to="/create">
          Create Travel Plan
        </Button>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <LogoutButton />
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavigationBar;
