import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedToken = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");
        
        if (storedToken && storedUser) {
          const user = JSON.parse(storedUser);
          // You might want to verify the token with your backend here
          setCurrentUser(user);
          setUserRole(user.role);
          setToken(storedToken);
        }
      } catch (error) {
        console.error("Authentication initialization failed", error);
        logout();
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = (authData) => {
    const { token, user } = authData;
    
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    
    setCurrentUser(user);
    setUserRole(user.role);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setCurrentUser(null);
    setUserRole(null);
    setToken(null);
    navigate("/login", { state: { message: "You have been logged out" } });
  };

  const isAuthenticated = () => {
    return !!token;
  };

  return (
    <AuthContext.Provider 
      value={{ 
        currentUser, 
        userRole, 
        token,
        loading,
        login, 
        logout,
        isAuthenticated
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}