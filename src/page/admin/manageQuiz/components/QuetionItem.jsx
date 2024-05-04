import { useState } from "react";
import Choice from "./Choice";
import Button from "../../../../ui/shared/Button";

export default function QuestionItem({ data }) {
  const { level, name, category, point, choices, id } = data;
  const [isView, setIsView] = useState(false);

  return (
    <div className="flex flex-row gap-5 p-5 bg-slate-500 text-white justify-between">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-2 font-semibold capitalize">
          <span>{id} . </span>
          <span>{name}</span>
        </div>
        <div className="flex flex-row gap-5 font-medium capitalize">
          <p>Category : {category}</p>
          <p>Level : {level}</p>
          <p>Point : {point}</p>
        </div>
      </div>
      <Button customClass="bg-green-500" onClick={() => setIsView(true)}>
        View Choice
      </Button>
      {isView && <Choice data={choices} onClose={() => setIsView(false)} />}
    </div>
  );
}
