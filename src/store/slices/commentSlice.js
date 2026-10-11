import { createSlice } from "@reduxjs/toolkit";

const commentSlice = createSlice({
  name: "comments",
  initialState: [],
  reducers: {
    addComment: (state, action) => {
      console.log(action.payload);

      return action.payload;
    },
  },
});

export const { addComment } = commentSlice.actions;

export default commentSlice.reducer;
