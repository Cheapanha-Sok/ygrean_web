import { createContext, useReducer } from "react";
import { BakDoubReducer } from "./BakDoubReducer";


const BakDoubDataContext = createContext();
export const BakDoubDataProvider =({ children })=> {
  const initialState = {
    listBakDoubs: [],
    listCategories : [],
    listExamDates : [],
    listQuestons : [],
    loading: false,
  };
  const [state, dispatch] = useReducer(BakDoubReducer, initialState);

  return (
    <BakDoubDataContext.Provider value={{ ...state, dispatch }}>
      {children}
    </BakDoubDataContext.Provider>
  );
}
export default BakDoubDataContext

