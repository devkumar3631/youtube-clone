import { configureStore } from "@reduxjs/toolkit";
import videoSlice from "./slices/videoSlice";
import sideBarSlice from "./slices/sideBarSlice";
import searchSlice from "./slices/searchSlice";
import commentSlice from "./slices/commentSlice";
import liveChatSlice from "./slices/liveChatSlice";

const appStore = configureStore({
  reducer: {
    video: videoSlice,
    sidebar: sideBarSlice,
    search: searchSlice,
    comments: commentSlice,
    liveChat: liveChatSlice,
  },
});

export default appStore;
