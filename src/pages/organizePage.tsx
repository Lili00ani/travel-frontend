import App from "../components/dragndrop/DnD";
import { Data } from "../components/dragndrop/data";
import DateTry from "../components/Date";

export default function OrganizePage() {
  return (
    <div className="flex">
      <App />
      {/* <Data /> */}
      <DateTry />
    </div>
  );
}
