import React, { createContext, useState } from "react";
import axios from "axios";

// TODO: update to be our user object
type User = any;

export type UserContextType = {
  user: User;
  signUp: (username: string, password: string) => Promise<User>;
  login: (username: string, password: string) => Promise<User>;
  logout: () => void;
};

export const UserContext = createContext<UserContextType>({
  user: null,
  signUp: null,
  login: null,
  logout: null,
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const signUp = async (username: string, password: string): Promise<User> => {
    try {
      const res = await axios.post("/api/users", {
        username,
        password,
      });

      setUser(res.data);
      return res.data;
    } catch (err) {
      console.log(err);
      // TODO: return error for handling
    }
  };

  // TODO: fill in
  const login = async (username: string, password: string) => {};

  // TODO: fill in 
  const logout = () => {};

  return (
    <UserContext.Provider
      value={{
        user,
        signUp,
        login,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
