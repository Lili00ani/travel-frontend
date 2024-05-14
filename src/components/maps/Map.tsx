const loadGoogleMapsScript = (callback: () => void) => {
  if (
    typeof window.google === "object" &&
    typeof window.google.maps === "object"
  ) {
    callback();
    return;
  }

  const script = document.createElement("script");
  script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places&callback=${initAutocomplete}`;
  script.defer = true;
  document.head.appendChild(script);
};

function initAutocomplete() {
  console.log("Google Maps JavaScript API library loaded.");
}

import React, { useEffect } from "react";
import { PlacesAutocomplete } from "./PlacesAutoComplete";

const MapC = () => {
  useEffect(() => {
    loadGoogleMapsScript(initAutocomplete);
  }, []);

  return (
    <div>
      <h1>My App</h1>
      <PlacesAutocomplete />
    </div>
  );
};

export default MapC;
