import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import Login from "../pages/Login";

const LoginWrapper = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/dashboard" /> : <Login />;
};

export default LoginWrapper;
