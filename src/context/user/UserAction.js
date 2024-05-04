import axios from "axios";
import Cookies from "universal-cookie";
import { AUTH_URL, BASE_URL } from "../../utils/constant/Constant";
import { token } from "../../utils/token";

export const signin = async (email, password) => {
  try {
    if (email.length > 0 && password.length > 0) {
      await getToken();
      const response = await axios.post(`${AUTH_URL}login`, {
        username: email,
        password: password,
      });
      if (response.status === 200) {
        return true;
      }
      console.log(response.error);
    }
  } catch (error) {
    console.log(error);
  }
};

const getToken = async () => {
  await axios.get("/sanctum/csrf-cookie");
};

export const signup = async (
  username,
  email,
  currentPassword,
  confirmPassword
) => {
  try {
    await getToken();
    const response = await axios.post(`${AUTH_URL}register`, {
      username,
      email,
      password: currentPassword,
      password_confirmation: confirmPassword,
    });

    if (response.status === 200) {
      return true;
    }
  } catch (error) {
    console.log(error);
  }
};

export const logout = async () => {};

export const getUser = async () => {
  try {
    const response = await axios.get(`${BASE_URL}userLogged`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const editUser = async (userId, username, isGraduate) => {
  try {
    const response = await axios.put(`${BASE_URL}user/${userId}`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: {
        name: username,
        isGraduate: isGraduate,
      },
    });
    if (response.status === 200) {
      return true;
    }
  } catch (error) {
    console.log(error);
  }
};
