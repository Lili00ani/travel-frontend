import { UserRContext } from "../providers/userProvider";
import { useContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../constant";
import axios from "axios";
import { Spinner } from "flowbite-react";
import NavigationBar from "../components/NavBar";
import TravelPreviewCard from "../components/TravelPreviewCard";
import { Travel } from "../components/utilities/types";

const initialTravelState: Travel[] = [];

export default function HomePage() {
  const value = useContext(UserRContext);
  const { isAuthenticated, getAccessTokenSilently, user } = useAuth0();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [travels, setTravels] = useState<Travel[]>(initialTravelState);
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

  const fetchTravelPlans = async () => {
    setLoading(true);
    try {
      console.log("fetchalluserId", value?.user.userId!);
      const accessToken = await getAccessTokenSilently();
      const response = await axios.get(`${BACKEND_URL}/travel/all`, {
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

  useEffect(() => {
    checkUser();
  }, [user, isAuthenticated]);

  useEffect(() => {
    if (isChecked) {
      fetchTravelPlans();
    }
  }, [isChecked]);

  const travelPreviews = travels.map((travel) => (
    <TravelPreviewCard key={travel.id} {...travel} />
  ));

  console.log(travels);

  return (
    <>
      <NavigationBar />
      <div className="flex flex-col items-center justify-center w-screen pb-10">
        {loading && (
          <div className="text-center">
            <Spinner aria-label="Center-aligned spinner example" />
          </div>
        )}
        <div className="flex-col">
          <h2 className="px-10 my-10 text-4xl">Your Travel Plan</h2>
          <div className="w-90 grid grid-cols-1 gap-4 mx-10 md:grid-cols-3">
            {travelPreviews}
          </div>
        </div>
      </div>
    </>
  );
}
