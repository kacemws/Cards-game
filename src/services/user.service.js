import { getCsv, getUsers, postBan, postUser } from "../api";
import * as XLSX from "xlsx";

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
    console.log({ res });
    if (res?.status === 400) {
      console.log("yeah?");
      throw Error("Email already exists");
    } else if (res?.status === 201) {
      return await getAllUsers();
    }
  } catch (err) {
    throw Error("Email already exists");
  }
};

export const getAllUsers = async (page = 0, size = 10) => {
  try {
    const { data: resp } = await getUsers(page, size);
    console.log({ resp });
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
