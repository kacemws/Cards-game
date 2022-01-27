import axios from "./default.instance";

export const putGame = async (id, data) => {
  try {
    return await axios.put(`/games/${id}/`, data);
  } catch (error) {
    throw new Error(error?.response?.data);
  }
};

export const getGames = async (page = 0, size = 10) => {
  try {
    return await axios.get(`/games/all/?pageNumber=${page}&pageSize=${size}`);
  } catch (error) {
    throw new Error(error?.response?.data);
  }
};

export const getGameById = async (id) => {
  try {
    return await axios.get(`/games/${id}/`);
  } catch (error) {
    throw new Error(error?.response?.status);
  }
};
