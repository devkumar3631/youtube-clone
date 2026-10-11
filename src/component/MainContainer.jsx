import React from "react";
import { useSelector } from "react-redux";
import VideoCard from "./VideoCard";
import VideoContainer from "./videoContainer";

const MainContainer = () => {
  // const video = useSelector((store) => store.videos);
  return (
    <main className="min-w-0 flex-1">
      <VideoContainer />;
    </main>
  );
};

export default MainContainer;
