import { BASE_URL } from "../../utils/constant/Constant";

export const getLevels = async () => {
  try {
    const res = await fetch(`${BASE_URL}level`, {
      method: "GET",
    });
    if (res.status === 200) {
      const data = await res.json();
      console.log(data)
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};
export const getQuiz = async () => {
  try {
    const res = await fetch(`${BASE_URL}quiz`, {
      method: "GET",
    });
    if (res.status === 200) {
      const data = await res.json();
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};
