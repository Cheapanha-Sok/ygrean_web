export const QuizReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        loading: true,
      };
    case "SET_QUIZ":
      return {
        ...state,
        listQuizs: action.payload,
        loading: false,
      };
    case "SET_LEVELS":
      return {
        ...state,
        listLevels: action.payload,
        loading: false,
      };
  }
};
