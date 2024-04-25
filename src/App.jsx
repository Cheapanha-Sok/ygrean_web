import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./page/user/home/Homepage";
import UserAppLayout from "./ui/user/AppLayout";
import AdminAppLayout from "./ui/admin/Applayout";
import Ranking from "./page/user/ranking/Ranking";
import Scholarship from "./page/user/scholarship/Scholarship";
import Quiz from "./page/user/quiz/Quiz";
import Authentication from "./page/user/auth/Authentication";
import Account from "./page/user/account/Account";
import BakDoub from "./page/user/bakDoub/BakDoub";
import { UserDataProvider } from "./context/user/UserContext";
import { ScholarshipDataProvider } from "./context/scholarship/ScholarshipContext";
import { BakDoubDataProvider } from "./context/bakDoub/BakDoubContext";
import PrivateRoute from "./ui/shared/PrivateRoute";
import ViewPdf from "./page/user/bakDoub/ViewPdf";
import ManageQuiz from "./page/admin/manageQuiz/ManageQuiz";
import BakDoubList from "./page/admin/manageBakDoub/BakDoubList";

export default function App() {

  const storedUserJSON = localStorage.getItem("user");
  const storedUser = JSON.parse(storedUserJSON);

  console.log(storedUser.role);

  return (
    <Router>
      <UserDataProvider>
        <ScholarshipDataProvider>
          <BakDoubDataProvider>
            <Routes>
              {storedUser?.role === "admin" ? (
                <Route element={<AdminAppLayout />}>
                  <Route index element={<BakDoubList />} />
                  <Route path="/manageSubject" element={<ManageQuiz />} />
                </Route>
              ) : (
                <Route element={<UserAppLayout />}>
                  <Route index element={<Homepage />} />
                  <Route
                    path="/ranking"
                    element={
                      <PrivateRoute>
                        <Ranking />
                      </PrivateRoute>
                    }
                  />
                  <Route path="/scholarship" element={<Scholarship />} />
                  <Route path="/quiz" element={<Quiz />} />
                  <Route path="/account" element={<Account />} />
                  <Route path="/authentication" element={<Authentication />} />
                  <Route path="/bakDoubAnswer" element={<BakDoub />} />
                  <Route path="/answer/:categoryId/:examDateId" element={<ViewPdf/>}/>
                </Route>
              )}
            </Routes>
          </BakDoubDataProvider>
        </ScholarshipDataProvider>
      </UserDataProvider>
    </Router>
  );
}
