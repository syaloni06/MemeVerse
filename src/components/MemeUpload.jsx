import { useState, useEffect } from "react";
import { FaUpload, FaImage, FaCheck } from "react-icons/fa";
import axios from "axios";

const MemeUpload = () => {
  const [selectedImage, setSelectedImage] = useState(null); // Uploaded Image File
  const [previewImage, setPreviewImage] = useState(""); // Preview URL for uploaded image
  const [caption, setCaption] = useState(""); // Caption text
  const [memeURL, setMemeURL] = useState(""); // Final Meme URL (Uploaded or Generated)
  const [isUploading, setIsUploading] = useState(false);

  // ImgBB API Key (Replace with your actual API key)
  const IMGBB_API_KEY = "e63faa73d4d116cd896a698d709e2e9a";  

  // Load stored memes from local storage
  useEffect(() => {
    const storedMemes = JSON.parse(localStorage.getItem("memes")) || [];
    console.log("Stored Memes:", storedMemes);
  }, []);

  // Handle Image Selection
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file)); // Show preview of uploaded image
      setMemeURL(""); // Reset generated meme URL when selecting an image
    }
  };

  // Generate Meme URL using Meme Generator API
  const generateMeme = () => {
    if (!caption) return alert("Please enter a caption!");

    const text = caption.split(" ").join("_"); // Convert spaces to underscores
    const memeTemplate = "custom"; // Use 'custom' for user-uploaded images
    const generatedMemeURL = `https://memegen.link/${memeTemplate}/${text}.jpg`;

    setMemeURL(generatedMemeURL);
    setSelectedImage(null); // Remove uploaded image when generating a meme
    setPreviewImage(""); // Remove uploaded image preview
  };

  // Upload Meme to ImgBB
  const handleUpload = async () => {
    if (!selectedImage && !memeURL) return alert("Please upload or generate a meme!");

    setIsUploading(true);

    let finalImageURL = memeURL; // Default to generated meme URL

    // If an image was uploaded, upload it to ImgBB
    if (selectedImage) {
      const formData = new FormData();
      formData.append("image", selectedImage);

      try {
        const response = await axios.post(
          `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
          formData
        );
        finalImageURL = response.data.data.url;
      } catch (error) {
        console.error("Error uploading to ImgBB:", error);
        alert("Failed to upload meme!");
        setIsUploading(false);
        return;
      }
    }

    // Save Meme to Local Storage
    const storedMemes = JSON.parse(localStorage.getItem("uploadedmemes")) || [];
    const newMeme = { url: finalImageURL, caption, timestamp: Date.now() };
    localStorage.setItem("uploadedmemes", JSON.stringify([newMeme, ...storedMemes]));

    alert("Meme uploaded successfully!");
    setIsUploading(false);
    setMemeURL(""); 
    setSelectedImage(null);
    setPreviewImage("");
    setCaption("");
  };

  return (
    <div className="p-6 flex flex-col items-center">
      <h2 className="text-2xl font-bold">Upload or Generate a Meme</h2>

      <div className="mt-4 w-full max-w-md bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
        {/* Image Upload */}
        <label className="cursor-pointer flex flex-col items-center p-4 border-dashed border-2 border-gray-400 rounded-lg">
          <FaImage className="text-gray-400 text-4xl" />
          <span className="mt-2 text-gray-600 dark:text-gray-300">
            {selectedImage ? "Change Image" : "Click to Upload"}
          </span>
          <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
        </label>

        {/* Show Meme Preview (Uploaded or Generated) */}
        {(previewImage || memeURL) && (
          <img
            src={previewImage || memeURL}
            alt="Meme Preview"
            className="mt-4 rounded-lg w-full"
          />
        )}

        {/* Caption Input */}
        <div className="mt-4">
          <input
            type="text"
            placeholder="Add a funny caption..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Generate Meme Button */}
        <button
          onClick={generateMeme}
          className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full"
        >
          Generate Meme
        </button>

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          disabled={isUploading}
          className={`mt-4 px-6 py-2 flex items-center justify-center gap-2 rounded bg-blue-500 text-white w-full ${
            isUploading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
          }`}
        >
          {isUploading ? "Uploading..." : "Upload Meme"}
          {isUploading ? <FaCheck /> : <FaUpload />}
        </button>
      </div>
    </div>
  );
};

export default MemeUpload;
