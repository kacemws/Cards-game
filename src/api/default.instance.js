import axios from "axios";

axios.defaults.baseURL = `${process.env.REACT_APP_API_URL}`;

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
  xsrfCookieName: "csrftoken",
  xsrfHeaderName: "X-CSRFToken",
  headers: {
    "Content-Type": "application/json",
  },
  params: {
    format: "json",
  },
});

instance.interceptors.response.use(
  (resp) => resp,
  (error) => {
    const originalRequest = error.config;
    let refreshToken = localStorage.getItem("refreshToken");

    if (
      [403, 401].includes(error.response?.status) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      return refreshExpiredToken(refreshToken).then((res) => {
        if (res.status === 200) {
          localStorage.setItem("accessToken", res.data.accessToken);
          localStorage.setItem("refreshToken", res.data.refreshToken);

          axios.defaults.headers.common["Authorization"] =
            "Bearer " + res.data.accessToken;

          return axios(originalRequest);
        }
      });
    }
    throw error;
  }
);

export const setAuthToken = (token) => {
  if (token) {
    //applying token
    instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    //deleting the token from header
    delete instance.defaults.headers.common["Authorization"];
  }
};

export const refreshExpiredToken = (refreshToken) => {
  return axios
    .post("/api/auth/refreshToken", {
      refreshToken,
    })
    .then((responses) => {
      return responses;
    })
    .catch((errors) => {
      return errors.response;
    });
};

export default instance;
