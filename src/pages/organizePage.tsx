import App from "../components/dragndrop/DnD";
import { Data } from "../components/dragndrop/data";

export default function OrganizePage() {
  return (
    <div className="flex">
      <App />
      <Data />
    </div>
  );
}
