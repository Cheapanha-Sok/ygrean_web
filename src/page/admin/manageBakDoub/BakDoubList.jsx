import { useContext, useEffect, useState } from "react";
import BakDoubDataContext from "../../../context/bakDoub/BakDoubContext";
import { getAllBakDoubAnswerByType } from "../../../context/bakDoub/BakDoubAction";
import BakDoubItem from "./components/BakDoubItem";
import SelectOption from "../../../ui/shared/SelectOption";
import { types } from "../../../data/dummyData";
import Button from "../../../ui/shared/Button";
import CreateBakDoub from "./components/CreateBakDoub";
import Spinner from "../../../ui/shared/Spinner";
import NotFound from "../../../ui/shared/NotFound";

export default function BakDoubList() {
  const { listBakDoubs, dispatch, loading } = useContext(BakDoubDataContext);
  const [isOpen, setIsOpen] = useState(false);
  const [selectOption, setSelectOption] = useState(1);

  const handleTypeChange = (event) => {
    setSelectOption(parseInt(event.target.value));
  };

  useEffect(() => {
    dispatch({ type: "SET_LOADING" });
    fetchBakDoub(selectOption);
  }, [dispatch, selectOption]);

  const fetchBakDoub = async (selectOption) => {
    const data = await getAllBakDoubAnswerByType(selectOption);
    dispatch({ type: "SET_BAKDOUBS", payload: data });
  };

  return (
    <ul className="flex flex-col gap-5 p-5">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="flex flex-row gap-5">
            <SelectOption options={types} onSelectChange={handleTypeChange} />
            <Button
              customClass="bg-green-500 text-white"
              onClick={() => setIsOpen(true)}
            >
              New BakDoub
            </Button>
          </div>
          {loading ? (
            <Spinner isFull={true} />
          ) : listBakDoubs.length ? (
            listBakDoubs.map((item) => (
              <BakDoubItem data={item} key={item.id} />
            ))
          ) : (
            <NotFound />
          )}
          {isOpen && (
            <CreateBakDoub
              onRefresh={() => fetchBakDoub()}
              onClose={() => setIsOpen(!isOpen)}
            />
          )}
        </>
      )}
    </ul>
  );
}
