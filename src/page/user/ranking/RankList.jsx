import { useContext, useEffect, useState } from "react";
import RankDataContext from "../../../context/rank/RankContext";
import Spinner from "../../../ui/shared/Spinner";
import RankItem from "./components/RankItem";
import NotFound from "../../../ui/shared/NotFound";
import { getRank } from "../../../context/rank/RankAction";
import SelectOption from "../../../ui/shared/SelectOption";
import { types, userIndentity } from "../../../data/dummyData";
import { getCategory, getType } from "../../../context/subject/SubjectAction";
import ShareButton from "./components/ShareButtonComponent";

export default function RankList() {
  const { listRanks, listCategory, loading, dispatch } =
    useContext(RankDataContext);
  const [isGraduate, setGraduate] = useState(0);
  const [type, setType] = useState(1);
  const [category, setCategory] = useState(
    listCategory.length ? listCategory[0].id : 1
  );

  const handleSelectChange = (event) => {
    const selectedOption = parseInt(event.target.value);
    setGraduate(selectedOption);
  };

  const handleChangeType = (e) => {
    const selectedType = parseInt(e.target.value);
    setType(selectedType);
  };

  const handleChangeCategory = (e) => {
    const selectedCategory = parseInt(e.target.value);
    setCategory(selectedCategory);
  };

  useEffect(() => {
    dispatch({ type: "SET_LOADING" });
    const fetchData = async () => {
      const data = isGraduate ? await getCategory() : await getType(type);
      dispatch({ type: "SET_CATEGORY", payload: data });
    };
    fetchData().then(() => fetchRank());
  }, [dispatch, isGraduate, category, type]);

  const fetchRank = async () => {
    const data = await getRank(category, isGraduate);
    dispatch({ type: "SET_RANKS", payload: data });
  };

  if (loading) {
    return <Spinner isFull />;
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-row gap-2">
        <SelectOption
          options={userIndentity}
          onSelectChange={handleSelectChange}
        />
        <SelectOption options={types} onSelectChange={handleChangeType} />
        <SelectOption
          options={listCategory}
          onSelectChange={handleChangeCategory}
        />
      </div>

      {loading ? (
        <Spinner isFull />
      ) : listRanks.length ? (
        listRanks.map((item, id) => (
          <ul className="flex flex-col gap-5" key={item.id}>
            <RankItem data={item} id={id + 1} />
          </ul>
        ))
      ) : (
        <NotFound />
      )}

       {listRanks.length > 0 && (
        <div className="flex justify-end">
          <ShareButton />
        </div>
      )}
    </div>
  );
}
