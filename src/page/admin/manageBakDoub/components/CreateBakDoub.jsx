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
    setSelectFile(e.target.files[0])
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
          <Button
            disabled
            type="button"
            customClass="bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"
          >
            <svg
              aria-hidden="true"
              role="status"
              className="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="#1C64F2"
              />
            </svg>
            Loading...
          </Button>
        ) : (
          <Button type="submit" customClass="bg-white text-[#283d50] ">
            Submit
          </Button>
        )}
      </form>
    </Modal>
  );
}
