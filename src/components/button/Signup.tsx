import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "flowbite-react";

export const SignupButton = () => {
  const { loginWithRedirect } = useAuth0();

  const handleSignUp = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/home",
      },
      authorizationParams: {
        screen_hint: "signup",
      },
    });
  };

  return (
    <Button color="dark" onClick={handleSignUp}>
      Get Started
    </Button>
  );
};
