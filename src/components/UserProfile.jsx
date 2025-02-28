import { useState, useEffect } from "react";

const UserProfile = () => {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [uploadedMemes, setUploadedMemes] = useState([]);
  const [likedMemes, setLikedMemes] = useState([]);

  useEffect(() => {
    // Load Profile Data from Local Storage
    const storedName = localStorage.getItem("profileName") || "Meme Lover";
    const storedBio = localStorage.getItem("profileBio") || "I love memes!";
    const storedProfilePic =
      localStorage.getItem("profilePic") ||
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIDEK1AcQ3iByimwosTbHZ5nxrAkoaj2u41Q&s";

    setName(storedName);
    setBio(storedBio);
    setProfilePic(storedProfilePic);

    // Load Uploaded Memes
    const storedMemes = JSON.parse(localStorage.getItem("uploadedmemes")) || [];
    setUploadedMemes(storedMemes);

    // Load Liked Memes
    const storedLikedMemes = JSON.parse(localStorage.getItem("likedMemes")) || [];
    setLikedMemes(storedLikedMemes);
  }, []);

  // Handle Profile Updates
  const handleProfileUpdate = () => {
    localStorage.setItem("profileName", name);
    localStorage.setItem("profileBio", bio);
    alert("Profile updated successfully!");
  };

  // Handle Profile Picture Upload
  const handleProfilePicUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfilePic(imageUrl);
      localStorage.setItem("profilePic", imageUrl);
    }
  };

  return (
    <div className="p-6 flex flex-col items-center">
      <h2 className="text-2xl font-bold">User Profile</h2>

      {/* Profile Section */}
      <div className="mt-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex flex-col items-center">
          {/* Profile Picture */}
          <label className="cursor-pointer">
            <img
              src={profilePic}
              alt="Profile"
              className="w-24 h-24 rounded-full border"
            />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleProfilePicUpload}
            />
          </label>

          {/* Name Input */}
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 text-lg font-bold text-center bg-transparent border-b focus:outline-none"
          />

          {/* Bio Input */}
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="mt-2 text-center bg-transparent border p-2 rounded w-full"
            placeholder="Write something about yourself..."
          />

          {/* Save Button */}
          <button
            onClick={handleProfileUpdate}
            className="mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Save Profile
          </button>
        </div>
      </div>

      {/* Uploaded Memes Section */}
      <div className="mt-6 w-full max-w-2xl">
        <h3 className="text-xl font-bold mb-2">Your Uploaded Memes</h3>
        {uploadedMemes.length === 0 ? (
          <p>No memes uploaded yet.</p>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {uploadedMemes.map((meme, index) => (
              <img
                key={index}
                src={meme.url}
                alt="Uploaded Meme"
                className="w-full rounded-lg shadow-lg"
              />
            ))}
          </div>
        )}
      </div>

      {/* Liked Memes Section */}
      <div className="mt-6 w-full max-w-2xl">
        <h3 className="text-xl font-bold mb-2">Your Liked Memes</h3>
        {likedMemes.length === 0 ? (
          <p>No liked memes yet.</p>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {likedMemes.map((meme, index) => (
              <img
                key={index}
                src={meme.url}
                alt="Liked Meme"
                className="w-full rounded-lg shadow-lg"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
