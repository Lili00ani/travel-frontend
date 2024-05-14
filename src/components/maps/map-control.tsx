import React from "react";
import { ControlPosition, MapControl } from "@vis.gl/react-google-maps";
import { AutocompleteCustomHybrid } from "./autocomplete";
import type { AutocompleteMode } from "./MapComponent";

type CustomAutocompleteControlProps = {
  controlPosition: ControlPosition;
  selectedAutocompleteMode: AutocompleteMode;
  onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
};

export const CustomMapControl = ({
  controlPosition,
  selectedAutocompleteMode,
  onPlaceSelect,
}: CustomAutocompleteControlProps) => {
  const { id } = selectedAutocompleteMode;

  return (
    <MapControl position={controlPosition}>
      <div className="autocomplete-control">
        {id === "custom-hybrid" && (
          <AutocompleteCustomHybrid onPlaceSelect={onPlaceSelect} />
        )}
      </div>
    </MapControl>
  );
};
