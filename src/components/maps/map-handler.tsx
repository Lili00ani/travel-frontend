import { useMap } from "@vis.gl/react-google-maps";
import React, { useEffect } from "react";
import { MapProps } from "./PlacesAutoComplete";

interface Props {
  places: MapProps[];
}

export const MapHandler = ({ places }: Props) => {
  const map = useMap();

  useEffect(() => {
    if (!map || places.length === 0) return;

    const bounds = new google.maps.LatLngBounds();

    places.forEach((place) => {
      bounds.extend(new google.maps.LatLng(place.lat, place.lng));
    });

    map.fitBounds(bounds);
  }, [map, places]);

  return null;
};
