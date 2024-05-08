import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./page/user/home/Homepage";
import UserAppLayout from "./ui/user/AppLayout";
import AdminAppLayout from "./ui/admin/Applayout";
import Ranking from "./page/user/ranking/Ranking";
import Scholarship from "./page/user/scholarship/Scholarship";
import Authentication from "./page/user/auth/Authentication";
import Account from "./page/user/account/Account";
import { UserDataProvider } from "./context/user/UserContext";
import { ScholarshipDataProvider } from "./context/scholarship/ScholarshipContext";
import { BakDoubDataProvider } from "./context/bakDoub/BakDoubContext";
import ManageQuiz from "./page/admin/manageQuiz/ManageQuiz";
import BakDoubListAdmin from "./page/admin/manageBakDoub/BakDoubList";
import QuizList from "./page/user/quiz/QuizList";
import { QuizDataProvider } from "./context/quiz/QuizContext";
import BakDoubListUser from "./page/user/bakDoub/BakDoubList";
import DoQuiz from "./page/user/quiz/components/DoQuiz";
import PrivateRoutes from "./ui/shared/PrivateRoute";

export default function App() {
  const storedUserJSON = localStorage.getItem("user");
  const storedUser = JSON.parse(storedUserJSON);

  console.log(storedUser.role);

  return (
    <Router>
      <UserDataProvider>
        <ScholarshipDataProvider>
          <BakDoubDataProvider>
            <QuizDataProvider>
              <Routes>
                {storedUser?.role === "admin" ? (
                  <Route element={<AdminAppLayout />}>
                    <Route index element={<BakDoubListAdmin />} />
                    <Route path="/manageSubject" element={<ManageQuiz />} />
                    <Route path="/question" element={<ManageQuiz />} />
                  </Route>
                ) : (
                  <Route element={<UserAppLayout />}>
                    <Route index element={<Homepage />} />
                    <Route element={<PrivateRoutes />}>
                      <Route path="/ranking" element={<Ranking />} />
                      <Route path="/scholarship" element={<Scholarship />} />
                      <Route
                        path="/quiz/:categoryId/:levelId"
                        element={<DoQuiz />}
                      />
                                        
                    </Route>

                    <Route path="/question" element={<QuizList />} />

                    <Route path="/account" element={<Account />} />
                    
                    <Route
                      path="/authentication"
                      element={<Authentication />}
                    />
                    <Route
                      path="/bakDoubAnswer"
                      element={<BakDoubListUser />}
                    />
                  </Route>
                )}
              </Routes>
            </QuizDataProvider>
          </BakDoubDataProvider>
        </ScholarshipDataProvider>
      </UserDataProvider>
    </Router>
  );
}
