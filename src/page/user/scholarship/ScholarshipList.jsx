import React, { useContext, useEffect } from "react";
import ScholarshipDataContext from "../../../context/scholarship/ScholarshipContext";
import { getScholarship } from "../../../context/scholarship/Scholarship";
import ScholarshipItem from "./components/ScholarshipItem";
import Spinner from "../../../ui/shared/Spinner";
import NotFound from "../../../ui/shared/NotFound";

export default function ScholarshipList() {
  const { listScholarship, dispatch, loading } = useContext(
    ScholarshipDataContext
  );

  useEffect(() => {
    const fetchData = async () => {
      const data = await getScholarship();
      dispatch({ type: "SET_SCHOLARSHIP", payload: data });
    };
    fetchData();
  }, [dispatch]);

  console.log(listScholarship);

  if (loading) {
    return <Spinner isFull />;
  }

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-xl font-semibold">Scholarship</h1>
      {listScholarship.length ? (
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {listScholarship.map((item) => (
            <ScholarshipItem data={item} key={item.id} />
          ))}
        </ul>
      ) : (
        <NotFound />
      )}
    </div>
  );
}
