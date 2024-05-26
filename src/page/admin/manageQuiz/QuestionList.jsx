import { useContext, useEffect, useState } from "react";
import SelectOption from "../../../ui/shared/SelectOption";
import { levels, types, userIndentity } from "../../../data/dummyData";
import { getType, getCategory } from "../../../context/subject/SubjectAction";
import { listQuestion as fetchQuestion } from "../../../context/quiz/QuizAction";
import Button from "../../../ui/shared/Button";
import QuestionItem from "./components/QuetionItem";
import NotFound from "../../../ui/shared/NotFound";
import Spinner from "../../../ui/shared/Spinner";
import CreateQuestion from "./components/CreateQuestion";
import QuizContext from "../../../context/quiz/QuizContext";

export default function QuestionList() {
  const { listCategory, listQuestion, dispatch, loading } =
    useContext(QuizContext);
  const [isCreate, setIsCreate] = useState(false);
  const [option, setOption] = useState(1);
  const [categoryId, setCategoryId] = useState(1);
  const [levelId, setLevelId] = useState(1);
  const [userIdentity, setUserIdentity] = useState(0);

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
      userIdentity === 0 ? await getType(option) : await getCategory();
    dispatch({ type: "SET_CATEGORY", payload: category });
  };

  useEffect(() => {
    dispatch({ type: "SET_LOADING" });

    fetchData(option).then(() => getQuestion());
  }, [dispatch, levelId, option, categoryId, userIdentity]);

  const getQuestion = async () => {
    const data = await fetchQuestion(categoryId, levelId, userIdentity);
    dispatch({ type: "SET_QUESTION", payload: data });
  };

  if (loading) {
    return <Spinner isFull />;
  }
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
            options={listCategory}
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

        <ul className="flex flex-col gap-5">
          {listQuestion.length ? (
            listQuestion.map((item) => (
              <QuestionItem data={item} key={item.id} />
            ))
          ) : (
            <NotFound />
          )}
        </ul>

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
