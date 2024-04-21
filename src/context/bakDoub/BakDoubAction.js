import { BASE_URL } from "../../utils/constant/Constant";

export const getBakDoubAnswer = async (categoriesId , examDateId) => {
  try {
    const res = await fetch(
      `${BASE_URL}pdf/${examDateId}/${categoriesId}`,
      {
        method: "GET",
      }
    );
    if (res.ok) {
      return res.json();
    }
  } catch (error) {
    console.log(error);
  }
};
export const removeBakDoubAnswer = async(id)=>{
  try{
    const res = await fetch(
      `${BASE_URL}bakDoub/${id}`,
      {
        method: "DELETE",
      }
    );
    if(res.ok){
      return true
    }
  }catch(error){
    console.log(error)
  }
}
export const getType = async(typeId)=>{
  try{
    const res = await fetch(`${BASE_URL}type/${typeId}`,{
      method : "GET"
    })
    if(res.status === 200){
      const data = await res.json()
      return data.categories
    }
  }catch(error){
    console.log(error)
  }
}

export const getExamDate = async()=>{
  try{
    const res = await fetch(`${BASE_URL}examDate`,{
      method : "GET"
    })
    if(res.status === 200){
      const data = await res.json()
      console.log(data)
      return data
    }
  }catch(error){
    console.log(error)
  }
}