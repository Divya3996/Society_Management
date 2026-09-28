import api from "./api";

export const loginUser = async (email, password) => {
  const res = await api.post("/auth/login", { email, password });
  return res.data.data;
};

export const registerUser = async ({ name, email, password, phone, flatNumber }) => {
  const res = await api.post("/auth/register", { name, email, password, phone, flatNumber });
  return res.data.data;
};

export const getProfile = async () => {
  const res = await api.get("/auth/profile");
  return res.data.data;
};

export const updateProfile = async (data) => {
  const res = await api.put("/auth/profile", data);
  return res.data.data;
};

export const changePassword = async (currentPassword, newPassword) => {
  const res = await api.put("/auth/change-password", { currentPassword, newPassword });
  return res.data;
};

export const updateNotificationPreferences = async (preferences) => {
  const res = await api.put("/auth/notification-preferences", preferences);
  return res.data.data;
};
