import { setAuthToken, postLogin, postUser, getUser } from "../api/";

export const signin = async (data) => {
  const mydata = {
    email: data.email,
    password: data.password,
  };

  try {
    const res = await postLogin(mydata);
    if (res && res !== "network error") {
      if (res.status === 200) {
        localStorage.setItem("refreshToken", res.data.refreshToken);
        const token = res.data.token;
        setAuthToken(token);
        localStorage.setItem("accessToken", token);
        return await fetchUser();
      } else if ([401, 404].includes(res.status)) {
        throw Error("email/mot de passe introuvable");
      }
    } else if (res === "network error") {
      throw Error("Pas de connexion a internet");
    } else {
    }
  } catch (err) {
    throw err;
  }
};

export const signup = async (data) => {
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
      const mydata = {
        email: res?.data?.email,
        password: data?.password,
      };
      return await signin(mydata);
    }
  } catch (err) {
    throw err;
  }
};

export const fetchUser = async () => {
  try {
    return await getUser();
  } catch (err) {
    throw err;
  }
};
