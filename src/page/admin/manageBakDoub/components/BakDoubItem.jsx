import { removeBakDoubAnswer } from "../../../../context/bakDoub/BakDoubAction";
import Button from "../../../../ui/shared/Button";

export default function BakDoubItem({ data , onRefresh }) {
  const { type, categoryName, examDate , id } = data;
  const removeBakDoub = async(id)=>{
    const res = await removeBakDoubAnswer(id)
    if(res === true){
      onRefresh()
      alert("remove successful")
    }
  }
  return (
    <li className="flex flex-col md:flex-row gap-5 border-2 justify-between items-center p-5">
      <div className="flex flex-col gap-2">
        <p className="text-gray-500">Type : {type}</p>
        <p className="text-gray-500">Category : {categoryName}</p>
        <p className="text-gray-500">ExamDate : {examDate}</p>
      </div>
      <div className="flex flex-row md:flex-col gap-2">
        <Button customClass="bg-red-500 text-white" onClick={()=> removeBakDoub(id)}>Remove</Button>
        <Button customClass="bg-green-500 text-white" >Edit</Button>
      </div>
    </li>
  );
}
