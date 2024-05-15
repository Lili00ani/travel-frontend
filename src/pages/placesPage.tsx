import { UserRContext } from "../providers/userProvider";
import { useContext, useEffect } from "react";
import { PlacesAutoComplete } from "../components/maps/PlacesAutoComplete";
import { useLoadScript } from "@react-google-maps/api";
import { Spinner } from "flowbite-react";

export default function PlacesPage() {
  const value = useContext(UserRContext);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY!,
    libraries: ["places"],
  });
  const userId = value?.user;
  console.log(userId);

  return (
    <>
      {!isLoaded && <Spinner />}
      {isLoaded && (
        <div className="w-11/12">
          <PlacesAutoComplete />
        </div>
      )}
    </>
  );
}
