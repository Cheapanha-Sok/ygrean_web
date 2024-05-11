import { BASE_URL } from "../../utils/constant/Constant";
import apiClient from "../../utils/apiClient/apiClient";
import { toast } from "react-toastify";

export const getQuestionByTypeAndCategory = async (categoryId, levelId) => {
  try {
    const response = await apiClient.get(
      `${BASE_URL}question/${categoryId}/${levelId}`
    );
    if (response.status === 200) {
      return response.data.data;
    }
  } catch (error) {
    console.log(error);
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
    if (
      categoryId !== null ||
      isGraduate !== null ||
      levelId !== null ||
      questionName !== null ||
      choices !== null
    ) {
      const res = await apiClient.post("api/question", {
        name: questionName,
        category_id: categoryId,
        isGraduate,
        level_id: levelId,
        choices: choices,
      });
      if (res.status === 200) {
        toast.success("create question success");
        return true;
      }
    } else {
      toast.error("Some field are null please check");
    }
  } catch (error) {
    console.log(error);
  }
};
export const removeQuestionById = async (questionId) => {
  try {
    const res = await apiClient.delete(`api/question/${questionId}`);
    if (res.status === 200) {
      toast.success("remove question success");
      return true;
    }
  } catch (error) {
    console.log(error);
  }
};
