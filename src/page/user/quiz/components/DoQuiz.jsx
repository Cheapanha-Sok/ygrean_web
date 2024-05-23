import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getQuestion } from "../../../../context/quiz/QuizAction";
import Choice from "./Choice";
import Button from "../../../../ui/shared/Button";
import DisplayResult from "./DisplayResult";
import Spinner from "../../../../ui/shared/Spinner";
import NotFound from "../../../../ui/shared/NotFound";
import { savePointUser } from "../../../../context/user/UserAction";
import QuizContext from "../../../../context/quiz/QuizContext";

export default function DoQuiz() {
  const { categoryId, levelId } = useParams();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showPoint, setShowPoint] = useState(false);
  const [choiceId, setChoiceId] = useState(0);
  const [userChoices, setUserChoices] = useState([]); 
  const [score, setScore] = useState(0);
  const { listQuestion, dispatch, loading } = useContext(QuizContext);

  const savePoint = async (score, categoryId, levelId, listQuestions) => {
    await savePointUser(score, categoryId, levelId, listQuestions);
  };
  console.log(choiceId)

  useEffect(() => {
    dispatch({ type: "SET_LOADING" });
    const fetchQuiz = async (categoryId, levelId) => {
      const data = await getQuestion(categoryId, levelId);
      dispatch({ type: "SET_QUESTION", payload: data });
    };
    fetchQuiz(categoryId, levelId);
  }, [categoryId, levelId, dispatch]);

  const totalQuestions = listQuestion.length;

  const handleChangeChoice = (e) =>{
    const chocieId = parseInt(e.target.value)
    setChoiceId(chocieId)
  }

  const handleNextQuestion = () => {
    if (currentQuestion >= totalQuestions - 1) {
      savePoint(score, categoryId, levelId, listQuestion);
      setShowPoint(true);
      return;
    }

    const correctAnswer = listQuestion[currentQuestion].choices.find(
      (item) => item.isCorrect === true
    );

    if (choiceId === correctAnswer.id) {
      setScore((prevScore) => prevScore + listQuestion[currentQuestion].point);
    }

    setUserChoices([...userChoices, { questionId: listQuestion[currentQuestion].id, choiceId }]); // Store user choice

    setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    setChoiceId(0);
  }

  if (loading) {
    return <Spinner isFull={true} />;
  }
  if (totalQuestions === 0) {
    return <NotFound />;
  }
  if (showPoint) {
    return (
      <DisplayResult score={score} listQuestion={listQuestion} userChoices={userChoices} />
    );
  }

  console.log(listQuestion);

  return (
    <ul className="flex flex-col gap-2 p-5">
      <label htmlFor="complete-question">Question</label>
      <progress
        id="complete-question"
        value={currentQuestion}
        max={totalQuestions}
        className="w-full"
      ></progress>

      {listQuestion[currentQuestion] && (
        <>
          <div className="flex flex-row justify-between bg-slate-400 p-5">
            <p className="font-semibold capitalize">
              <p>{score}</p>
              {listQuestion[currentQuestion].name}
            </p>

            <p className="font-semibold capitalize">
              point : {listQuestion[currentQuestion].point}
            </p>
          </div>

          {listQuestion[currentQuestion].choices.map((item) => (
            <Choice
              data={item}
              key={item.id}
              onSelect={handleChangeChoice}
            />
          ))}
        </>
      )}

      <div className="flex flex-row justify-between">
        {choiceId !== 0 && (
          <Button customClass="bg-green-500" onClick={handleNextQuestion}>
            Next Question
          </Button>
        )}
      </div>
    </ul>
  );
}
