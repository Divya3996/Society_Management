import api from "./api";

export const getVisitors = async () => {
  const res = await api.get("/visitors");
  return res.data.data;
};

export const getVisitorById = async (id) => {
  const res = await api.get(`/visitors/${id}`);
  return res.data.data;
};

export const createVisitor = async (data) => {
  const res = await api.post("/visitors", data);
  return res.data.data;
};

export const updateVisitorStatus = async (id, status) => {
  const res = await api.patch(`/visitors/${id}/status`, { status });
  return res.data.data;
};

export const deleteVisitor = async (id) => {
  const res = await api.delete(`/visitors/${id}`);
  return res.data;
};
