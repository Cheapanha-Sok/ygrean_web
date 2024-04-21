// SelectOption.jsx
import React from "react";

export default function SelectOption({ options, onSelectChange }) {
  return (
    <select
      onChange={onSelectChange}
      className="rounded-xl p-1 sm:p-2 bg-[#283d50] text-white uppercase text-sm md:text-base"
    >
      {options.map((item) => (
        <option key={item.id} value={item.id}>
          {item.name}
        </option>
      ))}
    </select>
  );
}
