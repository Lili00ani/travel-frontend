import { GoogleMap, Marker } from "@react-google-maps/api";
import { MapProps } from "./PlacesAutoComplete";

export const MapComponent: React.FC<{ place: MapProps | null }> = ({
  place,
}) => {
  const defaultCenter = { lat: 30.0444, lng: 31.2357 };
  const center = place ? { lat: place.lat, lng: place.lng } : defaultCenter;

  const mapContainerStyle = {
    width: "100%",
    height: "45vh",
  };

  let marker: google.maps.Marker | null = null;

  const onLoadMarker = (markerInstance: google.maps.Marker) => {
    marker = markerInstance;
    console.log("Marker", marker.getPosition);
  };

  const contentString = `<div>
    <h2>${place?.description}</h2>
    <p>${place?.formattedAddress}</p>
  </div>`;

  return (
    <>
      <GoogleMap
        mapContainerClassName="map_container"
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={15}
        options={{ disableDefaultUI: true }}
      >
        {place && (
          <Marker
            position={{ lat: place.lat, lng: place.lng }}
            onLoad={onLoadMarker}
            onClick={() => {
              if (marker) {
                new google.maps.InfoWindow({
                  content: contentString,
                  ariaLabel: "Location",
                }).open({ anchor: marker });
              }
            }}
          />
        )}
      </GoogleMap>
    </>
  );
};
