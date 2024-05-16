import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { BACKEND_URL } from "../../constant";
import { PlacePreview } from "./PlacesPreviewCard";
import { useParams } from "react-router-dom";
import axios from "axios";
import { PlacePreviewCard } from "./PlacesPreviewCard";

const initialPlacesList: PlacePreview[] = [];

export const PlacesList = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [places, setPlaces] = useState<PlacePreview[]>(initialPlacesList);
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
  }, []);

  return (
    <div className="w-full grid grid-cols-1 gap-4 md:grid-cols-6">
      {places.map((place) => (
        <PlacePreviewCard key={place.id} {...place} />
      ))}
    </div>
  );
};
