import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getQuestionByTypeAndCategory } from "../../../../context/quiz/QuizAction";
import QuizDataContext from "../../../../context/quiz/QuizContext";
import Choice from "./Choice";
import Button from "../../../../ui/shared/Button";
import DisplayResult from "./DisplayResult";
import Spinner from "../../../../ui/shared/Spinner";
import NotFound from "../../../../ui/shared/NotFound";

export default function DoQuiz() {
  const { categoryId, levelId } = useParams();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showPoint, setShowPoint] = useState(false);
  const [choiceId, setChoiceId] = useState(0);
  const [score, setScore] = useState(0);
  const { listQuestions, dispatch, loading } = useContext(QuizDataContext);

  console.log(currentQuestion);

  useEffect(() => {
    dispatch({ type: "SET_LOADING" });
    const fetchQuiz = async (categoryId, levelId) => {
      const data = await getQuestionByTypeAndCategory(categoryId, levelId);
      dispatch({ type: "SET_QUESTIONS", payload: data });
    };
    fetchQuiz(categoryId, levelId);
  }, [categoryId, levelId, dispatch]);

  const totalQuestions = listQuestions.length;

  const handleNextQuestion = () => {
    const correctAnswer = listQuestions[currentQuestion].choices.filter(
      (item) => {
        return item.is_correct === true;
      }
    );
    if (choiceId == correctAnswer[0].id) {
      setScore((prevScore) => prevScore + listQuestions[currentQuestion].point);
    }
    if (currentQuestion < totalQuestions) {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
      setChoiceId(0);
    } else {
      setShowPoint(true);
      setCurrentQuestion(totalQuestions);
    }
  };

  // const handelBackQuestion = () => {
  //   if (currentQuestion > 0) {
  //     setCurrentQuestion((prevQuestion) => prevQuestion - 1);
  //     score > 0
  //       ? setScore(
  //           (prevScore) => prevScore - listQuestions[currentQuestion].point
  //         )
  //       : null;
  //     setBackQuestion(true);
  //     setAnswered(false);
  //   } else {
  //     setBackQuestion(false);
  //   }
  // };

  return (
    <>
      {loading ? (
        <Spinner isFull={true} />
      ) : (
        <>
          {showPoint ? (
            <DisplayResult score={score} />
          ) : (
            <>
              {totalQuestions > 0 ? (
                <ul className="flex flex-col gap-2 p-5">
                  <label htmlFor="complete-question">Question</label>
                  <progress
                    id="complete-question"
                    value={currentQuestion}
                    max={totalQuestions}
                    className="w-full"
                  ></progress>
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

                  <div className="flex flex-row justify-between">
                    {choiceId !== 0 && (
                      <Button
                        customClass="bg-green-500"
                        onClick={handleNextQuestion}
                      >
                        Next Question
                      </Button>
                    )}
                  </div>
                </ul>
              ) : (
                <NotFound />
              )}
            </>
          )}
        </>
      )}
    </>
  );
}
