import { toast } from "react-toastify";
import apiClient from "../../utils/apiClient/apiClient";

export const signin = async (email, password) => {
  try {
    if (email.length > 0 && password.length > 0) {
      await apiClient.get(`sanctum/csrf-cookie`);
      const res = await apiClient.post(`login`, {
        email,
        password,
      });
      if (res.status === 204) {
        toast.success("welcome to our website");
        return true;
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const signup = async (
  username,
  email,
  currentPassword,
  confirmPassword
) => {
  try {
    await apiClient.get(`sanctum/csrf-cookie`);
    const response = await apiClient.post(`register`, {
      name: username,
      email,
      password: currentPassword,
      password_confirmation: confirmPassword,
    });

    if (response.status === 204) {
      toast.success("welcome to our website");
      return true;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getUser = async () => {
  try {
    const response = await apiClient.get(`api/currentUser`);
    const data = await response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const editUser = async (userId, username, isGraduate) => {
  try {
    const response = await apiClient.put(`api/user/${userId}`, {
      name: username,
      isGraduate: isGraduate,
    });
    if (response.status === 200) {
      toast.success("update succesful");
      return true;
    }
  } catch (error) {
    console.log(error);
  }
};
export const logOut = async () => {
  try {
    const res = await apiClient.post("logout");
    if (res.status === 204) {
      toast.success("logout successful");
      return true;
    }
  } catch (error) {
    console.log(error);
  }
};
export const savePointUser = async (point, category_id, level_id) => {
  try {
    const res = await apiClient.post("api/ranking", {
      point,
      category_id,
      level_id,
    });
    if (res.status === 200) {
      return true;
    }
  } catch (error) {
    console.log(error);
  }
};
