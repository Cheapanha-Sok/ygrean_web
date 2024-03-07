import { Link } from "react-router-dom";

export default function Navbar() {

  const links = [
    { name: "quiz", link: "/quiz", image: "" },
    { name: "ranking", link: "/ranking", image: "" },
    { name: "scholarship", link: "/scholarship", image: "" },
    { name: "account", link: "/account", image: "" }
  ];
  return (
    <nav className="bg-slate-500 p-6 text-white">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-5">
          <Link to="/" className="text_sm md:text-xl">WeLearn</Link>
        </div>
        <ul className="hidden md:flex flex-row gap-5">
          {links.map((item) => (
            <li key={item.name} className="flex flex-row items-center gap-2">
              <img className="h-5 w-5" src={item.image} alt={item.name} />
              <Link to={item.link}>
                <span className="text-white uppercase">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
