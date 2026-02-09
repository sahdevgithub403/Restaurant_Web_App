import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import {
  authAPI,
  setAuthErrorHandler,
  isTokenExpired,
  isAuthenticated as checkIsAuthenticated,
  clearAuthData,
} from "../services/api";

const AuthContext = createContext(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /**
   * Logout function - clears state and localStorage
   */
  const logout = useCallback(() => {
    setUser(null);
    clearAuthData();
  }, []);

  /**
   * Handle authentication errors from axios interceptors
   */
  const handleAuthError = useCallback(
    (message) => {
      console.warn("Admin auth error:", message);
      logout();
    },
    [logout],
  );

  /**
   * Check if user session is valid
   */
  const isSessionValid = useCallback(() => {
    return checkIsAuthenticated();
  }, []);

  /**
   * Validate session and return validity
   */
  const validateSession = useCallback(() => {
    if (!checkIsAuthenticated()) {
      logout();
      return false;
    }
    return true;
  }, [logout]);

  useEffect(() => {
    // Wire up the auth error handler for axios interceptors
    setAuthErrorHandler(handleAuthError);

    // Check localStorage for persisted session
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (storedUser && token) {
      // Validate token is not expired
      if (!isTokenExpired()) {
        const userData = JSON.parse(storedUser);
        // Verify it's an admin user
        if (userData.role === "ADMIN") {
          setUser(userData);
        } else {
          console.warn("Non-admin user detected. Clearing auth data.");
          clearAuthData();
        }
      } else {
        console.warn("Session expired on load. Clearing auth data.");
        clearAuthData();
      }
    }

    setLoading(false);

    return () => {
      setAuthErrorHandler(null);
    };
  }, [handleAuthError]);

  const login = async (username, password) => {
    try {
      const response = await authAPI.login({ username, password });
      const data = response.data;

      // Validate token exists
      if (!data.token) {
        throw new Error("No token received from server");
      }

      // Validate admin role
      if (data.role !== "ADMIN") {
        throw new Error("Access denied. Admin privileges required.");
      }

      const userData = {
        id: data.id,
        username: data.username,
        email: data.email,
        fullName: data.fullName,
        role: data.role,
      };

      setUser(userData);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(userData));

      return { success: true };
    } catch (error) {
      console.error("Admin login failed:", error);
      const message =
        error.response?.data?.message || error.message || "Login failed";
      return { success: false, error: message };
    }
  };

  const isAdmin = user?.role === "ADMIN";

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAdmin,
        loading,
        isSessionValid,
        validateSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
