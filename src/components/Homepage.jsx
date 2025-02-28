import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMemes } from "../utils/memeSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { memes, loading } = useSelector((state) => state.memes);

  useEffect(() => {
    dispatch(fetchMemes());
  }, [dispatch]);

  useEffect(() => {
    // Store memes in localStorage for details page
    if (memes.length > 0) {
      localStorage.setItem("memes", JSON.stringify(memes));
    }
  }, [memes]);

  return (
    <div className="p-6 bg-white dark:bg-black">
      <h2 className="text-2xl font-bold">Trending Memes</h2>
      {loading ? <p>Loading...</p> : null}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        {memes.map((meme) => (
          <Link key={meme.id} to={`/meme/${meme.id}`}>
          <div key={meme.id} className="rounded-lg shadow-md overflow-hidden">
            <img src={meme.url} alt={meme.name} className="w-full h-48 object-cover" />
            <p className="text-center font-semibold p-2 dark:text-white">{meme.name}</p>
          </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
