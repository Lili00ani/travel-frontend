// import React, { useState, createContext } from "react";
// import { Auth0Provider } from "@auth0/auth0-react";

// interface GlobalContextAttributes {
//   user: string;
//   setUser: React.Dispatch<React.SetStateAction<string>>;
// }

// export const GlobalContext = createContext<GlobalContextAttributes | undefined>(
//   undefined
// );

// export default function GlobalProvider({
//   children,
// }: React.PropsWithChildren<{}>) {
//   const [user, setUser] = useState("");

//   const value: GlobalContextAttributes = {
//     user,
//     setUser,
//   };

//   return (
//     <GlobalContext.Provider value={value}>
//       <Auth0Provider
//         domain={process.env.REACT_APP_AUTH0_DOMAIN}
//         clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
//         authorizationParams={{
//           redirect_uri: window.location.origin,
//         }}
//         useRefreshTokens
//         cacheLocation="localstorage"
//       >
//         {children}
//       </Auth0Provider>
//     </GlobalContext.Provider>
//   );
// }

export default function LOL() {
  return (
    <div className="flex">
      <h1>travelPage</h1>
    </div>
  );
}
