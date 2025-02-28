/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { FaSearch, FaSortAmountUp, FaSortAmountDown } from "react-icons/fa";
import { debounce } from "lodash";

const Explore = () => {
  const [memes, setMemes] = useState([]);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMemes, setFilteredMemes] = useState([]);
  const [sortOrder, setSortOrder] = useState("desc"); // "desc" or "asc"
  const [category, setCategory] = useState("trending");

  // Fetch Memes from API
  const fetchMemes = async () => {
    try {
      const res = await axios.get(`https://api.imgflip.com/get_memes`);
      const newMemes = res.data.data.memes;

      setMemes((prev) => [...prev, ...newMemes]);
      setFilteredMemes(newMemes);
    } catch (error) {
      console.error("Error fetching memes:", error);
    }
  };

  // Fetch More Memes (Infinite Scroll)
  const fetchMoreMemes = () => {
    setPage((prev) => prev + 1);
    fetchMemes();
  };

  useEffect(() => {
    fetchMemes();
  }, []);

  // Handle Category Change
  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    if (newCategory === "trending") {
      setFilteredMemes([...memes].sort((a, b) => b.likes - a.likes));
    } else if (newCategory === "new") {
      setFilteredMemes([...memes].reverse()); // Simulating 'new' memes
    } else if (newCategory === "classic") {
      setFilteredMemes([...memes].slice(0, 10)); // Example for 'classic' memes
    } else {
      setFilteredMemes([...memes]); // Random
    }
  };

  // Sort Memes
  const handleSort = () => {
    setSortOrder(sortOrder === "desc" ? "asc" : "desc");
    setFilteredMemes([...filteredMemes].sort((a, b) => 
      sortOrder === "desc" ? b.likes - a.likes : a.likes - b.likes
    ));
  };

  // Debounced Search Function
  const debouncedSearch = useCallback(
    debounce((query) => {
      if (query) {
        setFilteredMemes(memes.filter((meme) => meme.name.toLowerCase().includes(query.toLowerCase())));
      } else {
        setFilteredMemes(memes);
      }
    }, 500),
    [memes]
  );

  // Handle Search Input Change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    debouncedSearch(e.target.value);
  };

  return (
    <div className="p-6 bg-white dark:bg-black">
      <h2 className="text-2xl font-bold text-center">🎭 Explore Memes</h2>

      {/* Search Bar */}
      <div className="flex items-center gap-2 my-4">
        <FaSearch className="text-gray-500" />
        <input
          type="text"
          placeholder="Search memes..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Filter Buttons */}
      <div className="flex justify-center gap-4 my-4">
        {["trending", "new", "classic", "random"].map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className={`px-4 py-2 rounded ${
              category === cat ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Sort Button */}
      <button onClick={handleSort} className="mb-4 flex items-center gap-2 px-4 py-2 bg-gray-300 rounded">
        {sortOrder === "desc" ? <FaSortAmountDown /> : <FaSortAmountUp />}
        Sort by Likes
      </button>

      {/* Meme Grid */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        {filteredMemes.map((meme) => (
          <div key={meme.id} className="rounded-lg shadow-md overflow-hidden">
            <img src={meme.url} alt={meme.name} className="w-full h-48" />
            <p className="text-center font-semibold p-2">{meme.name}</p>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      <button onClick={fetchMoreMemes} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
        Load More
      </button>
    </div>
  );
};

export default Explore;
