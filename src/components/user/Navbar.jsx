import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-slate-500 p-6 text-white">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-5">
          <h1 className="text_sm md:text-xl">WeLearn</h1>
        </div>
        <ul className="hidden md:flex flex-row gap-5">
          <li>
            <Link to="/quiz">
              <span className="text-white">Quiz</span>
            </Link>
          </li>
          <li>
            <Link to="/ranking">
              <span className="text-white">Ranking</span>
            </Link>
          </li>
          <li>
            <Link to="/scholarship">
              <span className="text-white">Scholarship</span>
            </Link>
          </li>
          <li>
            <Link to="/Book">
              <span className="text-white">Book</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
