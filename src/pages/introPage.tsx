import { useAuth0 } from "@auth0/auth0-react";
import { LoginButton } from "../components/button/Login";
import { SignupButton } from "../components/button/Signup";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function IntroPage() {
  const { isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated]);

  return (
    <>
      <h1>IntroPage</h1>
      {!isAuthenticated && (
        <>
          <SignupButton />
          <LoginButton />
        </>
      )}
    </>
  );
}
