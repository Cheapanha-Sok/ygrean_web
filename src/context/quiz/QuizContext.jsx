import { createContext, useReducer } from "react";
import { QuizReducer } from "./QuizReducer";

const QuizDataContext = createContext();
export const QuizDataProvider = ({ children }) => {
  const initialState = {
    listLevels: [],
    listQuestions :[],
    loading: false,
  };
  const [state, dispatch] = useReducer(QuizReducer, initialState);

  return (
    <QuizDataContext.Provider value={{ ...state, dispatch }}>
      {children}
    </QuizDataContext.Provider>
  );
};
export default QuizDataContext;
