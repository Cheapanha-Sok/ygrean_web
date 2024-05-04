import React, { useContext, useEffect, useState } from "react";
import SelectOption from "../../../ui/shared/SelectOption";
import { levels, types } from "../../../data/dummyData";
import { getType } from "../../../context/bakDoub/BakDoubAction";
import BakDoubDataContext from "../../../context/bakDoub/BakDoubContext";
import { getQuestionByTypeAndCategory } from "../../../context/quiz/QuizAction";
import Button from "../../../ui/shared/Button";
import QuestionItem from "./components/QuetionItem";
import NotFound from "../../../ui/shared/NotFound";

export default function ManageQuiz() {
  const { listCategories, listQuestons, dispatch } =
    useContext(BakDoubDataContext);
  const [isCreate, setIsCreate] = useState(false);
  const [option, setOption] = useState(1);
  const [categoryId, setCategoryId] = useState(1);
  const [levelId, setLevelId] = useState(1);

  const handleTypeChange = (event) => {
    setOption(parseInt(event.target.value));
  };
  const handleChangeCategory = (event) => {
    setCategoryId(parseInt(event.target.value));
  };
  const handleChangeLevel = (event) => {
    setLevelId(parseInt(event.target.value));
  };

  useEffect(() => {
    const getCategory = async (option) => {
      const types = await getType(option);
      dispatch({ type: "SET_CATEGORIES", payload: types });
    };
    getCategory(option).then(() => getQuestion(categoryId, levelId));
  }, [option, dispatch, categoryId, levelId]);

  const getQuestion = async (categoryId, levelId) => {
    const data = await getQuestionByTypeAndCategory(categoryId, levelId);
    dispatch({ type: "SET_QUESTIONS", payload: data });
  };

  console.log(listQuestons);

  return (
    <ul className="flex flex-col gap-5 p-5">
      <>
        <div className="flex flex-row gap-5">
          <SelectOption options={types} onSelectChange={handleTypeChange} />
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
        {listQuestons.length ? (
          listQuestons.map((item) => <QuestionItem data={item} key={item.id} />)
        ) : (
          <NotFound />
        )}
      </>
    </ul>
  );
}
