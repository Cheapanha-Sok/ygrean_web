import axios from "axios";
import apiClient from "../../utils/apiClient/apiClient";
import { BASE_URL } from "../../utils/constant/Constant";

export const getBakDoubAnswer = async (examDateId, categoriesId) => {
  try {
    const res = await fetch(`${BASE_URL}pdf/${examDateId}/${categoriesId}`, {
      method: "GET",
    });
    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};
export const createNewBakDoub = async (categoryId, examDateId, file) => {
  try {
    const formData = new FormData();
    formData.append("categoryId", parseInt(categoryId));
    formData.append("examDateId", parseInt(examDateId));
    formData.append("file", file);

    const res = await fetch(`${BASE_URL}pdf`, {
      method: "POST",
      body: formData,
    });

    if (res.status === 200) {
      const responseData = await res.json();
      console.log(responseData);
      return true;
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
export const getAllBakDoubAnswer = async () => {
  try {
    const res = await fetch(`${BASE_URL}pdf`, {
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

export const getAllBakDoubAnswerByType = async (typeId) => {
  try {
    const res = await fetch(`${BASE_URL}pdfType/${typeId}`, {
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

export const updateSubject = async (
  file,
  selectedCategory,
  selectedExamDate,
  id
) => {
  try {
    const formData = new FormData();
    formData.append("categoryId", parseInt(selectedCategory));
    formData.append("subjectId", parseInt(id));
    formData.append("examDateId", parseInt(selectedExamDate));
    formData.append("file", file);
    const res = await fetch(`${BASE_URL}pdf`, {
      method: "PUT",
      body: formData,
    });

    if (res === 200) {
      return true;
    }
  } catch (error) {
    console.log(error);
  }
};

export const removeBakDoubAnswer = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}pdf/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      return true;
    }
  } catch (error) {
    console.log(error);
  }
};
export const getType = async (typeId) => {
  try {
    const res = await apiClient.get(`api/type/${typeId}`);
    if (res.status === 200) {
      const data = await res.data
      return data.categories;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getExamDate = async () => {
  try {
    const res = await fetch(`${BASE_URL}examDate`, {
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

export const getCategory = async () => {
  try {
    const res = await apiClient("api/category");
    if (res.status === 200) {
      const data = await res.data;
      console.log(data);
      return data.data;
    }
  } catch (error) {
    console.log(error);
  }
};
