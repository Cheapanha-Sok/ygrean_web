import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./page/Homepage";
import AppLayout from "./components/user/AppLayout";
import Ranking from "./page/Ranking";
import Scholarship from "./page/Scholarship";
import Quiz from "./page/Quiz";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Homepage />} />
          <Route path="/ranking" element={<Ranking />} />
          <Route path="/scholarship" element={<Scholarship />} />
          <Route path="/quiz" element={<Quiz />} />
        </Route>
      </Routes>
    </Router>
  );
}
