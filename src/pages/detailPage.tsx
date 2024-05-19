import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDetails } from "use-places-autocomplete";
import axios from "axios";
import { BACKEND_URL } from "../constant";
import { useLoadScript } from "@react-google-maps/api";
import PlaceDetailCard from "../components/PlacesDetailCard";

export default function DetailPage() {
  const { id, id2 } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [googleId, setGoogleId] = useState<string>("");
  const [placeDetails, setPlaceDetails] = useState<any>(null);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY!,
    libraries: ["places"],
  });

  //get google places based on the place Id
  useEffect(() => {
    const getGoogleId = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BACKEND_URL}/place/${id2}`);
        setGoogleId(response.data.google_places);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    getGoogleId();
  }, [id2]);

  //use google places id in handle details
  const handleDetails = async () => {
    if (!googleId || !isLoaded) return;
    try {
      const outcome = await getDetails({
        placeId: googleId,
      });
      if (typeof outcome !== "string") {
        setPlaceDetails(outcome);
      }
    } catch (error) {
      console.error("Error fetching details:", error);
    }
  };

  useEffect(() => {
    handleDetails();
  }, [googleId, isLoaded]);

  console.log(placeDetails);

  return (
    <div className="w-7/12 mx-auto">
      {placeDetails && <PlaceDetailCard details={placeDetails} />}
    </div>
  );
}
