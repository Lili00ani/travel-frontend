import { UserRContext } from "../providers/userProvider";
import { useContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../constant";
import axios from "axios";
import { Spinner, Card } from "flowbite-react";
import NavigationBar from "../components/NavBar";
import TravelPreviewCard from "../components/TravelPreviewCard";
import { Travel } from "../components/utils/types";

const initialTravelState: Travel[] = [];

export default function HomePage() {
  const value = useContext(UserRContext);
  const { isAuthenticated, getAccessTokenSilently, user } = useAuth0();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [travelsCurrent, setTravelsCurrent] =
    useState<Travel[]>(initialTravelState);
  const [travelsPast, setTravelsPast] = useState<Travel[]>(initialTravelState);
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

  const fetchTravelCurrentPlans = async () => {
    setLoading(true);
    try {
      console.log("fetchalluserId", value?.user.userId!);
      const accessToken = await getAccessTokenSilently();
      const response = await axios.get(`${BACKEND_URL}/travel/current/all`, {
        params: {
          id: value?.user.userId!,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setTravelsCurrent(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const fetchTravelPastPlans = async () => {
    setLoading(true);
    try {
      console.log("fetchalluserId", value?.user.userId!);
      const accessToken = await getAccessTokenSilently();
      const response = await axios.get(`${BACKEND_URL}/travel/past/all`, {
        params: {
          id: value?.user.userId!,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setTravelsPast(response.data);
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
      fetchTravelCurrentPlans();
      fetchTravelPastPlans();
    }
  }, [isChecked]);

  const currentTravelPreviews = travelsCurrent.map((travel) => (
    <TravelPreviewCard key={travel.id} {...travel} />
  ));

  const pastTravelPreviews = travelsPast.map((travel) => (
    <TravelPreviewCard key={travel.id} {...travel} />
  ));

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
          <h2 className="px-10 my-10 md:text-3xl text-1xl">
            Upcoming Travel Plans
          </h2>
          <div className="w-90 grid grid-cols-1 gap-4 mx-10 md:grid-cols-3">
            <Card href={`./create`} className="w-full h-48 md:py-5 md:px-5">
              <div className="mb-4 flex items-center justify-between">
                <h5 className="md:text-2xl text-xl leading-none text-gray-900 dark:text-white">
                  + Create Travel Plan
                </h5>
              </div>
            </Card>
            {currentTravelPreviews}
          </div>
          <h2 className="px-10 my-10 md:text-3xl text-1xl">
            Past Travel Plans
          </h2>
          <div className="w-90 grid grid-cols-1 gap-4 mx-10 md:grid-cols-3">
            {pastTravelPreviews}
          </div>
        </div>
      </div>
    </>
  );
}
