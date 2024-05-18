import { GoogleMap, Marker, MarkerF } from "@react-google-maps/api";
import { MapProps } from "./PlacesAutoComplete";
import { PlacePreview } from "../../utilities/types";
import { getGeocode, getLatLng } from "use-places-autocomplete";
import { useRef } from "react";

interface MapComponentProps {
  place: MapProps | null;
  places: PlacePreview[];
}

export const MapComponent: React.FC<MapComponentProps> = ({
  place,
  places,
}) => {
  const mapContainerStyle = {
    width: "100%",
    height: "45vh",
  };
  const mapRef = useRef<google.maps.Map | null>(null);

  console.log(places);

  let selectedMarker: google.maps.Marker | null = null;

  const onLoad = (map: google.maps.Map) => {
    mapRef.current = map;
    if (places.length > 0) {
      const bounds = new google.maps.LatLngBounds();
      places.forEach((p) => {
        bounds.extend(new google.maps.LatLng(p.lat, p.lng));
      });
      map.fitBounds(bounds);
    } else {
      const worldBounds = {
        north: 85,
        south: -85,
        west: -180,
        east: 180,
      };
      map.fitBounds(worldBounds);
    }
  };

  const onLoadMarker = (markerInstance: google.maps.Marker) => {
    selectedMarker = markerInstance;
    console.log("Marker", selectedMarker.getPosition);
  };

  return (
    <>
      <GoogleMap
        mapContainerClassName="map_container"
        mapContainerStyle={mapContainerStyle}
        zoom={14}
        onLoad={onLoad}
      >
        {places &&
          places.map((p, index) => (
            <MarkerF
              key={p.id}
              position={{ lat: p.lat, lng: p.lng }}
              label={{ text: (index + 1).toString(), color: "white" }}
            />
          ))}
        {place && place.lat !== 0 && (
          <Marker
            position={{ lat: place.lat, lng: place.lng }}
            onLoad={onLoadMarker}
            icon={{
              url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
              scaledSize: new google.maps.Size(45, 45),
            }}
          />
        )}
      </GoogleMap>
    </>
  );
};
