import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./page/user/home/Homepage";
import AppLayout from "./ui/user/AppLayout";
import Ranking from "./page/user/ranking/Ranking";
import Scholarship from "./page/user/scholarship/Scholarship";
import Quiz from "./page/user/quiz/Quiz";
import Authentication from "./page/user/auth/Authentication";
import Account from "./page/user/account/Account";
import BakDoub from "./page/user/bakDoub/BakDoub";

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
          <Route path="/bakDoubAnswer" element={<BakDoub />} />
        </Route>
      </Routes>
    </Router>
  );
}