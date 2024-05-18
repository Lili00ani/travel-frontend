import { GoogleMap, Marker } from "@react-google-maps/api";
import { MapProps } from "./PlacesAutoComplete";
import { PlacePreview } from "../../utilities/types";
import { getGeocode, getLatLng } from "use-places-autocomplete";

interface MapComponentProps {
  place: MapProps | null;
  places: PlacePreview[];
}

export const MapComponent: React.FC<MapComponentProps> = ({
  place,
  places,
}) => {
  const defaultCenter = { lat: 30.0444, lng: 31.2357 };
  const center =
    place && place.lat !== 0
      ? { lat: place.lat, lng: place.lng }
      : defaultCenter;

  const mapContainerStyle = {
    width: "100%",
    height: "45vh",
  };

  let selectedMarker: google.maps.Marker | null = null;

  const onLoadMarker = (markerInstance: google.maps.Marker) => {
    selectedMarker = markerInstance;
    console.log("Marker", selectedMarker.getPosition);
  };

  // const contentString = `<div>
  //   <h2>${place?.description}</h2>
  //   <p>${place?.formattedAddress}</p>
  // </div>`;

  return (
    <>
      <GoogleMap
        mapContainerClassName="map_container"
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={15}
        options={{ disableDefaultUI: true }}
      >
        {places &&
          places.map((p) => (
            <Marker key={p.id} position={{ lat: p.lat, lng: p.lng }} />
          ))}
        {place && place.lat !== 0 && (
          <Marker
            position={{ lat: place.lat, lng: place.lng }}
            onLoad={onLoadMarker}
            // onClick={() => {
            //   if (marker) {
            //     new google.maps.InfoWindow({
            //       content: contentString,
            //       ariaLabel: "Location",
            //     }).open({ anchor: marker });
            //   }
            // }}
          />
        )}
      </GoogleMap>
    </>
  );
};
