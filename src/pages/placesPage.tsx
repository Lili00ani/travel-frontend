import { UserRContext } from "../providers/userProvider";
import { useContext } from "react";
import { PlacesAutoComplete } from "../components/maps/PlacesAutoComplete";
import { useLoadScript } from "@react-google-maps/api";
import { Spinner } from "flowbite-react";
import { usePlaces } from "../components/hooks/usePlaces";
import { PlacePreviewCard } from "../components/place/PlacesPreviewCard";
import { PlacePreview } from "../utilities/types";

export default function PlacesPage() {
  const value = useContext(UserRContext);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY!,
    libraries: ["places"],
  });
  const userId = value?.user;
  const { isLoading, places } = usePlaces();

  return (
    <>
      {!isLoaded && <Spinner />}
      {isLoaded && (
        <div className="flex flex-col">
          <div className="w-10/12">
            <PlacesAutoComplete />
          </div>
          {isLoading && <Spinner />}
          <div className="w-10/12 my-10">
            <div className="w-full grid grid-cols-1 gap-4 md:grid-cols-6">
              {Array.isArray(places) &&
                places.map((place: PlacePreview) => (
                  <PlacePreviewCard key={place.id} {...place} />
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
