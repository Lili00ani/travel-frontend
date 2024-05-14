import React, {
  useState,
  createContext,
  ReactNode,
  FunctionComponent,
} from "react";

interface UserAttributes {
  userId: string;
  email: string;
}

interface UserContext {
  user: UserAttributes;
  setUser: (state: UserAttributes) => void;
}

export const UserRContext = createContext<UserContext | null>(null);

export const UserProvider: FunctionComponent<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState({ userId: "", email: "" });

  return (
    <UserRContext.Provider value={{ user, setUser }}>
      {children}
    </UserRContext.Provider>
  );
};
