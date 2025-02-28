import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchMemes = createAsyncThunk("memes/fetchMemes", async () => {
  const res = await axios.get("https://api.imgflip.com/get_memes");
  return res.data.data.memes;
});

const memeSlice = createSlice({
  name: "memes",
  initialState: { memes: [], loading: false },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMemes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMemes.fulfilled, (state, action) => {
        state.loading = false;
        state.memes = action.payload;
      });
  },
});

export default memeSlice.reducer;
