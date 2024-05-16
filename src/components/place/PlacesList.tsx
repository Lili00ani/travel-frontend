import { PlacePreviewCard } from "./PlacesPreviewCard";
import { usePlaces } from "../hooks/usePlaces";
import { PlacePreview } from "../../utilities/types";
import { Spinner } from "flowbite-react";

export const PlacesList = () => {
  const { isLoading, places } = usePlaces();

  return (
    <>
      {isLoading && (
        <div className="text-center">
          <Spinner aria-label="Center-aligned spinner example" />
        </div>
      )}
      <div className="w-full grid grid-cols-1 gap-4 md:grid-cols-6">
        {Array.isArray(places) &&
          places.map((place: PlacePreview) => (
            <PlacePreviewCard key={place.id} {...place} />
          ))}
      </div>
    </>
  );
};
