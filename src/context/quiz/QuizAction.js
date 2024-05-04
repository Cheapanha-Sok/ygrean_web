import axios from "axios";
import { BASE_URL } from "../../utils/constant/Constant";
import { token } from "../../utils/token";

export const getLevels = async () => {
  try {
    const res = await fetch(`${BASE_URL}level`, {
      method: "GET",
    });
    if (res.status === 200) {
      const data = await res.json();
      console.log(data);
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};
export const getQuestion = async () => {
  try {
    const res = await fetch(`${BASE_URL}question`, {
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
// export const getQuestionByTypeAndCategory = async (categroyId, levelId) => {
//   try {
//     const res = await fetch(`${BASE_URL}question/${categroyId}/${levelId}`, {
//       method: "GET",
//     });
//     if (res.status === 200) {
//       const data = await res.json();
//       return data;
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

export const getQuestionByTypeAndCategory = async (categoryId, levelId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}question/${categoryId}/${levelId}`,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    
    return response.data;
  } catch (error) {
    console.log(error);
    throw error; // rethrow the error to handle it elsewhere
  }
};
