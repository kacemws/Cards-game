import { setAuthToken, postLogin } from "../api/";

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
        return token;
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
