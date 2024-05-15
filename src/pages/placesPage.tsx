import { UserRContext } from "../providers/userProvider";
import { useContext, useEffect } from "react";
import Map from "../components/maps/Map";

export default function PlacesPage() {
  const value = useContext(UserRContext);
  const userId = value?.user;
  console.log(userId);

  return (
    <div className="w-10/12">
      <Map />
    </div>
  );
}
