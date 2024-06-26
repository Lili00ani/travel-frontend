import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "flowbite-react";

export const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/home",
      },
    });
  };
  return (
    <Button color="light" onClick={handleLogin}>
      Log In
    </Button>
  );
};
