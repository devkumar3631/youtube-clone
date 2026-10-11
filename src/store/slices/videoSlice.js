import { createSlice } from "@reduxjs/toolkit";

const videoSlice = createSlice({
  name: "video",
  initialState: null,
  reducers: {
    addvidoes: (state, action) => {
      // console.log(action.payload);
      // state.videos = action.payload;
      return action.payload;
    },
  },
});

export const { addvidoes } = videoSlice.actions;

export default videoSlice.reducer;
