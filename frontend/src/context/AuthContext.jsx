import { createContext, useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import { loginUser, registerUser } from "../services/authService";
import { publishNotification } from "../services/notificationStore";

export const AuthContext = createContext(null);

const TOKEN_KEY = "dsm_token";
const USER_KEY = "dsm_user";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem(USER_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY) || null);
  const [loading, setLoading] = useState(false);
  const [autoLogoutEnabled, setAutoLogoutEnabled] = useState(
    () => localStorage.getItem("dsm_auto_logout") !== "false"
  );

  // Persist token and user whenever they change
  useEffect(() => {
    if (token && user) {
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    }
  }, [token, user]);

  useEffect(() => {
    const syncAutoLogoutPreference = () => {
      setAutoLogoutEnabled(localStorage.getItem("dsm_auto_logout") !== "false");
    };
    window.addEventListener("storage", syncAutoLogoutPreference);
    window.addEventListener("dsm-security-settings-changed", syncAutoLogoutPreference);
    return () => {
      window.removeEventListener("storage", syncAutoLogoutPreference);
      window.removeEventListener("dsm-security-settings-changed", syncAutoLogoutPreference);
    };
  }, []);

  useEffect(() => {
    if (!token || !user || !autoLogoutEnabled) return undefined;

    let timeoutId;
    const resetTimer = () => {
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        setToken(null);
        setUser(null);
        toast.info("You were signed out after 30 minutes of inactivity.");
      }, 30 * 60 * 1000);
    };
    const activityEvents = ["pointerdown", "keydown", "touchstart", "scroll"];
    activityEvents.forEach((event) => window.addEventListener(event, resetTimer, { passive: true }));
    resetTimer();

    return () => {
      window.clearTimeout(timeoutId);
      activityEvents.forEach((event) => window.removeEventListener(event, resetTimer));
    };
  }, [token, user, autoLogoutEnabled]);

  const login = useCallback(async (email, password) => {
    setLoading(true);
    try {
      const data = await loginUser(email, password);
      setToken(data.token);
      setUser(data.user);
      publishNotification({
        title: "Signed in successfully",
        message: `Welcome back, ${data.user.name}.`,
        path: data.user.role === "admin" ? "/admin/dashboard" : "/resident/dashboard",
        type: "success",
      });
      toast.success(`Welcome back, ${data.user.name}! 👋`);
      return data.user;
    } catch (error) {
      const message = error.response?.data?.message || "Login failed. Please try again.";
      toast.error(message);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (formData) => {
    setLoading(true);
    try {
      const data = await registerUser(formData);
      setToken(data.token);
      setUser(data.user);
      publishNotification({
        title: "Account created",
        message: "Your society account is ready to use.",
        path: "/resident/dashboard",
        type: "success",
      });
      toast.success("Account created! Welcome to Digital Society 🏡");
      return data.user;
    } catch (error) {
      const message = error.response?.data?.message || "Registration failed. Please try again.";
      toast.error(message);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    toast.info("You have been logged out.");
  }, []);

  const isAuthenticated = Boolean(token && user);
  const isAdmin = user?.role === "admin";
  const isResident = user?.role === "resident";

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        logout,
        updateCurrentUser: setUser,
        isAuthenticated,
        isAdmin,
        isResident,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
