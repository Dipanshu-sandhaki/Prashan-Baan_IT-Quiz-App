import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ role = null }) => {
  const { currentUser, userRole, loading, isAuthenticated } = useAuth();

  if (loading) {
    // Show loading spinner while checking auth state
    return <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>;
  }

  if (!isAuthenticated()) {
    // User not authenticated, redirect to login with return URL
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  if (role && userRole !== role) {
    // User doesn't have required role, redirect to login
    return <Navigate to="/login" replace state={{ 
      from: location.pathname,
      error: "You don't have permission to access this page"
    }} />;
  }

  return <Outlet />;
};

export default PrivateRoute;