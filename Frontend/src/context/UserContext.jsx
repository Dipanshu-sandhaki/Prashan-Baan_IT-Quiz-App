import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [isGuest, setIsGuest] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const guest = localStorage.getItem("guest") === "true";
    const token = localStorage.getItem("authToken");

    if (guest) setIsGuest(true);
    if (token) setIsLoggedIn(true);
  }, []);

  const loginUser = (token) => {
    localStorage.setItem("authToken", token);
    setIsLoggedIn(true);
  };

  const enableGuestMode = () => {
    localStorage.setItem("guest", "true");
    setIsGuest(true);
  };

  const logoutUser = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setIsGuest(false);
  };

  return (
    <UserContext.Provider
      value={{ isGuest, isLoggedIn, loginUser, enableGuestMode, logoutUser }}
    >
      {children}
    </UserContext.Provider>
  );
};
