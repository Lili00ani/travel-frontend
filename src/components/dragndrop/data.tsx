import { useEffect, useState } from "react";
import axios from "axios";
import { PlacePreview } from "../../utilities/types";
import { useAuth0 } from "@auth0/auth0-react";
import { BACKEND_URL } from "../../constant";
import { useParams } from "react-router-dom";

export const initialColumns = {
  saved: {
    id: "saved",
    list: [],
  },
  Day1: {
    id: "1",
    list: [],
  },
  Day2: {
    id: "2",
    list: [],
  },
  Day3: {
    id: "3",
    list: [],
  },
};

export const Data = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [travel, setTravel] = useState<Travel>(initialTravelState);
  const [duration, setDuration] = useState<number>(0);
  const { getAccessTokenSilently } = useAuth0();
  const { id } = useParams();

  //useEffect to get the travel duration
  useEffect(() => {
    const fetchTravelDuration = async () => {
      setIsLoading(true);
      try {
        const accessToken = await getAccessTokenSilently();
        const response = await axios.get(`${BACKEND_URL}/travel/duration`, {
          params: {
            id: id,
          },
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setDuration(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
    fetchTravelDuration();
  }, [id]);

  //auto create day 1, day 2, day 3, etc.

  return (
    <div>
      <h1>Hello</h1>
    </div>
  );
};

//useEffect to get all the places list
//useEffect to get the itineraries table
// interface ItineraryAttributes {
//   day: number;
//   color: string;
//   place_id: number;
//   start: Date;
//   end: Date;
//   index: number;
//   travel_id: number;
// }
