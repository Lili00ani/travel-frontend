import { useEffect, useState } from "react";
import axios from "axios";
import { PlacePreview } from "../utils/types";
import { useAuth0 } from "@auth0/auth0-react";
import { BACKEND_URL } from "../../constant";
import { useParams } from "react-router-dom";
import { PlaceUpdate } from "../utils/types";

export const usePlaces = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [places, setPlaces] = useState<PlacePreview[]>([]);
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

  const deletePlace = async (placeId: number) => {
    setIsLoading(true);
    try {
      const accessToken = await getAccessTokenSilently();
      console.log(placeId);
      await axios.delete(`${BACKEND_URL}/place/${placeId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const updatePlace = async (placeId: number, updateData: PlaceUpdate) => {
    setIsLoading(true);
    try {
      const accessToken = await getAccessTokenSilently();
      console.log(placeId);
      await axios.put(`${BACKEND_URL}/place/${placeId}`, updateData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, places, fetchAllPlaces, deletePlace, updatePlace };
};
