import api from "./api";

export const getAdminDashboard = async () => {
  const res = await api.get("/dashboard/admin");
  return res.data.data;
};

export const getResidentDashboard = async () => {
  const res = await api.get("/dashboard/resident");
  return res.data.data;
};
