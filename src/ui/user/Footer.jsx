import Logo from "../../assets/Logo.png"

export default function Footer() {
  return (
    <footer className="bg-gradient-to-l from-blue-500 py-5">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 text-sm md:text-l px-5 space-y-5 gap-5">
        {/* for logo */}
        <div className="flex flex-col gap-5 justify-end md:justify-center">
          <a href="/">
            <img src={Logo} className="w-1/2 md:w-1/4" alt="FlowBite Logo" />
          </a>
          <span className=" font-semibold text-xs md:text-base">
           Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus dolore temporibus sint quibusdam vel cum! Itaque, earum. Inc.
          </span>
        </div>
        {/* for col 1 */}
        <div className="flex flex-col gap-5">
          <h2 className="text-sm font-semibold uppercase">
            Categories
          </h2>
          <ul className="font-medium flex flex-col gap-5 uppercase">
            <li>
                comic
            </li>
            <li>
                free
            </li>
            <li>
                novel
            </li>
            <li>
                study
            </li>
          </ul>
        </div>
        {/* for col 2 */}
        <div className="flex flex-col gap-5">
          <h2 className="text-sm font-semibold uppercase">
            Categories
          </h2>
          <ul className="font-medium flex flex-col gap-5 uppercase">
            <li>
                comic
            </li>
            <li>
                free
            </li>
            <li>
                novel
            </li>
            <li>
                study
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-5">
          <h2 className="text-sm font-semibold uppercase">
            Categories
          </h2>
          <ul className="font-medium flex flex-col gap-5 uppercase">
            <li>
                comic
            </li>
            <li>
                free
            </li>
            <li>
                novel
            </li>
            <li>
                study
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-5">
          <h2 className="text-sm font-semibold uppercase">
            Categories
          </h2>
          <ul className="font-medium flex flex-col gap-5 uppercase">
            <li>
                comic
            </li>
            <li>
                free
            </li>
            <li>
                novel
            </li>
            <li>
                study
            </li>
          </ul>
        </div>
      
      </div>
    </footer>
  )
}
