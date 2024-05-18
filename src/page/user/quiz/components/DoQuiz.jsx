import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getQuestion } from "../../../../context/quiz/QuizAction";
import QuizDataContext from "../../../../context/quiz/QuizContext";
import Choice from "./Choice";
import Button from "../../../../ui/shared/Button";
import DisplayResult from "./DisplayResult";
import Spinner from "../../../../ui/shared/Spinner";
import NotFound from "../../../../ui/shared/NotFound";
import { savePointUser } from "../../../../context/user/UserAction";

export default function DoQuiz() {
  const { categoryId, levelId } = useParams();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showPoint, setShowPoint] = useState(false);
  const [choiceId, setChoiceId] = useState(0);
  const [score, setScore] = useState(0);
  const { listQuestions, dispatch, loading } = useContext(QuizDataContext);

  const savePoint = async (score, categoryId, levelId, listQuestions) => {
    await savePointUser(score, categoryId, levelId, listQuestions);
  };

  useEffect(() => {
    dispatch({ type: "SET_LOADING" });
    const fetchQuiz = async (categoryId, levelId) => {
      const data = await getQuestion(categoryId, levelId);
      dispatch({ type: "SET_QUESTIONS", payload: data });
    };
    fetchQuiz(categoryId, levelId);
  }, [categoryId, levelId, dispatch]);

  const totalQuestions = listQuestions.length;

  const handleNextQuestion = () => {
    // Check if there are any questions left
    if (currentQuestion >= totalQuestions - 1) {
      savePoint(score, categoryId, levelId, listQuestions);
      setShowPoint(true);
      return;
    }

    const correctAnswer = listQuestions[currentQuestion].choices.find(
      (item) => item.isCorrect === true
    );

    // Check if the selected choice is correct
    if (choiceId == correctAnswer.id) {
      setScore((prevScore) => prevScore + listQuestions[currentQuestion].point);
    }

    // Move to the next question
    setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    setChoiceId(0);
  };

  if (loading) {
    return <Spinner isFull={true} />;
  }
  if (totalQuestions === 0) {
    return <NotFound />;
  }
  if (showPoint) {
    return <DisplayResult score={score} />;
  }

  console.log(listQuestions);

  return (
    <ul className="flex flex-col gap-2 p-5">
      <label htmlFor="complete-question">Question</label>
      <progress
        id="complete-question"
        value={currentQuestion}
        max={totalQuestions}
        className="w-full"
      ></progress>

      {listQuestions[currentQuestion] && (
        <>
          <div className="flex flex-row justify-between bg-slate-400 p-5">
            <p className="font-semibold capitalize">
              <p>{score}</p>
              {listQuestions[currentQuestion].name}
            </p>

            <p className="font-semibold capitalize">
              point : {listQuestions[currentQuestion].point}
            </p>
          </div>

          {listQuestions[currentQuestion].choices.map((item) => (
            <Choice
              data={item}
              key={item.id}
              onSelect={(choiceId) => setChoiceId(choiceId)}
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
