import { useContext, useEffect, useState } from "react";
import SelectOption from "../../../ui/shared/SelectOption";
import { levels, types, userIndentity } from "../../../data/dummyData";
import { getType, getCategory } from "../../../context/bakDoub/BakDoubAction";
import BakDoubDataContext from "../../../context/bakDoub/BakDoubContext";
import { getQuestionByTypeAndCategory } from "../../../context/quiz/QuizAction";
import Button from "../../../ui/shared/Button";
import QuestionItem from "./components/QuetionItem";
import NotFound from "../../../ui/shared/NotFound";
import Spinner from "../../../ui/shared/Spinner";
import CreateQuestion from "./components/CreateQuestion";

export default function ManageQuiz() {
  const { listCategories, listQuestons, dispatch, loading } =
    useContext(BakDoubDataContext);
  const [isCreate, setIsCreate] = useState(false);
  const [option, setOption] = useState(1);
  const [categoryId, setCategoryId] = useState(1);
  const [levelId, setLevelId] = useState(1);
  const [userIdentity, setUserIdentity] = useState(1);

  const handleTypeChange = (event) => {
    setOption(parseInt(event.target.value));
  };
  const handleChangeUserIdentity = (event) => {
    setUserIdentity(parseInt(event.target.value));
  };
  const handleChangeCategory = (event) => {
    setCategoryId(parseInt(event.target.value));
  };
  const handleChangeLevel = (event) => {
    setLevelId(parseInt(event.target.value));
  };
  const fetchData = async (option) => {
    const category =
      userIdentity === 1 ? await getType(option) : await getCategory();
    dispatch({ type: "SET_CATEGORIES", payload: category });
  };

  useEffect(() => {
    dispatch({ type: "SET_LOADING" });

    fetchData(option).then(() => getQuestion(categoryId, levelId));
  }, [option, dispatch, categoryId, levelId, userIdentity]);

  const getQuestion = async (categoryId, levelId) => {
    const data = await getQuestionByTypeAndCategory(categoryId, levelId);
    dispatch({ type: "SET_QUESTIONS", payload: data });
  };
  return (
    <ul className="flex flex-col gap-5 p-5">
      <>
        <div className="flex flex-row gap-5">
          {userIdentity === 0 && (
            <SelectOption options={types} onSelectChange={handleTypeChange} />
          )}

          <SelectOption
            options={userIndentity}
            onSelectChange={handleChangeUserIdentity}
          />
          <SelectOption
            options={listCategories}
            onSelectChange={handleChangeCategory}
          />
          <SelectOption options={levels} onSelectChange={handleChangeLevel} />
          <Button
            customClass="bg-green-500 text-white"
            onClick={() => setIsCreate(true)}
          >
            New Question
          </Button>
        </div>

        {loading ? (
          <Spinner isFull />
        ) : listQuestons.length ? (
          listQuestons.map((item) => <QuestionItem data={item} key={item.id} />)
        ) : (
          <NotFound />
        )}

        {isCreate && (
          <CreateQuestion
            onRefresh={() => fetchData()}
            onClose={() => setIsCreate(!isCreate)}
          />
        )}
      </>
    </ul>
  );
}
