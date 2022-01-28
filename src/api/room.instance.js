import axios from "./default.instance";

export const postRoom = async (data) => {
  try {
    return await axios.post(`/rooms/`, data);
  } catch (error) {
    throw new Error(error?.response?.data);
  }
};

export const getRoomById = async (id) => {
  try {
    return await axios.get(`/rooms/${id}/`);
  } catch (error) {
    throw new Error(error?.response?.status);
  }
};
