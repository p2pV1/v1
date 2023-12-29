// useAuth.js
import { useState, useEffect, createContext, useContext } from "react";
import { useSelector } from "react-redux";
import { persistor } from "../store";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const { backendUrl } = useSelector((state) => state.backendUrl);

  console.log("backendUrl from AuthProvider", backendUrl);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);

    fetch(`${backendUrl}/api/is_authenticated`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => {
        console.log("Response status:", res.status);
        if (!res.ok)
          throw new Error(
            `Authentication check failed with status ${res.status}`
          );
        return res.json();
      })
      .then((data) => {
        console.log("auth data", data);
        setIsAuthenticated(data.status);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error checking auth:", error);
        setIsAuthenticated(false);
        setError(error);
        setIsLoading(false);
      });
  }, [backendUrl]);

  const logout = () => {
    persistor.purge();
    localStorage.removeItem("persist:root");
    setIsAuthenticated(false);
  };

  //   return { isAuthenticated, isLoading, error, logout };
  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, error, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
export { AuthProvider, useAuth };
