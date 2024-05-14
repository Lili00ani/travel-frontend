//-----------Libraries-----------//
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
} from "@vis.gl/react-google-maps";

//-----------Components-----------//

export default function Map1() {
  const defaultCenter: { lat: number; lng: number } = {
    lat: parseFloat("1.2868585386199578"),
    lng: parseFloat("103.83589066897413"),
  };

  const position: { lat: number; lng: number } = {
    lat: parseFloat("1.2868585386199578"),
    lng: parseFloat("103.83589066897413"),
  };

  return (
    <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY!}>
      <Map
        mapId={"map"}
        style={{ width: "90vw", height: "30vh" }}
        defaultCenter={defaultCenter}
        defaultZoom={13}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
      >
        <AdvancedMarker
          position={position}
          title={"AdvancedMarker with customized pin."}
        >
          <Pin
            background={"#22ccff"}
            borderColor={"#1e89a1"}
            glyphColor={"#1e89a1"}
          ></Pin>
        </AdvancedMarker>
      </Map>
    </APIProvider>
  );
}
