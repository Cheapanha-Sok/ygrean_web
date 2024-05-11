import apiClient from "../../utils/apiClient/apiClient";

export const getRank = async (isGraduate) => {
  try {
    const res = await apiClient.get(`api/rank/${isGraduate}`);
    if (res.status === 200) {
      const data = await res.data.data;
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};
