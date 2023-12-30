import { useState, useEffect, createContext, useContext, useMemo } from "react";
import { useSelector } from "react-redux";
import { persistor } from "../store";

const AuthContext = createContext();

function AuthProvider({ children }) {
  // Retrieve the backendUrl from the Redux store
  const { backendUrl } = useSelector((state) => state.backendUrl);
  console.log("backendURl in auth" + backendUrl);

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
          throw new Error(
            `Authentication check failed with status ${res.status}`
          );
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
    alert("logout callled");
    setIsLoading(true); // Indicate the start of a logout process

    // Call the backend logout endpoint
    fetch(`${backendUrl}/api/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Include credentials for session-based authentication
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to log out");
        }
        return res.json(); // You might not need to process JSON if no response is expected
      })
      .then(() => {
        persistor.purge();
        localStorage.removeItem("persist:root");
        setIsAuthenticated(false);
        setError(null);
      })
      .catch((error) => {
        console.error("Logout failed:", error);
        setError(error.message || "Failed to log out properly.");
      })
      .finally(() => {
        setIsLoading(false); // Indicate that the logout process has completed
      });
  };

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      isAuthenticated,
      setIsAuthenticated,
      isLoading,
      error,
      logout,
    }),
    [isAuthenticated, isLoading, error]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
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
