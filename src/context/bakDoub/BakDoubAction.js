export const getBakDoubAnswer = async (categoryName, examDate , type) => {
  try {
    const data = await fetch(
      `http://127.0.0.1:8000/category${categoryName}/${examDate}/${type}`,
      {
        method: "GET",
      }
    );
    if (data.ok) {
      return await data.json();
    }
  } catch (error) {
    console.log(error);
  }
};
