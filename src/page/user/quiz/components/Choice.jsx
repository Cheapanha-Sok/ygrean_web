import Input from "../../../../ui/shared/Input";

export default function Choice({ data, onSelect }) {
  const handleInputChange = (e) => {
    onSelect(e.target.value);
  };

  return (
    <li className="flex flex-col gap-2 p-2">
      <div className="flex flex-row gap-5 capitalize" key={data.id}>
        <label htmlFor={data.name}>{data.name}</label>
        <Input
          type="radio"
          name="choice"
          value={data.id}
          onChange={handleInputChange}
        />
      </div>
    </li>
  );
}
