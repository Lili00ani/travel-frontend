import React, { useState } from "react";
import { APIProvider, ControlPosition, Map } from "@vis.gl/react-google-maps";

import ControlPanel from "./control-panel";
import { CustomMapControl } from "./map-control";
import MapHandler from "./map-handler";

const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string;

export type AutocompleteMode = { id: string; label: string };

const autocompleteModes: Array<AutocompleteMode> = [
  { id: "custom-hybrid", label: "Custom w/ Select Widget" },
];

export const MapComponent = () => {
  const [selectedAutocompleteMode, setSelectedAutocompleteMode] =
    useState<AutocompleteMode>(autocompleteModes[0]);

  const [selectedPlace, setSelectedPlace] =
    useState<google.maps.places.PlaceResult | null>(null);

  return (
    <APIProvider apiKey={API_KEY}>
      <Map
        defaultZoom={3}
        style={{ width: "50vw", height: "30vh" }}
        defaultCenter={{ lat: 22.54992, lng: 0 }}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
      />

      <CustomMapControl
        controlPosition={ControlPosition.TOP}
        selectedAutocompleteMode={selectedAutocompleteMode}
        onPlaceSelect={setSelectedPlace}
      />

      <ControlPanel selectedAutocompleteMode={selectedAutocompleteMode} />

      <MapHandler place={selectedPlace} />
    </APIProvider>
  );
};
