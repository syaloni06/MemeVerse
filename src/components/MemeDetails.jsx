import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaHeart, FaRegHeart, FaShareAlt } from "react-icons/fa";

const MemeDetails = () => {
  const { id } = useParams();
  const [meme, setMeme] = useState(null);
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    // Fetch memes from local storage (simulating API fetch)
    const storedMemes = JSON.parse(localStorage.getItem("memes")) || [];
    const selectedMeme = storedMemes.find((m) => m.id === id);
    setMeme(selectedMeme);

    // Fetch likes & comments from local storage
    setLikes(parseInt(localStorage.getItem(`likes_${id}`)) || 0);
    setComments(JSON.parse(localStorage.getItem(`comments_${id}`)) || []);
  }, [id]);

  const handleLike = () => {
    const newLikes = likes + 1;
    setLikes(newLikes);
    localStorage.setItem(`likes_${id}`, newLikes);
  };

  const handleCommentSubmit = () => {
    if (newComment.trim() !== "") {
      const updatedComments = [...comments, newComment];
      setComments(updatedComments);
      localStorage.setItem(`comments_${id}`, JSON.stringify(updatedComments));
      setNewComment("");
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied to clipboard!");
  };

  if (!meme) return <p className="text-center">Loading meme...</p>;

  return (
    <div className="p-6 flex flex-col items-center">
      <h2 className="text-2xl font-bold">{meme.name}</h2>
      <img src={meme.url} alt={meme.name} className="mt-4 rounded-lg shadow-lg w-96" />

      {/* Like & Share Section */}
      <div className="flex items-center gap-4 mt-4">
        <button onClick={handleLike} className="flex items-center gap-1 text-red-500">
          {likes > 0 ? <FaHeart /> : <FaRegHeart />} {likes}
        </button>
        <button onClick={handleShare} className="text-blue-500">
          <FaShareAlt />
        </button>
      </div>

      {/* Comment Section */}
      <div className="mt-6 w-full max-w-md">
        <h3 className="text-lg font-bold mb-2">Comments</h3>
        <div className="flex gap-2">
          <input
            type="text"
            className="w-full p-2 border rounded"
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button
            onClick={handleCommentSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Post
          </button>
        </div>

        <ul className="mt-4">
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <li key={index} className="p-2 border-b">
                {comment}
              </li>
            ))
          ) : (
            <p className="text-gray-500">No comments yet.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default MemeDetails;
