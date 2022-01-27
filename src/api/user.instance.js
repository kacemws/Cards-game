import axios from "./default.instance";

export const getUser = async () => {
  try {
    return await axios.get("/users/");
  } catch (error) {
    throw new Error(error?.response?.data);
  }
};

export const getUsers = async (page = 0, size = 10) => {
  try {
    return await axios.get(`/users/all/?page=${page}&size=${size}`);
  } catch (error) {
    throw new Error(error?.response?.data);
  }
};

export const getCsv = async () => {
  try {
    return await axios.get(`/users/export-to-csv/`);
  } catch (error) {
    throw new Error(error?.response?.data);
  }
};

export const postBan = async (id) => {
  try {
    return await axios.put(`/users/${id}/ban/`);
  } catch (error) {
    throw new Error(error?.response?.data);
  }
};
