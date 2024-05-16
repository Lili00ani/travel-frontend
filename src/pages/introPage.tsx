import { useAuth0 } from "@auth0/auth0-react";
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
    <div>
      <NavigationBar />
      <div className="flex flex-col items-center text-center">
        <p className="font-sans text-4xl font-semibold mt-12 mb-5">
          Plan, Organize and Travel
        </p>
        <p className="font-sans text-1xl">Organize your plans seamlessly</p>
      </div>
      <div className="flex justify-center">
        <img src="walking.gif" className="mt-4" alt="Walking" />
      </div>
    </div>
  );
}
