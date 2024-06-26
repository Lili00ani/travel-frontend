"use client";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, MegaMenu, Navbar } from "flowbite-react";
import { Link } from "react-router-dom";
import { LoginButton } from "./button/Login";
import { LogoutButton } from "./button/Logout";
import { CustomNavBar } from "./flowbite/NavBar";

function NavigationBar() {
  const { isAuthenticated, getAccessTokenSilently, user } = useAuth0();

  return (
    <>
      <Navbar theme={CustomNavBar} fluid rounded>
        <Navbar.Brand href="/">
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Travelin'
          </span>
        </Navbar.Brand>
        {isAuthenticated && (
          <>
            <div className="flex md:order-2">
              <Button color="dark" as={Link} to="/create">
                Create Travel Plan
              </Button>
              <Navbar.Toggle />
            </div>
            <Navbar.Collapse>
              <LogoutButton />
            </Navbar.Collapse>
          </>
        )}
        {!isAuthenticated && (
          <>
            <div className="flex md:order-2">
              <LoginButton />
            </div>
          </>
        )}
      </Navbar>
      <hr className="w-full border-t border-gray-300 mt-1" />
    </>
  );
}

export default NavigationBar;
