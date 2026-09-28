import api from "./api";

export const getAllResidents = async () => {
  const res = await api.get("/users");
  return res.data.data;
};

export const getUserById = async (id) => {
  const res = await api.get(`/users/${id}`);
  return res.data.data;
};

export const createResident = async (data) => {
  const res = await api.post("/users", data);
  return res.data.data;
};

export const updateUser = async (id, data) => {
  const res = await api.put(`/users/${id}`, data);
  return res.data.data;
};

export const toggleUserStatus = async (id) => {
  const res = await api.patch(`/users/${id}/status`);
  return res.data.data;
};

export const deleteUser = async (id) => {
  const res = await api.delete(`/users/${id}`);
  return res.data;
};
