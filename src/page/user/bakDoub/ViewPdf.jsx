import { useContext, useEffect } from "react";
import { getBakDoubAnswer } from "../../../context/bakDoub/BakDoubAction";
import { useParams } from "react-router-dom";
import BakDoubDataContext from "../../../context/bakDoub/BakDoubContext";

export default function ViewPdf() {
  const { categoryId, examDateId } = useParams();
  const { listBakDoubs, dispatch, loading } = useContext(BakDoubDataContext);
  const { pdfUrl, categoryName, examDate, type } = listBakDoubs;

  console.log("exam" , examDateId)
  console.log("cate" , categoryId)

  useEffect(() => {
    const fetchData = async (examDateId, categoryId) => {
      const data = await getBakDoubAnswer(examDateId, categoryId);
      dispatch({ type: "SET_BAKDOUBS", payload: data });
    };
    fetchData(examDateId, categoryId);
  }, [categoryId, examDateId, dispatch]);

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-3xl font-semibold uppercase">{type}</h1>
      <div className="flex gap-5">
        <p className="uppercase text-xl">Subject : {categoryName}</p>
        <p className="uppercase text-xl"> Exam Date : {examDate}</p>
      </div>
      <iframe src={pdfUrl} height="1200px" width="100%"></iframe>
    </div>
  );
}
