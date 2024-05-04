import { token } from "../token";

export const UseAuth = () => {
  if (token) {
    return true;
  } else {
    return false;
  }
};
