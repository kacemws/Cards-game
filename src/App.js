import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAtom } from "jotai";
import { userAtom } from "./data";
import { verifyCookie } from "./services";
import {
  Layout,
  Home,
  Games,
  Users,
  NotFound,
  GameDetails,
  Round,
} from "./pages";
import { setAuthToken } from "./api";
import { Loader } from "./Components";
function App() {
  /*Token*/
  const [token, setToken] = useState(localStorage.getItem("accessToken") ?? ""); // the actual token;
  /*Token*/
  const [fetchingToken, setFetchingToken] = useState(true);

  const [user] = useAtom(userAtom);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    setRoles(user?.roles?.map(({ name }) => name) ?? []);
  }, [user]);

  useEffect(() => {
    let cookieToken = localStorage.getItem("accessToken");
    let refreshToken = localStorage.getItem("refreshToken");
    verifyCookie(cookieToken, refreshToken, setToken, setFetchingToken);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (![null, undefined, ""].includes(token)) {
    setAuthToken(token);
  }

  return (
    <>
      {fetchingToken ? (
        <Loader />
      ) : (
        <Router>
          <Layout>
            <Routes>
              {/* home page, landing for non auth users and normal user, games for admins */}
              <Route
                path="/"
                element={
                  ![null, undefined, "", "no token"].includes(token) &&
                  roles.includes("ADMIN") ? (
                    <Games />
                  ) : (
                    <Home />
                  )
                }
              />

              {/* profile for logged in people */}
              <Route
                path="/profile"
                element={
                  ![null, undefined, "", "no token"].includes(token) ? (
                    <Games />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />

              {/* manage users for the admins */}

              <Route
                path="/users/all"
                element={
                  ![null, undefined, "", "no token"].includes(token) &&
                  roles.includes("ADMIN") ? (
                    <Users />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />

              {/* games for people who are users */}

              <Route
                path="/games/all"
                element={
                  ![null, undefined, "", "no token"].includes(token) &&
                  roles.includes("USER") ? (
                    <Games />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />

              {/* game rules for people who are users */}

              <Route
                path="/games/all/:id"
                element={
                  ![null, undefined, "", "no token"].includes(token) &&
                  roles.includes("USER") ? (
                    <GameDetails />
                  ) : (
                    <Navigate to="/games/all" />
                  )
                }
              />

              {/* game room for people who are users */}

              <Route
                path="/games/all/:gameid/play/:id"
                element={
                  ![null, undefined, "", "no token"].includes(token) &&
                  roles.includes("USER") ? (
                    <Round />
                  ) : (
                    <Navigate to="/games/all" />
                  )
                }
              />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </Router>
      )}
    </>
  );
}

export default App;
