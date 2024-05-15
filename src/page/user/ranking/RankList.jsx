import { useContext, useEffect, useState } from "react";
import RankDataContext from "../../../context/rank/RankContext";
import Spinner from "../../../ui/shared/Spinner";
import RankItem from "./components/RankItem";
import NotFound from "../../../ui/shared/NotFound";
import { getRank } from "../../../context/rank/RankAction";
import SelectOption from "../../../ui/shared/SelectOption";
import { userIndentity } from "../../../data/dummyData";

export default function RankList() {
  const [isGraduate, setGraduate] = useState(0);
  const { listRanks, loading, dispatch } = useContext(RankDataContext);

  const handleSelectChange = (event) => {
    const selectedOption = parseInt(event.target.value);
    setGraduate(selectedOption);
  };

  useEffect(() => {
    const fetchRank = async () => {
      const data = await getRank(isGraduate);
      dispatch({ type: "SET_RANKS", payload: data });
    };
    fetchRank();
  }, [dispatch, isGraduate]);

  if (loading) {
    return <Spinner isFull />;
  }

  return (
    <div className="flex flex-col gap-5">
      <div>
        <SelectOption
          options={userIndentity}
          onSelectChange={handleSelectChange}
        />
      </div>

      {loading ? (
        <Spinner isFull />
      ) : listRanks.length ? (
        listRanks.map((item , id) => (
          <ul className="flex flex-col gap-5" key={item.id}>
            <RankItem data={item} id={id + 1} />
          </ul>
        ))
      ) : (
        <NotFound />
      )}
    </div>
  );
}
