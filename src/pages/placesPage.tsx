import { UserRContext } from "../providers/userProvider";
import { useContext, useState, useEffect } from "react";
import {
  PlacesAutoComplete,
  MapProps,
} from "../components/maps/PlacesAutoComplete";
import { Spinner } from "flowbite-react";
import { usePlaces } from "../components/hooks/usePlaces";
import { PlacePreviewCard } from "../components/PlacesPreviewCard";
import { PlacePreview } from "../components/utils/types";
import { MapComponent } from "../components/maps/Map";

export default function PlacesPage() {
  const { isLoading, places, fetchAllPlaces, deletePlace } = usePlaces();
  const [selectedPlace, setSelectedPlace] = useState<MapProps | null>(null);

  useEffect(() => {
    fetchAllPlaces();
  }, [selectedPlace]);

  console.log(places);

  console.log("isLoading:", isLoading);
  console.log("places:", places);

  const handleDelete = async (id: number) => {
    await deletePlace(id);
    fetchAllPlaces();
  };

  return (
    <>
      {
        <div className="flex flex-col">
          <div className="md:w-10/12 w-full mx-auto">
            <div className="w-full grid md:grid-cols-6 gap-4">
              <div className="md:col-span-6">
                <PlacesAutoComplete setSelectedPlace={setSelectedPlace} />
              </div>
              <div className="md:col-span-6">
                {!isLoading && (
                  <MapComponent place={selectedPlace} places={places} />
                )}
              </div>
            </div>
          </div>
          {isLoading && <Spinner />}
          <div className="md:w-10/12 my-10 mx-auto">
            <p className="font-semibold text-xl">😍Saved Places</p>
            <hr className="h-px mt-2 mb-3 bg-gray-200 border-0 dark:bg-gray-700" />
            <div className="w-full grid grid-cols-1 gap-4 md:grid-cols-6">
              {Array.isArray(places) &&
                places.map((place: PlacePreview, index: number) => (
                  <PlacePreviewCard
                    key={place.id}
                    index={index}
                    {...place}
                    onDelete={handleDelete}
                  />
                ))}
            </div>
          </div>
        </div>
      }
    </>
  );
}
