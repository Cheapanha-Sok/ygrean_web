import { useContext, useEffect, useState } from "react";
import SelectOption from "../../../ui/shared/SelectOption";
import { getType } from "../../../context/subject/SubjectAction";
import { types } from "../../../data/dummyData";
import BakDoubItem from "./components/BakDoubItem";
import SubjectContext from "../../../context/subject/SubjectContext";

export default function BakDoubList() {
  const [option, setOption] = useState(1);

  const handleSelectChange = (event) => {
    const selectedOption = parseInt(event.target.value);
    setOption(selectedOption);
  };

  const { listCategory, dispatch } = useContext(SubjectContext);

  console.log(listCategory)

  console.log(option)
  useEffect(() => {
    const getCategory = async (option) => {
      const data = await getType(option);
      dispatch({ type: "SET_CATEGORY", payload: data });
    };
    getCategory(option);
  }, [option, dispatch]);

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-xl font-semibold">BakDoub Answer</h1>
      <div>
        <SelectOption options={types} onSelectChange={handleSelectChange} />
      </div>
      <div className="gap-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 text-sm md:text-l">
        {listCategory.map((item) => (
          <BakDoubItem data={item} key={item.id} />
        ))}
      </div>
    </div>
  );
}
