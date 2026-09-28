import api from "./api";

export const getSocietySettings = async () => {
  const response = await api.get("/settings");
  return response.data.data;
};

export const updateSocietySettings = async (settings) => {
  const response = await api.put("/settings", settings);
  return response.data.data;
};
