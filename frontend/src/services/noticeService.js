import api from "./api";

export const getNotices = async () => {
  const res = await api.get("/notices");
  return res.data.data;
};

export const getNoticeById = async (id) => {
  const res = await api.get(`/notices/${id}`);
  return res.data.data;
};

export const createNotice = async (data) => {
  const res = await api.post("/notices", data);
  return res.data.data;
};

export const updateNotice = async (id, data) => {
  const res = await api.put(`/notices/${id}`, data);
  return res.data.data;
};

export const deleteNotice = async (id) => {
  const res = await api.delete(`/notices/${id}`);
  return res.data;
};
