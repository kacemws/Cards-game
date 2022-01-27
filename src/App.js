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
import { Layout, Home, Quizzes, NotFound } from "./pages";
function App() {
  /*Token*/
  const [token, setToken] = useState(localStorage.getItem("accessToken") ?? ""); // the actual token;
  /*Token*/
  const [, setFetchingToken] = useState(true);

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

  return (
    <Router>
      <Layout>
        <Routes>
          {/* home page, landing for non auth users and normal user, games for admins */}
          <Route
            path="/"
            element={
              ![null, undefined, "", "no token"].includes(token) &&
              roles.includes("ADMIN") ? (
                <Quizzes />
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
                <Quizzes />
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
                <Quizzes />
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
                <Quizzes />
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
                <Quizzes />
              ) : (
                <Navigate to="/games/all" />
              )
            }
          />

          {/* game room for people who are users */}

          <Route
            path="/games/all/:id/play/:id"
            element={
              ![null, undefined, "", "no token"].includes(token) &&
              roles.includes("USER") ? (
                <Quizzes />
              ) : (
                <Navigate to="/games/all" />
              )
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
