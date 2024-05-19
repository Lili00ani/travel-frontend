import { useEffect, useState } from "react";
import axios from "axios";
import { PlacePreview } from "../../utilities/types";
import { useAuth0 } from "@auth0/auth0-react";
import { BACKEND_URL } from "../../constant";
import { useParams } from "react-router-dom";
import { ItineraryAttributes } from "../../utilities/types";

export interface Column {
  id: string;
  list: Array<PlacePreview>;
}

export interface Columns {
  [key: string]: Column;
}

const createInitialColumns = (duration: number): Columns => {
  const columns: Columns = {
    saved: {
      id: "saved",
      list: [],
    },
  };
  for (let day = 1; day <= duration; day++) {
    columns[day] = {
      id: `${day}`,
      list: [],
    };
  }
  return columns;
};

export const useColumnsData = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>(0);
  const [columns, setColumns] = useState(createInitialColumns(0));
  const { getAccessTokenSilently } = useAuth0();
  const { id } = useParams();

  console.log(duration);

  useEffect(() => {
    const fetchTravelDuration = async () => {
      setIsLoading(true);
      try {
        const accessToken = await getAccessTokenSilently();
        const response = await axios.get(`${BACKEND_URL}/travel/duration`, {
          params: { id },
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setDuration(response.data);
        setColumns(createInitialColumns(response.data));
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
    fetchTravelDuration();
  }, [id, getAccessTokenSilently]);

  useEffect(() => {
    const fetchUnassignedPlaces = async () => {
      setIsLoading(true);
      try {
        const accessToken = await getAccessTokenSilently();
        const response = await axios.get(`${BACKEND_URL}/place/unassigned`, {
          params: { id },
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const unassignedPlaces: PlacePreview[] = response.data;
        setColumns((prevColumns) => ({
          ...prevColumns,
          saved: {
            ...prevColumns.saved,
            list: unassignedPlaces,
          },
        }));
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
    fetchUnassignedPlaces();
  }, [id, getAccessTokenSilently]);

  useEffect(() => {
    const fetchItineraries = async () => {
      setIsLoading(true);
      try {
        const accessToken = await getAccessTokenSilently();
        const response = await axios.get(`${BACKEND_URL}/itineraries`, {
          params: { travel_id: id },
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const itineraries: ItineraryAttributes[] = response.data;

        // Fetch place details for each itinerary
        const placePromises = itineraries.map((itinerary) =>
          axios.get(`${BACKEND_URL}/place/${itinerary.place_id}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
        );

        const placesResponses = await Promise.all(placePromises);
        const places = placesResponses.map((response) => response.data);

        // Create a map of place_id to PlacePreview
        const placeMap: { [key: number]: PlacePreview } = {};
        places.forEach((place: PlacePreview) => {
          placeMap[place.id] = place;
        });

        const newColumns = createInitialColumns(duration);

        itineraries.forEach((itinerary: ItineraryAttributes) => {
          const place = placeMap[itinerary.place_id];
          if (newColumns[itinerary.day] && place) {
            newColumns[itinerary.day].list.push(place);
          }
        });

        setColumns(newColumns);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    if (duration > 0) {
      fetchItineraries();
    }
  }, [id, duration, getAccessTokenSilently]);

  console.log(columns);

  return { columns, isLoading };
};
