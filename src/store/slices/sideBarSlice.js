import { createSlice } from "@reduxjs/toolkit";

const sideBarSlice = createSlice({
  name: "sideBar",
  initialState: true,
  reducers: {
    toogleState: (state) => {
      return !state;
    },

    closeSideBar: () => {
      return false;
    },
  },
});

export const { toogleState, closeSideBar } = sideBarSlice.actions;

export default sideBarSlice.reducer;
