import api from "./api";

export const getBills = async () => {
  const res = await api.get("/maintenance");
  return res.data.data;
};

export const getBillById = async (id) => {
  const res = await api.get(`/maintenance/${id}`);
  return res.data.data;
};

export const generateBill = async (data) => {
  const res = await api.post("/maintenance/generate", data);
  return res.data.data;
};

export const payBill = async (id, paymentMethod, transactionId) => {
  const res = await api.patch(`/maintenance/${id}/pay`, { paymentMethod, transactionId });
  return res.data.data;
};

export const deleteBill = async (id) => {
  const res = await api.delete(`/maintenance/${id}`);
  return res.data;
};
