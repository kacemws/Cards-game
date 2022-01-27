import { setAuthToken, refreshExpiredToken } from "../api/";

let localSetToken;

export const verifyCookie = (
  cookieToken,
  refreshToken,
  setToken,
  setFetchingToken
) => {
  window.clearInterval(checkCookie);

  localSetToken = setToken;

  if (
    cookieToken === undefined &&
    refreshToken !== undefined &&
    (refreshToken?.length ?? []) > 0
  ) {
    refreshExpiredToken({ refreshToken })
      .then((res) => {
        if (res?.status === 400) throw Error("no token");

        localStorage.setItem("accessToken", res.data.token);
        localStorage.setItem("refreshToken", res.data.refreshToken);

        setAuthToken(res.data.token);
        setToken(res.data.token);
        setFetchingToken(false);
        window.setInterval(checkCookie, 100); // setting an interval each 100ms (0.1 seconds) to execute the check cookie function ( check line 58)
        return;
      })
      .catch((err) => {
        console.error({ err });
        setToken("");
        setFetchingToken(false);
      });
  } else if (cookieToken === undefined && refreshToken === undefined) {
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("accessToken");
    // dispatch(deleteUser());
    setFetchingToken(false);
    window.setInterval(checkCookie, 100); // setting an interval each 100ms (0.1 seconds) to execute the check cookie function ( check line 58)
    return;
  } else {
    setFetchingToken(false);
    window.setInterval(checkCookie, 100); // setting an interval each 100ms (0.1 seconds) to execute the check cookie function ( check line 58)
  }
};

export const checkCookie = (function () {
  // function to check wheter cookie changed or not
  try {
    var lastCookie = document.cookie; // 'static' memory between function calls (old cookie)

    return function () {
      var currentCookie = document.cookie; // current cookie;
      if (currentCookie !== lastCookie) {
        // if cookie changed
        lastCookie = currentCookie;
        let token =
          localStorage.getItem("accessToken") !== undefined
            ? localStorage.getItem("accessToken")
            : "no token";
        localSetToken(token); //set token stored inside the new cookie
      }
    };
  } catch (err) {
    console.errors(err);
  }
})();
