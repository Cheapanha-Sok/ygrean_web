export const UserReducer = (state, action) => {
    switch (action.type) {
      case "SET_LOADING":
        return {
          ...state,
          loading: true,
        };
      case "SET_USER":
        return {
          ...state,
          user: action.payload,
          loading: false,
        };
    }
  };