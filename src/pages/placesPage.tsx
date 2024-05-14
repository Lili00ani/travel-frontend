import { UserRContext } from "../providers/userProvider";
import { useContext, useEffect } from "react";

export default function PlacesPage() {
  const value = useContext(UserRContext);
  const userId = value?.user;
  console.log(userId);

  return (
    <div className="flex">
      <h1>placesPage</h1>
    </div>
  );
}
