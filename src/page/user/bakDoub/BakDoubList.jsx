import { useContext, useEffect, useState } from "react";
import SelectOption from "../../../ui/shared/SelectOption";
import { getType } from "../../../context/bakDoub/BakDoubAction";
import { types } from "../../../data/dummyData";
import BakDoubDataContext from "../../../context/bakDoub/BakDoubContext";
import BakDoubItem from "./components/BakDoubItem";

export default function BakDoubList() {
  const [option, setOption] = useState(1);

  const handleSelectChange = (event) => {
    const selectedOption = parseInt(event.target.value);
    setOption(selectedOption);
  };

  const { listCategories, dispatch } = useContext(BakDoubDataContext);

  useEffect(() => {
    const getCategory = async (option) => {
      const data = await getType(option);
      dispatch({ type: "SET_CATEGORIES", payload: data });
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
        {listCategories.map((item) => (
          <BakDoubItem data={item} key={item.id} />
        ))}
      </div>
    </div>
  );
}
