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
      return true;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getUser = async () => {
  try {
    const response = await apiClient.get(`api/user`);
    const data = await response.data;
    return data[0];
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
      return true;
    }
  } catch (error) {
    console.log(error);
  }
};
