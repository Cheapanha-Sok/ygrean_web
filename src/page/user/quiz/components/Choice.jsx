import Input from "../../../../ui/shared/Input";

export default function Choice({ data, onSelect }) {
  return (
    <li className="flex flex-col gap-2 p-2">
      <div className="flex flex-row gap-5 capitalize">
        <label htmlFor={data.name}>{data.name}</label>
        <Input
        style="p-3 bg-red-500"
          type="radio"
          name="choice"
          id={data.id}
          value={data.id}
          onChange={onSelect}
        />
      </div>
    </li>
  );
}
