import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {},
  reducers: {
    cacheResult: (state, action) => {
      const { key, results } = action.payload;

      state[key] = results;
    },
  },
});

export const { cacheResult } = searchSlice.actions;

export default searchSlice.reducer;
