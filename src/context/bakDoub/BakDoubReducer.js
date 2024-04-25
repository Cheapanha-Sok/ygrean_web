export const BakDoubReducer = (state, action) => {
    switch (action.type) {
      case "SET_LOADING":
        return {
          ...state,
          loading: true,
        };
      case "SET_BAKDOUBS":
        return {
          ...state,
          listBakDoubs: action.payload,
          loading: false,
        };
      case "SET_CATEGORIES":
        return{
          ...state,
          listCategories : action.payload,
          loading : false,
        }
      case "SET_EXAMDATES":
        return {
          ...state,
          listExamDates : action.payload,
          loading : false
        }
    }
  };