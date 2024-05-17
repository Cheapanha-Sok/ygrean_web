import { useState } from "react";
import Button from "../../../../ui/shared/Button";
import Input from "../../../../ui/shared/Input";
import Modal from "../../../../ui/shared/Modal";

export default function Choice({ data, onClose }) {
  const [choices, setChoices] = useState(data);

  const handleEditChoice = async () => {
    console.log("Edited choices:", choices);
  };

  const handleInputChange = (id, value) => {
    setChoices((prevChoices) =>
      prevChoices.map((item) =>
        item.id === id ? { ...item, name: value } : item
      )
    );
  };

  return (
    <Modal onClose={onClose} title="Choice">
      {choices.map((item) => (
        <div
          key={item.id}
          className="flex flex-col gap-2 text-white p-5 capitalize"
        >
          <Input
            className="px-5 py-2 rounded-lg border-2"
            type="text"
            id={`choice-${item.id}`}
            defaultValue={item.name}
            onChange={(e) => handleInputChange(item.id, e.target.value)}
            required
          />
        </div>
      ))}
      <Button onClick={handleEditChoice}>Save</Button>
    </Modal>
  );
}
