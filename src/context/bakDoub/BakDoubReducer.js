export const BakDoubReducer = (state, action) => {
    switch (action.type) {
      case "SET_LOADING":
        return {
          ...state,
          loading: true,
        };
      case "SET_BAKDOUB":
        return {
          ...state,
          listBakdoub: action.payload,
          loading: false,
        };
      case "SET_CATEGORIES":
        return{
          ...state,
          listCategories : action.payload,
          loading : false,
        }
    }
  };