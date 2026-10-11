import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";
const MAX_COMMENTS = 20;

const liveChatSlice = createSlice({
  name: "liveChat",
  initialState: [],
  reducers: {
    addLiveComment: (state, action) => {
      state.push(action.payload);

      if (state.length > MAX_COMMENTS) {
        state.shift();
      }
    },
  },
});

export const { addLiveComment } = liveChatSlice.actions;

export default liveChatSlice.reducer;
