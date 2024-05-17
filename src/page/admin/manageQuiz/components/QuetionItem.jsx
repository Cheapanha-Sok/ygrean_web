import { useState } from "react";
import Button from "../../../../ui/shared/Button";
import remove from "../../../../assets/svg/remove.svg";
import edit from "../../../../assets/svg/edit.svg";
import { removeQuestion } from "../../../../context/quiz/QuizAction";
import UpdateQuestion from "./UpdateQuestion";

export default function QuestionItem({ data }) {
  const { name, point, choices, id } = data;
  const [isUpdate, setUpdate] = useState(false);

  const handleRemove = async (id) => {
    await removeQuestion(id);
  };

  return (
    <div className="flex flex-row gap-5 p-5 bg-slate-500 text-white justify-between">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-2 font-semibold capitalize">
          <span>{id} . </span>
          <span>{name}</span>
        </div>
        <div className="font-medium capitalize">
          <p>Point : {point}</p>
        </div>
      </div>
      <div className="flex flex-row gap-5 items-center">
        <Button customClass="bg-green-500" onClick={() => setUpdate(true)}>
          <img src={edit} alt="editIcon" className="w-3 md:w-4" />
          Edit question
        </Button>
        <Button customClass="bg-red-500" onClick={() => handleRemove(id)}>
          <img src={remove} alt="removeIcon" className="w-3 md:w-4" />
          Delete question
        </Button>
        {isUpdate && (
          <UpdateQuestion
            question={data} // Corrected prop name
            onClose={() => setUpdate(false)}
          />
        )}
      </div>
    </div>
  );
}
