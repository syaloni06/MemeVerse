import { NavLink } from "react-router-dom";
import DarkModeToggle from "../utils/DarkModeToggle";

const Navbar = () => {
  return (
    <nav className="w-full bg-white dark:bg-black shadow-sm h-16 flex items-center fixed top-0 left-0 z-50">
      <div className="w-full h-full flex justify-between items-center px-6">
        {/* Logo */}
        <NavLink to="/" className="flex items-center font-bold text-2xl italic">
          <div className="bg-gradient-to-r flex from-sky-500 to-blue-800 text-transparent bg-clip-text cursor-pointer">
            MemeVerse
          </div>
        </NavLink>

        {/* Navigation Links */}
        <div className="flex space-x-6 items-center">
          <NavLink
            to="/explore"
            className={({ isActive }) =>
              `hover:text-blue-500 transition ${
                isActive ? "text-blue-500 font-semibold" : "text-gray-700 dark:text-gray-300"
              }`
            }
          >
            Explore
          </NavLink>

          <NavLink
            to="/upload"
            className={({ isActive }) =>
              `hover:text-blue-500 transition ${
                isActive ? "text-blue-500 font-semibold" : "text-gray-700 dark:text-gray-300"
              }`
            }
          >
            Upload Meme
          </NavLink>

          <NavLink
            to="/leaderboard"
            className={({ isActive }) =>
              `hover:text-blue-500 transition ${
                isActive ? "text-blue-500 font-semibold" : "text-gray-700 dark:text-gray-300"
              }`
            }
          >
            Leaderboard
          </NavLink>

          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `hover:text-blue-500 transition ${
                isActive ? "text-blue-500 font-semibold" : "text-gray-700 dark:text-gray-300"
              }`
            }
          >
            Profile
          </NavLink>

          {/* Dark Mode Toggle */}
          <DarkModeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
