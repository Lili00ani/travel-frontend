import { PlacePreviewCard } from "./PlacesPreviewCard";
import { usePlaces } from "../hooks/usePlaces";
import { PlacePreview } from "../../utilities/types";
import { Spinner } from "flowbite-react";
import { useState } from "react";
import axios from "axios";

export const PlacesList = () => {
  const { isLoading, places, fetchAllPlaces } = usePlaces();
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleDelete = async (id: number) => {
    try {
      setDeletingId(id);
      await axios.delete(`/api/places/${id}`);
      await fetchAllPlaces();
    } catch (error) {
      console.error("Failed to delete place", error);
    } finally {
      setDeletingId(null);
    }
  };

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
            <PlacePreviewCard
              key={place.id}
              {...place}
              onDelete={handleDelete}
            />
          ))}
      </div>
    </>
  );
};
