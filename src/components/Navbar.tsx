"use client";

import { Button, MegaMenu, Navbar } from "flowbite-react";
import { Link } from "react-router-dom";
import { LogoutButton } from "../components/button/Logout";

function NavigationBar() {
  return (
    <MegaMenu>
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4 md:space-x-8">
        <Navbar.Brand href="/">
          <img alt="" src="/favicon.svg" className="mr-3 h-6 sm:h-9" />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Travel Pin
          </span>
        </Navbar.Brand>
        <div className="order-2 hidden items-center md:flex gap-5">
          <LogoutButton />
          <Button as={Link} to="/create">
            Create Travel Plan
          </Button>
        </div>
        <Navbar.Toggle />
      </div>
    </MegaMenu>
  );
}

export default NavigationBar;
