import { configureStore } from "@reduxjs/toolkit";
import memeReducer from "./memeSlice"

// Configure the Redux store
const appStore = configureStore({
  reducer: {
    // Combine the reducers into a single root reducer
    memes: memeReducer, // Add the video slice to handle video-related state
  },
});

export default appStore; // Export the store for use throughout the application