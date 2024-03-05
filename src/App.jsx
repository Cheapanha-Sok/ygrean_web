import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./page/Homepage";
import AppLayout from "./components/user/AppLayout";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Homepage />} />
        </Route>
      </Routes>
    </Router>
  );
}
