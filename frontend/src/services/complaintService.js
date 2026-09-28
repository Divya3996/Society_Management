import api from "./api";

export const getComplaints = async () => {
  const res = await api.get("/complaints");
  return res.data.data;
};

export const getComplaintById = async (id) => {
  const res = await api.get(`/complaints/${id}`);
  return res.data.data;
};

export const createComplaint = async (data) => {
  const res = await api.post("/complaints", data);
  return res.data.data;
};

export const updateComplaint = async (id, data) => {
  const res = await api.put(`/complaints/${id}`, data);
  return res.data.data;
};

export const updateComplaintStatus = async (id, status, adminRemarks) => {
  const res = await api.patch(`/complaints/${id}/status`, { status, adminRemarks });
  return res.data.data;
};

export const deleteComplaint = async (id) => {
  const res = await api.delete(`/complaints/${id}`);
  return res.data;
};

