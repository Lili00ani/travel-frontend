import React, { useRef } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { PlacePreview } from "../utils/types";
import { ColumnsType } from "../hooks/useItinerariesData";
import { useState, useEffect } from "react";

interface MapOrganizeProps {
  places: ColumnsType;
}

const markerColors = [
  "http://maps.google.com/mapfiles/ms/icons/red.png",
  "http://maps.google.com/mapfiles/ms/icons/blue.png",
  "http://maps.google.com/mapfiles/ms/icons/green.png",
  "http://maps.google.com/mapfiles/ms/icons/yellow.png",
  "http://maps.google.com/mapfiles/ms/icons/purple.png",
  "http://maps.google.com/mapfiles/ms/icons/orange.png",
  "http://maps.google.com/mapfiles/ms/icons/pink.png",
  "http://maps.google.com/mapfiles/ms/icons/brown.png",
  "http://maps.google.com/mapfiles/ms/icons/white.png",
  "http://maps.google.com/mapfiles/ms/icons/black.png",
];

export const MapOrganize: React.FC<MapOrganizeProps> = ({ places }) => {
  const mapContainerStyle = {
    width: "100%",
    height: "45vh",
  };
  const [allPlaces, setAllPlaces] = useState<PlacePreview[]>([]);
  const mapRef = useRef<google.maps.Map | null>(null);

  useEffect(() => {
    const allPlacesList = Object.values(places).flatMap(
      (column) => column.list
    );
    setAllPlaces(allPlacesList);
  }, [places]);

  const fitBoundsToPlaces = (map: google.maps.Map, places: PlacePreview[]) => {
    const bounds = new google.maps.LatLngBounds();
    if (places.length < 1) {
      const worldBounds = {
        north: 85,
        south: -85,
        west: -180,
        east: 180,
      };
      map.fitBounds(worldBounds);
    } else {
      places.forEach((p: PlacePreview) => {
        bounds.extend(new google.maps.LatLng(p.lat, p.lng));
      });
      map.fitBounds(bounds);
    }
  };

  useEffect(() => {
    if (mapRef.current) {
      fitBoundsToPlaces(mapRef.current, allPlaces);
    }
  }, [allPlaces]);

  const onLoad = (map: google.maps.Map) => {
    mapRef.current = map;
    fitBoundsToPlaces(map, allPlaces);
  };

  const markers = Object.keys(places).flatMap((key, colIndex) =>
    places[key].list.map((place, index) => (
      <Marker
        key={place.id}
        position={{ lat: place.lat, lng: place.lng }}
        label={{
          text: (index + 1).toString(),
          color: "black",
        }}
        icon={{
          url: markerColors[(colIndex % markerColors.length) + 1],
          scaledSize: new google.maps.Size(45, 45),
          labelOrigin: new google.maps.Point(22, 15),
        }}
      />
    ))
  );

  return (
    <>
      <GoogleMap
        mapContainerClassName="map_container"
        mapContainerStyle={mapContainerStyle}
        zoom={14}
        onLoad={onLoad}
      >
        {markers}
      </GoogleMap>
    </>
  );
};
