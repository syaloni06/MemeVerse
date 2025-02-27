/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import axios from "axios";

const Explore = () => {
  const [memes, setMemes] = useState([]);
  const [page, setPage] = useState(1);

  const fetchMoreMemes = async () => {
    const res = await axios.get(`https://api.imgflip.com/get_memes?page=${page}`);
    setMemes([...memes, ...res.data.data.memes]);
    setPage(page + 1);
  };

  useEffect(() => {
    fetchMoreMemes();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Explore Memes</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        {memes.map((meme) => (
          <img key={meme.id} src={meme.url} alt={meme.name} className="rounded-lg shadow-md" />
        ))}
      </div>
      <button onClick={fetchMoreMemes} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
        Load More
      </button>
    </div>
  );
};

export default Explore;
