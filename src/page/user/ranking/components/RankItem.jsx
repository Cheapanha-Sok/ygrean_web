export default function RankItem({ data, id }) {
  const { point, user } = data;

  const getGradientColor = (index) => {
    switch (index) {
      case 1:
        return "from-[#cc9910] to-[#fcf97c]";
      case 2:
        return "from-[#C0C0C0] to-[#e9e9eb]";
      case 3:
        return "from-[#ca6533] to-[#F0C9BA]";
      default:
        return "from-[#7dd3fc] to-[#e0f2fe]";
    }
  };

  return (
    <li
      className={`flex flex-row justify-between gap-5 bg-gradient-to-r p-3 rounded-xl ${getGradientColor(
        id
      )}`}
    >
      <div className="flex flex-row gap-5">
        <p>{id}</p>
        <p className="font-semibold capitalize">Username : {user.name}</p>
        <p className="font-semibold capitalize">Indentity : {user.isGraduate ? "graduate" : "notgraduate"}</p>
      </div>

      <p className="font-semibold capitalize">totalPoint : {point}</p>
    </li>
  );
}
