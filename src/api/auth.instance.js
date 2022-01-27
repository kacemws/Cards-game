import axios from "./default.instance";

export const postUser = async (data) => {
  try {
    return await axios.post("/auth/signup", data);
  } catch (error) {
    throw new Error(error?.response?.data);
  }
};

export const postLogin = async (data) => {
  try {
    return await axios.post("/auth/signin", data);
  } catch (error) {
    return error.response;
  }
};
