import { useContext, useEffect, useState } from "react";
import { getSubjectPdf } from "../../../context/subject/SubjectAction";
import { useParams } from "react-router-dom";
import Spinner from "../../../ui/shared/Spinner";
import NotFound from "../../../ui/shared/NotFound";
import SubjectContext from "../../../context/subject/SubjectContext";

export default function ViewPdf() {
  const { categoryId, examDateId } = useParams();
  const { subject, dispatch, loading } = useContext(SubjectContext);

  useEffect(() => {
    const fetchData = async (examDateId, categoryId) => {
      dispatch({ type: "SET_LOADING" });
      const data = await getSubjectPdf(examDateId, categoryId);
      if (data.statusCode === 404) {
        dispatch({ type: "SET_PDF", payload: null });
      } else {
        dispatch({ type: "SET_PDF", payload: data });
      }
    };
    fetchData(examDateId, categoryId);
  }, [categoryId, examDateId, dispatch]);

  if (loading) {
    return <Spinner isFull />;
  }

  if (!subject) {
    return <NotFound />;
  }

  const { pdfUrl, category, examDate } = subject;

  return (
    <div className="flex flex-col gap-5">
      <>
        <h1 className="text-3xl font-semibold uppercase">Subject PDF</h1>
        <div className="flex gap-5">
          <p className="uppercase text-xl">Subject: {category.name}</p>
          <p className="uppercase text-xl">Exam Date: {examDate.name}</p>
        </div>
        <iframe src={pdfUrl} height="1200px" width="100%"></iframe>
      </>
    </div>
  );
}
