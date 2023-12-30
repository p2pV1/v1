import { useState, useEffect, createContext, useContext, useMemo } from "react";
import { useSelector } from "react-redux";
import { persistor } from "../store";

const AuthContext = createContext();

function AuthProvider({ children }) {
  // Retrieve the backendUrl from the Redux store
  const { backendUrl }  = useSelector((state) => state.backendUrl);
  console.log("backendURl in auth" + backendUrl)

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; // Flag to track mounted state
    setIsLoading(true);

    fetch(`${backendUrl}/api/is_authenticated`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => {
        if (!isMounted) return; // Prevent update if component was unmounted
        if (res.status === 401) {
          setIsAuthenticated(false);
          setError(null);
        } else if (!res.ok) {
          throw new Error(`Authentication check failed with status ${res.status}`);
        } else {
          return res.json();
        }
      })
      .then((data) => {
        if (!isMounted) return;
        if (data) {
          setIsAuthenticated(data.status);
        }
      })
      .catch((error) => {
        if (!isMounted) return;
        console.error("Error during authentication check:", error);
        setIsAuthenticated(false);
        setError(error.message || "An error occurred during authentication.");
      })
      .finally(() => {
        if (!isMounted) return;
        setIsLoading(false);
      });

    // Cleanup function to set isMounted to false when the component unmounts
    return () => {
      isMounted = false;
    };
  }, [backendUrl]); // Add backendUrl as a dependency

  const logout = () => {
    persistor.purge();
    localStorage.removeItem("persist:root");
    setIsAuthenticated(false);
    setError(null);
  };

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    isAuthenticated,
    setIsAuthenticated,
    isLoading,
    error,
    logout,
  }), [isAuthenticated, isLoading, error]);

  return (
    <AuthContext.Provider value={contextValue}>
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
