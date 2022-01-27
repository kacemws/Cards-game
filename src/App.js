import {
  Layout,
  Home,
  Quizzes,
  NotFound,
  QuizDetails,
  Questions,
} from "./pages";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quizzes/all" element={<Quizzes />} />
          <Route path="/quizzes/all/:id" element={<QuizDetails />} />
          <Route path="/quizzes/all/:id/play" element={<Questions />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
