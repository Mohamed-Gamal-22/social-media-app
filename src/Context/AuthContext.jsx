import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  // lazy initialization
  // const [UserToken, setUserToken] = useState(function () {
  //   return localStorage.getItem("userToken");
  // });
  const [UserToken, setUserToken] = useState(localStorage.getItem("userToken"));


  return (
    <AuthContext.Provider value={{ UserToken, setUserToken }}>
      {children}
    </AuthContext.Provider>
  );
}
