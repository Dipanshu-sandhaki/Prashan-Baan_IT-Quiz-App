import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const ProtectedRoute = ({ children, allowGuest = false }) => {
  const { isLoggedIn, isGuest } = useUser();

  // Logged in users allowed
  if (isLoggedIn) return children;

  // Guest allowed only if route has allowGuest = true
  if (isGuest && allowGuest) return children;

  return <Navigate to="/login" replace />;
};

export default ProtectedRoute;
