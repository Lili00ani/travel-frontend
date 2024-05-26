import { Spinner } from "flowbite-react";
import RouterProvider from "./providers/routerProvider";
import { UserProvider } from "./providers/userProvider";
import { useLoadScript } from "@react-google-maps/api";

function App() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY!,
    libraries: ["places"],
  });

  return (
    <>
      {!isLoaded && <Spinner />}
      {isLoaded && (
        <UserProvider>
          <RouterProvider />
        </UserProvider>
      )}
    </>
  );
}

export default App;
