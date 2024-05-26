import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import NavigationBar from "../components/NavBar";
import { LoginButton } from "../components/button/Login";
import { SignupButton } from "../components/button/Signup";

export default function IntroPage() {
  const { isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated]);

  return (
    <div>
      <NavigationBar />
      <div className="flex flex-col items-center text-center">
        <h1 className="font-sans text-5xl font-bold mt-12 mb-5">
          Search, Save, and Organize
        </h1>
        <p className="font-sans text-3xl">
          Effortlessly transform your travel plans from scattered places to
          organized itineraries.
        </p>
        <div className="p-5">
          <SignupButton />
        </div>
      </div>

      <div className="flex  flex-row justify-center">
        <img className="w-58 shadow-md shadow-gray-400" src="organize.png" />
        {/* <img src="walking.gif" className="mt-4" alt="Walking" /> */}
      </div>
      <div className="flex justify-center mt-5">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <p className="font-sans text-5xl font-bold mt-5 mb-5">Features</p>
          <div className="space-y-8">
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Trip Creation
              </h2>
              <p className="text-gray-700">
                Create new travel plans by specifying your destination and
                dates.
              </p>
            </div>

            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Location Search & Add
              </h2>
              <p className="text-gray-700">
                Easily search for places through the app's search bar and add
                them to your trip's central list.
              </p>
            </div>

            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Daily Itinerary Builder
              </h2>
              <p className="text-gray-700">
                Drag and drop saved locations to organize a daily schedule for
                each day of your trip, visualizing your planned activities
                effortlessly.
              </p>
            </div>

            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Place Details
              </h2>
              <p className="text-gray-700">
                Access comprehensive information about places, including photos,
                rating and reviews to make informed decisions during your trip
                planning.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
