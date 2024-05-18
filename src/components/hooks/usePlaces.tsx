import { useEffect, useState } from "react";
import axios from "axios";
import { PlacePreview } from "../../utilities/types";
import { useAuth0 } from "@auth0/auth0-react";
import { BACKEND_URL } from "../../constant";
import { useParams } from "react-router-dom";

export const usePlaces = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [places, setPlaces] = useState<PlacePreview>();
  const { getAccessTokenSilently } = useAuth0();
  const { id } = useParams();

  const fetchAllPlaces = async () => {
    setIsLoading(true);
    try {
      const accessToken = await getAccessTokenSilently();
      const response = await axios.get(`${BACKEND_URL}/place/all`, {
        params: {
          id: id,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setPlaces(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchAllPlaces();
  }, [id]);

  return { isLoading, places, fetchAllPlaces };
};
