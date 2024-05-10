import axios from "axios";
import { BASE_URL } from "../../utils/constant/Constant";
import apiClient from "../../utils/apiClient/apiClient";

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
export const getQuestionByTypeAndCategory = async (categoryId, levelId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}question/${categoryId}/${levelId}`
    );

    return response.data;
  } catch (error) {
    console.log(error);
    throw error; // rethrow the error to handle it elsewhere
  }
};

export const createQuestion = async (
  questionName,
  categoryId,
  isGraduate,
  levelId,
  choices
) => {
  try {
    const res = await apiClient.post("api/question", {
      name: questionName,
      category_id: categoryId,
      isGraduate,
      level_id: levelId,
      choices: choices,
    });
    if (res.status === 200) {
      return true;
    }
  } catch (error) {
    console.log(error);
  }
};
export const removeQuestionById = async (questionId) => {
  try {
    const res = await apiClient.delete(`api/question/${questionId}`);
    if (res.status === 200) {
      return true;
    }
  } catch (error) {
    console.log(error);
  }
};
