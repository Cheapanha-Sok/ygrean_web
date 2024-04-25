import { useContext, useEffect, useState } from "react";
import BakDoubDataContext from "../../../context/bakDoub/BakDoubContext";
import { getAllBakDoubAnswer } from "../../../context/bakDoub/BakDoubAction";
import BakDoubItem from "./components/BakDoubItem";
import SelectOption from "../../../ui/shared/SelectOption";
import { types } from "../../../data/dummyData";
import Button from "../../../ui/shared/Button";
import CreateBakDoub from "./components/CreateBakDoub";

export default function BakDoubList() {
 const { listBakDoubs, dispatch, loading } = useContext(BakDoubDataContext);
 const [isOpen, setIsOpen] = useState(false);

 useEffect(() => {
    fetchBakDoub();
 }, [dispatch]);

 const fetchBakDoub = async () => {
    const data = await getAllBakDoubAnswer();
    dispatch({ type: "SET_BAKDOUBS", payload: data });
 };

 return (
    <ul className="flex flex-col gap-5 p-5">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="flex flex-row gap-5">
            <SelectOption options={types} />
            <Button
              customClass="bg-green-500 text-white"
              onClick={() => setIsOpen(true)}
            >
              New BakDoub
            </Button>
          </div>
          {listBakDoubs.map((item) => (
            <BakDoubItem data={item} key={item.id} />
          ))}
          {isOpen && <CreateBakDoub onRefresh={()=> fetchBakDoub()} onClose={() => setIsOpen(!isOpen)} />}
        </>
      )}
    </ul>
 );
}
