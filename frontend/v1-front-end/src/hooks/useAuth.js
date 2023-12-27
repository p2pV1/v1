// useAuth.js
import { useState, useEffect, createContext, useContext } from "react";
import { useSelector } from "react-redux";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const { backendUrl } = useSelector((state) => state.backendUrl);
  console.log("backendUrl", backendUrl);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetch(`${backendUrl}/api/is_authenticated`)
      .then((res) => {
        if (!res.ok) throw new Error("Authentication check failed");
        console.log("res data: ", res.json());
        return res.json();
      })
      .then((data) => {
        setIsAuthenticated(data.isAuthenticated);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error checking auth:", error);
        setError(error);
        setIsLoading(false);
      });
  }, []);

  const logout = () => {
    // Implement logout logic with your backend
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
