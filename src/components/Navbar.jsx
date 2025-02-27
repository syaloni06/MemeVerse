import DarkModeToggle from "../utils/DarkModeToggle";

import { TbSquareLetterMFilled } from "react-icons/tb";
const Navbar = () => {

  return (
    <nav className="w-full bg-white dark:bg-black shadow-sm h-16 flex items-center fixed top-0 left-0 z-50">
      <div className="w-full h-full flex justify-between items-center px-6">
        {/* Logo */}
        <div className="flex items-center font-bold text-2xl italic">
          <div
            className="bg-gradient-to-r flex from-sky-500 to-blue-800 text-transparent bg-clip-text cursor-pointer"
          >
            <TbSquareLetterMFilled className="text-sky-500 self-center"/>emeVerse
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-6 items-center">
            <DarkModeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;