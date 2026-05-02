import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔥 DERIVED STATE (no manual toggle mistakes)
  const isLoggedIn = !!user;

  // 🔥 FETCH USER (single source of truth)
  const fetchUser = async () => {
    const token = localStorage.getItem("token");

    // ❌ NO TOKEN → RESET
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        // ❌ INVALID TOKEN
        localStorage.clear();
        setUser(null);
        return;
      }

      const data = await res.json();
      setUser(data);
    } catch (err) {
      // ❌ NETWORK / ERROR
      localStorage.clear();
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // ✅ LOGIN (TOKEN-ONLY SYSTEM)
  const login = async (token) => {
    if (!token) {
      console.error("No token provided");
      return;
    }

    // 🔥 STORE TOKEN ONLY
    localStorage.setItem("token", token);

    // 🔥 ALWAYS SYNC USER FROM BACKEND
    await fetchUser();
  };

  // ✅ LOGOUT (FULL CLEAN RESET)
  const logout = () => {
    // 🔥 REMOVE EVERYTHING (prevents ghost login)
    localStorage.clear();

    setUser(null);

    // 🔥 HARD RESET (avoids stale React state)
    window.location.replace("/");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        loading,
        login,
        logout,
        refreshUser: fetchUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}