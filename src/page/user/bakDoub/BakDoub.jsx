import { useContext, useEffect, useState } from "react";
import ItemList from "../../../ui/user/ItemList";
import SelectOption from "../../../ui/shared/SelectOption";
import { getType } from "../../../context/bakDoub/BakDoubAction";
import { types } from "../../../data/dummyData";
import BakDoubDataContext from "../../../context/bakDoub/BakDoubContext";

export default function BakDoub() {
  const [option, setOption] = useState(1);

  const handleSelectChange = (event) => {
    const selectedOption = parseInt(event.target.value);
    setOption(selectedOption);
  };

  const { listCategories, dispatch } = useContext(BakDoubDataContext);

  useEffect(()=>{
    const getCategory = async(option)=>{
      const data = await getType(option)
      dispatch({ type: "SET_CATEGORIES", payload: data });
    }
    getCategory(option)
  },[option , dispatch])

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-xl font-semibold">BakDoub Answer</h1>
      <div>
        <SelectOption options={types} onSelectChange={handleSelectChange} />
      </div>
      <ItemList data={listCategories} on />
    </div>
  );
}
