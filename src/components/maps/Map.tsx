import {
  GoogleMap,
  MarkerF,
  Marker,
  useLoadScript,
} from "@react-google-maps/api";
import { PlacesAutoComplete } from "./Autocomplete";

const Map = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY!,
    libraries: ["places"],
  });

  const center = { lat: 30.0444, lng: 31.2357 };

  const mapContainerStyle = {
    width: "100%",
    height: "30vh",
  };

  const onLoadMarker = (marker: google.maps.Marker) => {
    console.log("Marker", marker.getPosition()?.lat());
  };

  return (
    <div>
      {!isLoaded ? (
        <h3>Loading…..</h3>
      ) : (
        <div className="grid grid-cols-4 gap-4 h-screen">
          <div className="col-span-1">
            <PlacesAutoComplete />
          </div>
          <div className="col-span-3">
            <GoogleMap
              mapContainerClassName="map_container"
              mapContainerStyle={mapContainerStyle}
              center={center}
              zoom={10}
            >
              <MarkerF position={center} onLoad={onLoadMarker} />{" "}
            </GoogleMap>
          </div>
        </div>
      )}
    </div>
  );
};
export default Map;
