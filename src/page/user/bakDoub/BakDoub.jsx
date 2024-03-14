// Science.jsx
import React, { useState } from "react";
import ItemList from "../../../ui/user/ItemList";
import { science, socialScience } from "../../../data/dummyData";
import SelectOption from "../../../ui/shared/SelectOption";

export default function BakDoub() {
  const [option, setOption] = useState("science");

  const handleSelectChange = (event) => {
    setOption(event.target.value);
  };

  const options = [
    {
      id: 1,
      name: "science",
    },
    {
      id: 2,
      name: "socialscience",
    },
  ];

  const data = option === "science" ? science : socialScience;

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-xl font-semibold">BakDoub Answer</h1>
      <div>
        <SelectOption options={options} onSelectChange={handleSelectChange} />
      </div>

      <ItemList data={data} />
    </div>
  );
}
