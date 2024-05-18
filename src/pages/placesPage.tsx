import { UserRContext } from "../providers/userProvider";
import { useContext, useState } from "react";
import {
  PlacesAutoComplete,
  MapProps,
} from "../components/maps/PlacesAutoComplete";
import { useLoadScript } from "@react-google-maps/api";
import { Spinner } from "flowbite-react";
import { usePlaces } from "../components/hooks/usePlaces";
import { PlacePreviewCard } from "../components/place/PlacesPreviewCard";
import { PlacePreview } from "../utilities/types";
import { MapComponent } from "../components/maps/Map";

export default function PlacesPage() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY!,
    libraries: ["places"],
  });
  const { isLoading, places } = usePlaces();
  const [selectedPlace, setSelectedPlace] = useState<MapProps | null>(null);

  return (
    <>
      {!isLoaded && <Spinner />}
      {isLoaded && (
        <div className="flex flex-col">
          <div className="w-10/12">
            <div className="w-full grid grid-cols-6 gap-4">
              <div className="col-span-2">
                <PlacesAutoComplete setSelectedPlace={setSelectedPlace} />
              </div>
              <div className="col-span-4">
                <MapComponent place={selectedPlace} />
              </div>
            </div>
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
