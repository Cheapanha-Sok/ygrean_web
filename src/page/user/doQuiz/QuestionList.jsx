import React, { useContext, useEffect, useState } from "react";
import QuizDataContext from "../../../context/quiz/QuizContext";
import QuestionItem from "./components/QuestionItem";
import { getQuestion } from "../../../context/quiz/QuizAction";

export default function QuestionList() {
  const { listQuestions, dispatch, loading } = useContext(QuizDataContext);

  useEffect(() => {
    dispatch({ type: "SET_LOADING" });
    const fetchQuestion = async () => {
      const data = await getQuestion();
      dispatch({ type: "SET_QUESTIONS", payload: data });
    };
    fetchQuestion();
  }, [dispatch]);

  return (
    <ul>
      {loading ? (
        <p>loading...</p>
      ) : (
        <>
          {listQuestions.map((item) => {
            <QuestionItem data={item} key={item.id} />;
          })}
        </>
      )}
    </ul>
  );
}
