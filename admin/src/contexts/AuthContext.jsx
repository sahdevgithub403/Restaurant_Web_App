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

      console.log(
        "DEBUG [Admin]: Raw login response:",
        JSON.stringify(data, null, 2),
      );

      // Handle both possible token field names
      const jwt = data.token || data.accessToken;

      if (!jwt) {
        console.error(
          "Admin login failed: No token in response. Keys:",
          Object.keys(data),
        );
        return { success: false, error: "No token received from server" };
      }

      // Handle role as string ("ADMIN") or array (["ROLE_ADMIN"])
      let userRole = data.role;
      if (!userRole && data.roles) {
        userRole = Array.isArray(data.roles)
          ? data.roles[0]?.replace("ROLE_", "")
          : data.roles;
      }

      console.log("DEBUG [Admin]: Resolved role:", userRole);

      // Validate admin role
      if (userRole !== "ADMIN") {
        return {
          success: false,
          error: "Access denied. Admin privileges required.",
        };
      }

      const userData = {
        id: data.id,
        username: data.username,
        email: data.email,
        fullName: data.fullName,
        role: userRole,
      };

      // Save to state and localStorage
      setUser(userData);
      localStorage.setItem("token", jwt);
      localStorage.setItem("user", JSON.stringify(userData));

      // Verify save
      const savedToken = localStorage.getItem("token");
      if (!savedToken) {
        console.error(
          "CRITICAL [Admin]: Token failed to save to localStorage!",
        );
        return { success: false, error: "Failed to save authentication data" };
      }

      console.log("DEBUG [Admin]: Login complete. Token saved successfully.");
      return { success: true };
    } catch (error) {
      console.error(
        "Admin login failed:",
        error.response?.data || error.message,
      );
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
