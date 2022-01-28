import { getCsv, getUser, getUsers, postBan, postUser, putUser } from "../api";
import * as XLSX from "xlsx";

export const getUserInformations = async () => {
  try {
    return await getUser();
  } catch (error) {
    throw new Error(error?.message);
  }
};

export const createUser = async (data) => {
  const mydata = {
    email: data.email,
    password: data.password,
    first_name: data.first_name,
    gender: {
      name: data.gender.name,
    },
    last_name: data?.last_name,
    role: data?.role,
  };

  try {
    const res = await postUser(mydata);
    if (res?.status === 400) {
      throw Error("Email already exists");
    } else if (res?.status === 201) {
      return await getAllUsers();
    }
  } catch (err) {
    throw Error("Email already exists");
  }
};

export const updateUser = async (data) => {
  const mydata = {
    email: data.email,
    first_name: data.first_name,
    gender: {
      name: data.gender.name,
    },
    last_name: data?.last_name,
    role: data?.roles?.map((role) => role.name),
  };

  try {
    const res = await putUser(mydata);
    if (res?.status === 400) {
      throw Error("Email already exists");
    } else if (res?.status === 200) {
      return res?.data;
    }
  } catch (err) {
    throw Error("Email already exists");
  }
};

export const getAllUsers = async (page = 0, size = 10) => {
  try {
    const { data: resp } = await getUsers(page, size);
    return (
      resp || {
        users: [],
        count: 0,
      }
    );
  } catch (error) {
    throw new Error(error?.message);
  }
};

export const exportCsv = async () => {
  try {
    const { data } = await getCsv();
    const wb = XLSX.read(
      "index,First name,Last name,Email,Gender,Banned\n" + data,
      { type: "binary" }
    );
    XLSX.writeFile(wb, `users.csv`);
    return;
  } catch (error) {
    throw new Error(error?.message);
  }
};

export const manageBan = async (id) => {
  try {
    return await postBan(id);
  } catch (error) {
    throw new Error(error?.message);
  }
};
