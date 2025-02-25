import { useEffect, useState } from "react";
import { MdWbSunny } from "react-icons/md";
import { MdNightsStay } from "react-icons/md";
const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <button onClick={() => setDarkMode(!darkMode)} className="p-2">
      {darkMode ? (
        <MdWbSunny className="text-3xl text-yellow-400" />
      ) : (
        <MdNightsStay className="text-3xl" />
      )}
    </button>
  );
};

export default DarkModeToggle;