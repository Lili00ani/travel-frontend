import { TravelForm } from "../components/TravelForm";
import { UserRContext } from "../providers/userProvider";
import { useContext } from "react";

export default function TravelPage() {
  const value2 = useContext(UserRContext);

  console.log(value2, "travelpage");
  return (
    <div className="flex justify-center">
      <TravelForm />
    </div>
  );
}
