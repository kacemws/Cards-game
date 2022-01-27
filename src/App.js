import { useEffect, useState } from "react";
import {
  Layout,
  Home,
  Quizzes,
  NotFound,
  QuizDetails,
  Questions,
} from "./pages";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { verifyCookie } from "./services";
function App() {
  /*Token*/
  const [token, setToken] = useState(localStorage.getItem("accessToken") ?? ""); // the actual token;
  /*Token*/
  const [, setFetchingToken] = useState(true);

  useEffect(() => {
    let cookieToken = localStorage.getItem("accessToken");
    let refreshToken = localStorage.getItem("refreshToken");
    verifyCookie(cookieToken, refreshToken, setToken, setFetchingToken);
  }, []);

  const protectedRoutes = (
    <>
      <Route path="/games/all" element={<Quizzes />} />
      <Route path="/games/all/:id" element={<QuizDetails />} />
      <Route path="/games/all/:id/play" element={<Questions />} />
    </>
  );

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          {![null, undefined, "", "no token"].includes(token) &&
            protectedRoutes}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
