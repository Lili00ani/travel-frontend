import { useAuth0 } from "@auth0/auth0-react";
import { LoginButton } from "../components/button/Login";
import { SignupButton } from "../components/button/Signup";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import NavigationBar from "../components/NavBar";

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
      <NavigationBar />
      <h1>IntroPage</h1>
    </>
  );
}
