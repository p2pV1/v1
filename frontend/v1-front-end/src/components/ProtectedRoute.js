import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  console.log("isAuthenticated", isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signin");
    }
  }, [isAuthenticated, navigate]);

  // if (isLoading) return <div>Loading...</div>;

  if (isAuthenticated) return children;
};

export default ProtectedRoute;
