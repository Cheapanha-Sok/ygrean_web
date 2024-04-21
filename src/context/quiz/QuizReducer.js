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
          listQuiz: action.payload,
          loading: false,
        };
    }
  };