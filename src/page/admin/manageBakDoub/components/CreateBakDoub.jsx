import { useContext, useEffect, useState } from "react";
import {
  createNewBakDoub,
  getExamDate,
  getType,
} from "../../../../context/bakDoub/BakDoubAction";
import Modal from "../../../../ui/shared/Modal";
import Input from "../../../../ui/shared/Input";
import Button from "../../../../ui/shared/Button";
import SelectOption from "../../../../ui/shared/SelectOption";
import { types } from "../../../../data/dummyData";
import BakDoubDataContext from "../../../../context/bakDoub/BakDoubContext";
import Spinner from "../../../../ui/shared/Spinner";

export default function CreateBakDoub({ onClose, onRefresh }) {
  const { listCategories, listExamDates, dispatch } =
    useContext(BakDoubDataContext);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [selectedExamDate, setSelectedExamDate] = useState(0);
  const [selectOption, setSelectOption] = useState(1);
  const [selectFile, setSelectFile] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const categories = await getType(selectOption);
      const examDates = await getExamDate();
      dispatch({ type: "SET_CATEGORIES", payload: categories });
      dispatch({ type: "SET_EXAMDATES", payload: examDates });
    };
    fetchData();
  }, [dispatch, selectOption]);

  const handleCategoryChange = (event) => {
    setSelectedCategory(parseInt(event.target.value));
  };

  const handleExamDateChange = (event) => {
    setSelectedExamDate(parseInt(event.target.value));
  };

  const handleTypeChange = (event) => {
    setSelectOption(parseInt(event.target.value));
  };

  const onChangePdf = (e) => {
    setSelectFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await createNewBakDoub(
      selectedCategory,
      selectedExamDate,
      selectFile
    );
    if (res === true) {
      setIsLoading(false);
      onRefresh();
      alert("create successful");
    }
  };

  return (
    <Modal onClose={onClose} title="Create Book">
      <form
        onSubmit={handleSubmit}
        className="p-4 md:p-5 space-y-2 md:space-y-5"
      >
        <div className="flex flex-col gap-2 md:gap-5">
          <div className="flex flex-col md:flex-row gap-2 md:items-center">
            <label
              htmlFor="examDate"
              className="text-sm font-medium text-white"
            >
              Type :
            </label>
            <SelectOption options={types} onSelectChange={handleTypeChange} />
            <label htmlFor="type" className="text-sm font-medium text-white">
              ExamDate:
            </label>
            <SelectOption
              options={listExamDates}
              onSelectChange={handleExamDateChange}
            />

            <label
              htmlFor="category"
              className="text-sm font-medium text-white"
            >
              Category :
            </label>
            <SelectOption
              options={listCategories}
              onSelectChange={handleCategoryChange}
            />
          </div>
          <label htmlFor="file" className="text-sm font-medium text-white">
            Pdf:
            <Input
              style="rounded-lg"
              type="file"
              id="file"
              accept=".pdf"
              onChange={onChangePdf}
              required
            />
          </label>
        </div>
        {isLoading ? (
          <Spinner />
        ) : (
          <Button type="submit" customClass="bg-white text-[#283d50] ">
            Submit
          </Button>
        )}
      </form>
    </Modal>
  );
}
