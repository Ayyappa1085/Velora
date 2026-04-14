import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("velora-login");
    if (saved === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const login = () => {
    localStorage.setItem("velora-login", "true");
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("velora-login");
    setIsLoggedIn(false);
  };

  const user = {
    name: "Rahul Kumar",
    email: "rahul12@gmail.com",
    phone: "+91 9876543210",
    joined: "12 Jan 2026",
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, login, logout, user }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}