import { UserRContext } from "../providers/userProvider";
import { useContext } from "react";
import { PlacesAutoComplete } from "../components/maps/PlacesAutoComplete";
import { useLoadScript } from "@react-google-maps/api";
import { Spinner } from "flowbite-react";
import { PlacesList } from "../components/place/PlacesList";

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
        <div className="flex flex-col">
          <div className="w-10/12">
            <PlacesAutoComplete />
          </div>
          <div className="w-10/12 my-10">
            <PlacesList />
          </div>
        </div>
      )}
    </>
  );
}
