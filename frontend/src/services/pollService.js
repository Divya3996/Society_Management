import api from "./api";

export const getPolls = async () => {
  const res = await api.get("/polls");
  return res.data.data;
};

export const createPoll = async (data) => {
  const res = await api.post("/polls", data);
  return res.data.data;
};

export const votePoll = async (id, optionIndex) => {
  const res = await api.post(`/polls/${id}/vote`, { optionIndex });
  return res.data.data;
};

export const closePoll = async (id) => {
  const res = await api.patch(`/polls/${id}/close`);
  return res.data.data;
};

export const deletePoll = async (id) => {
  const res = await api.delete(`/polls/${id}`);
  return res.data;
};
