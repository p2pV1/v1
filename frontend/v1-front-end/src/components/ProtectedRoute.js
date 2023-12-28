// ProtectedRoute.js
import React from "react";
import { Outlet, Route, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading, error, logout } = useAuth();
  console.log("isAuthenticated", isAuthenticated);
  const navigate = useNavigate();

  return isAuthenticated ? <Outlet /> : navigate("/signin");
};

export default ProtectedRoute;
