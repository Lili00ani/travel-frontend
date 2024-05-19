import { GoogleMap, Marker, MarkerF } from "@react-google-maps/api";
import { MapProps } from "./PlacesAutoComplete";
import { PlacePreview } from "../utils/types";
import { useRef } from "react";

interface MapComponentProps {
  place: MapProps | null;
  places: PlacePreview[];
}

export const MapOrganize: React.FC = ({}) => {
  const mapContainerStyle = {
    width: "100%",
    height: "45vh",
  };
  const mapRef = useRef<google.maps.Map | null>(null);

  // console.log(places);

  // let selectedMarker: google.maps.Marker | null = null;

  // const onLoad = (map: google.maps.Map) => {
  //   mapRef.current = map;
  //   if (places.length > 0) {
  //     const bounds = new google.maps.LatLngBounds();
  //     places.forEach((p) => {
  //       bounds.extend(new google.maps.LatLng(p.lat, p.lng));
  //     });
  //     map.fitBounds(bounds);
  //   } else {
  //     const worldBounds = {
  //       north: 85,
  //       south: -85,
  //       west: -180,
  //       east: 180,
  //     };
  //     map.fitBounds(worldBounds);
  //   }
  // };

  return (
    <>
      <GoogleMap
        mapContainerClassName="map_container"
        mapContainerStyle={mapContainerStyle}
        zoom={14}
        // onLoad={onLoad}
      >
        {/* {places &&
          places.map((p, index) => (
            <MarkerF
              key={p.id}
              position={{ lat: p.lat, lng: p.lng }}
              label={{ text: (index + 1).toString(), color: "white" }}
            />
          ))} */}
      </GoogleMap>
    </>
  );
};
