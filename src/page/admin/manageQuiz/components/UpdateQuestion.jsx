import { useState } from "react";
import { updateQuestion } from "../../../../context/quiz/QuizAction";
import Button from "../../../../ui/shared/Button";
import Input from "../../../../ui/shared/Input";
import Modal from "../../../../ui/shared/Modal";

export default function UpdateQuestion({ question, onClose }) {
  const [questionData, setQuestionData] = useState({
    name: question.name,
    category_id: question.category.id,
    level_id: question.level.id,
    isGraduate: question.isGraduate,
    choices: question.choices.map((choice) => ({
      id: choice.id,
      name: choice.name,
      is_correct: choice.isCorrect,
    })),
  });

  console.log(question)

  const handleInputChange = (index, field, value) => {
    const newChoices = [...questionData.choices];
    newChoices[index][field] = value;
    setQuestionData({ ...questionData, choices: newChoices });
  };

  const handleChange = (field, value) => {
    setQuestionData({ ...questionData, [field]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await updateQuestion(question.id, questionData);
    if (res) {
      onClose();
    }
  };

  return (
    <Modal title="Update Question" onClose={onClose}>
      <form
        onSubmit={handleSubmit}
        className="p-4 md:p-5 space-y-2 md:space-y-5"
      >
        <div className="flex flex-col gap-2 md:gap-5">
          <label
            htmlFor="questionName"
            className="text-sm font-medium text-white"
          >
            Question Name:
          </label>
          <Input
            style="px-5 py-2 rounded-lg border-2 text-[#283d50]"
            type="text"
            id="questionName"
            name="name"
            defaultValue={questionData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            required
          />
          <label htmlFor="choices" className="text-sm font-medium text-white">
            Choices:
          </label>
          {questionData.choices.map((item, index) => (
            <div key={index} className="flex flex-col gap-2">
              <div className="flex flex-row items-center gap-2">
                <Input
                  style="px-5 py-2 rounded-lg border-2 text-[#283d50]"
                  type="text"
                  defaultValue={item.name}
                  onChange={(e) =>
                    handleInputChange(index, "name", e.target.value)
                  }
                  required
                />
                <label className="text-sm font-medium text-white">
                  IsCorrect: {item.isCorrect ? "True" : "False"}
                </label>
              </div>
            </div>
          ))}
        </div>
        <Button type="submit" customClass="bg-white text-[#283d50]">
          Update
        </Button>
      </form>
    </Modal>
  );
}
