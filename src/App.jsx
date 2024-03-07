import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./page/user/Homepage";
import AppLayout from "./components/user/AppLayout";
import Ranking from "./page/user/Ranking";
import Scholarship from "./page/user/Scholarship";
import Quiz from "./page/user/Quiz";
import Authentication from "./page/user/Authentication";
import Account from "./page/user/Account";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Homepage />} />
          <Route path="/ranking" element={<Ranking />} />
          <Route path="/scholarship" element={<Scholarship />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/account" element={<Account />} />
          <Route path="/authentication" element={<Authentication />} />
        </Route>
      </Routes>
    </Router>
  );
}
