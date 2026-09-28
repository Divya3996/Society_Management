import api from "./api";

export const getAllStaff = async () => {
  const res = await api.get("/staff");
  return res.data.data;
};

export const createStaff = async (data) => {
  const res = await api.post("/staff", data);
  return res.data.data;
};

export const updateStaff = async (id, data) => {
  const res = await api.put(`/staff/${id}`, data);
  return res.data.data;
};

export const deleteStaff = async (id) => {
  const res = await api.delete(`/staff/${id}`);
  return res.data;
};
