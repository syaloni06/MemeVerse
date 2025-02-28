import { useEffect, useState } from "react";

const LeaderBoard = () => {
  const [topMemes, setTopMemes] = useState([]);
  const [userRankings, setUserRankings] = useState([]);

  useEffect(() => {
    // Get memes from localStorage
    const storedMemes = JSON.parse(localStorage.getItem("memes")) || [];

    // Get likes and comments count for each meme
    const memesWithEngagement = storedMemes.map((meme) => ({
      ...meme,
      likes: parseInt(localStorage.getItem(`likes_${meme.id}`)) || 0,
      comments: JSON.parse(localStorage.getItem(`comments_${meme.id}`)) || [],
    }));

    // Sort memes by likes (Descending Order) and take Top 10
    const sortedMemes = [...memesWithEngagement]
      .sort((a, b) => b.likes - a.likes)
      .slice(0, 10);
    setTopMemes(sortedMemes);

    // Rank users based on total engagement (Likes + Comments)
    const userStats = {};
    memesWithEngagement.forEach((meme) => {
      if (meme.user) {
        if (!userStats[meme.user]) {
          userStats[meme.user] = { likes: 0, comments: 0 };
        }
        userStats[meme.user].likes += meme.likes;
        userStats[meme.user].comments += meme.comments.length;
      }
    });

    // Convert to array, sort by engagement, and take Top 10
    const sortedUsers = Object.entries(userStats)
      .map(([username, { likes, comments }]) => ({
        username,
        engagement: likes + comments,
      }))
      .sort((a, b) => b.engagement - a.engagement)
      .slice(0, 10);
    
    setUserRankings(sortedUsers);
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-center mb-6">🏆 Leaderboard</h2>

      {/* Top 10 Most Liked Memes */}
      <div className="mb-8">
        <h3 className="text-2xl font-semibold mb-4">🔥 Top 10 Most Liked Memes</h3>
        {topMemes.length > 0 ? (
          <ul className="space-y-4">
            {topMemes.map((meme, index) => (
              <li key={meme.id} className="flex items-center gap-4 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg shadow">
                <span className="text-xl font-bold">{index + 1}.</span>
                <img src={meme.url} alt={meme.name} className="w-16 h-16 rounded" />
                <div>
                  <p className="font-semibold">{meme.name}</p>
                  <p className="text-gray-600 dark:text-gray-300">❤️ {meme.likes} Likes</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No memes ranked yet.</p>
        )}
      </div>

      {/* Top 10 Users Based on Engagement */}
      <div>
        <h3 className="text-2xl font-semibold mb-4">📊 Top 10 Users by Engagement</h3>
        {userRankings.length > 0 ? (
          <ul className="space-y-4">
            {userRankings.map((user, index) => (
              <li key={user.username} className="flex items-center gap-4 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg shadow">
                <span className="text-xl font-bold">{index + 1}.</span>
                <p className="font-semibold">{user.username}</p>
                <p className="text-gray-600 dark:text-gray-300">🔥 {user.engagement} Engagement</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No user rankings available.</p>
        )}
      </div>
    </div>
  );
};

export default LeaderBoard;
