import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Spinner from "../components/landing/ui/fullpagespinner";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate("/signin");
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) return <Spinner />;

  if (!isAuthenticated) return <Navigate to="/signin" replace />;

  return children;
};

export default ProtectedRoute;
