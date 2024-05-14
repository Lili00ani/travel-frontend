import RouterProvider from "./providers/routerProvider";
import { UserProvider } from "./providers/userProvider";

function App() {
  return (
    <UserProvider>
      <RouterProvider />
    </UserProvider>
  );
}

export default App;
