import { useEffect, useState } from "react";
import Modal from "../../ui/shared/Modal";
import { getExamDate } from "../../context/bakDoub/BakDoubAction";
import { useNavigate } from "react-router-dom";

export default function Item({ data }) {
  const navigate = useNavigate()
  const [isOpen, setOpen] = useState(false);
  const [categoryId , setCategoryId] = useState(0)
  const [examDate, setExamDate] = useState([]);

  const handleSelectChange = (id) => {
    setOpen(!isOpen);
    setCategoryId(id)
  };
  const handleSelectExamDate = (id)=>{
    navigate(`/answer/${categoryId}/${id}`)
  }
  
  useEffect(() => {
    const fetchExamDate = async () => {
      if (isOpen) {
        const data = await getExamDate();
        setExamDate(data);
      }
    };
    fetchExamDate();
  }, [isOpen]);

  return (
    <>
      <div
        onClick={() => handleSelectChange(data.id)} // Pass data.id to the function
        className="p-5 space-y-5 w-full bg-white shadow-md border-gray-200 md:duration-500 md:hover:scale-105 md:hover:shadow-xl"
      >
        <h1 className="text-center text-xl">{data.name}</h1>
      </div>
      {isOpen && (
        <Modal title="Select a year" onClose={() => setOpen(!isOpen)}>
          <ul className="grid grid-cols-3 md:grid-cols-5 gap-5 p-5">
            {examDate.map((item) => (
              <li key={item.id} className="p-5 text-white border border-white-2 rounded-md">
                <p onClick={()=> handleSelectExamDate(item.id)} >{item.name}</p>
              </li>
            ))}
          </ul>
        </Modal>
      )}
    </>
  );
}
