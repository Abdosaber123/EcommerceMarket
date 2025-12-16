import React, { createContext, useEffect, useState } from "react";
export const userRipo = createContext(null);
export default function UserProvider({ children }) {
  const [token, setToken] = useState("");
  const [emailUser, setEmail] = useState("");
  const [userAdmin, setUserAdmin] = useState("");
  const [userfullName, setUserFullName] = useState("");
  const [cartLength, setCartLength] = useState(0);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
    if (localStorage.getItem("userAdmin")) {
      setUserFullName(localStorage.getItem("userAdmin"));
    }
  }, []);
  return (
    <userRipo.Provider
      value={{
        token,
        setToken,
        emailUser,
        setEmail,
        userAdmin,
        setUserAdmin,
        userfullName,
        setUserFullName,
        cartLength,
        setCartLength
      }}
    >
      {children}
    </userRipo.Provider>
  );
}
