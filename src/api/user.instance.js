import axios from "./default.instance";

export const getUser = async () => {
  try {
    return await axios.get("/users/");
  } catch (error) {
    throw new Error(error?.response?.data);
  }
};
