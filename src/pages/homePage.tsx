import { LogoutButton } from "../components/button/Logout";
import { UserProvider, UserRContext } from "../providers/userProvider";
import { useContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate, Link } from "react-router-dom";
import { BACKEND_URL } from "../constant";
import axios from "axios";
import { Button, Spinner } from "flowbite-react";
import { Travel } from "../utilities/types";
import PreviewCard from "../components/PreviewCard";
import { PreviewCardProps } from "../components/PreviewCard";

const initialTravelState: PreviewCardProps[] = [];

export default function HomePage() {
  const value = useContext(UserRContext);
  const { isAuthenticated, getAccessTokenSilently, user } = useAuth0();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [travels, setTravels] =
    useState<PreviewCardProps[]>(initialTravelState);
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const checkUser = async () => {
    setLoading(true);
    if (!isAuthenticated) {
      setLoading(false);
      navigate("/");
    } else {
      try {
        const accessToken = await getAccessTokenSilently();
        const response = await axios.post(
          `${BACKEND_URL}/users/`,
          {
            email: user?.email,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const output = await response.data;
        console.log("output", output);
        value?.setUser({ userId: output[0].id, email: output[0].email });
        console.log("checkuser", value?.user.userId!);
        setIsChecked(true);
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setLoading(false);
      }
    }
  };

  const fetchAll = async () => {
    setLoading(true);
    try {
      console.log("fetchalluserId", value?.user.userId!);
      const accessToken = await getAccessTokenSilently();
      const response = await axios.get(`${BACKEND_URL}/travel`, {
        params: {
          id: value?.user.userId!,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setTravels(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  console.log(travels);

  useEffect(() => {
    checkUser();
  }, [user, isAuthenticated]);

  useEffect(() => {
    if (isChecked) {
      fetchAll();
    }
  }, [isChecked]);

  const travelPreviews = travels.map((travel) => (
    <PreviewCard key={travel.id} {...travel} />
  ));

  //what happens if user is not authenticated?

  return (
    <div className="flex">
      {loading && (
        <div className="text-center">
          <Spinner aria-label="Center-aligned spinner example" />
        </div>
      )}
      <h1>homePage</h1>
      <div>
        <Button as={Link} to="/create">
          Create Travel
        </Button>
      </div>
      <div>{travelPreviews}</div>
      <div>
        <LogoutButton />
      </div>
    </div>
  );
}
