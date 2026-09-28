import api from "./api";

export const getParkingSlots = async () => {
  const res = await api.get("/parking");
  return res.data.data;
};

export const allocateParking = async (data) => {
  const res = await api.post("/parking", data);
  return res.data.data;
};

export const updateParking = async (id, data) => {
  const res = await api.put(`/parking/${id}`, data);
  return res.data.data;
};

export const deleteParking = async (id) => {
  const res = await api.delete(`/parking/${id}`);
  return res.data;
};
