import { useContext, useEffect, useState } from "react";
import BakDoubDataContext from "../../../context/subject/SubjectContext";
import { getCategory, getType } from "../../../context/subject/SubjectAction";
import SelectOption from "../../../ui/shared/SelectOption";
import { types } from "../../../data/dummyData";
import QuizItem from "./components/QuizItem";

export default function QuizList({ isGraduate }) {
  const [option, setOption] = useState(1);

  const handleSelectChange = (event) => {
    const selectedOption = parseInt(event.target.value);
    setOption(selectedOption);
  };

  const { listCategories, dispatch } = useContext(BakDoubDataContext);

  useEffect(() => {
    const fetchData = async (option) => {
      const data = isGraduate ? await getCategory() : await getType(option);
      dispatch({ type: "SET_CATEGORIES", payload: data });
    };
    fetchData(option);
  }, [option, dispatch, isGraduate]);

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-xl font-semibold">Quiz</h1>
      {isGraduate ? null : (
        <div>
          <SelectOption options={types} onSelectChange={handleSelectChange} />
        </div>
      )}

      <div className="gap-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 text-sm md:text-l">
        {listCategories.map((item) => (
          <QuizItem data={item} key={item.id} />
        ))}
      </div>
    </div>
  );
}
