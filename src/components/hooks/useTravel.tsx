import { useEffect, useState } from "react";
import axios from "axios";
import { Travel } from "../../utilities/types";
import { useAuth0 } from "@auth0/auth0-react";
import { BACKEND_URL } from "../../constant";
import { useParams } from "react-router-dom";

const initialTravelState: Travel = {
  id: 0,
  name: "",
  owner_id: "",
  start: new Date(),
  end: new Date(),
  pax: 0,
  country_code: "",
  updated_at: new Date(),
  created_at: new Date(),
};

export const useTravel = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [travel, setTravel] = useState<Travel>(initialTravelState);
  const { getAccessTokenSilently, user } = useAuth0();
  const { id } = useParams();

  const fetchTravelPlan = async () => {
    setIsLoading(true);
    try {
      console.log("fetchalluserId", user?.sub);
      const accessToken = await getAccessTokenSilently();
      const response = await axios.get(`${BACKEND_URL}/travel`, {
        params: {
          travel: id,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setTravel(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTravelPlan();
  }, []);

  return { isLoading, travel };
};
