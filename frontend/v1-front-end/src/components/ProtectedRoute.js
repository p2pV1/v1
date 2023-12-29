import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Spinner from "../components/landing/ui/fullpagespinner";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    // If it's not loading and the user is not authenticated, redirect to /signin.
    if (!isLoading && !isAuthenticated) {
      navigate("/signin");
    }
    // Removed 'navigate' from the dependency array to avoid unnecessary re-renders
    // as 'navigate' function identity is stable and shouldn't cause effect to re-run.
  }, [isAuthenticated, isLoading]);

  // Show a loading spinner while checking the user's authentication status.
  if (isLoading) return <Spinner />;

  // If not loading but user is still not authenticated, redirect to /signin.
  // Using <Navigate> for an immediate declarative redirect.
  if (!isAuthenticated) return <Navigate to="/signin" replace />;

  // If the user is authenticated, render the children components which are the protected routes.
  return children;
};

export default ProtectedRoute;
