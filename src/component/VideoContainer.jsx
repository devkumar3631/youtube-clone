import React from "react";
import { useSelector } from "react-redux";
import VideoCard from "./VideoCard";

const VideoContainer = () => {
  const videos = useSelector((store) => store.video);

  if (!videos?.length) {
    return null;
  }

  return (
    <section className="w-full px-4 py-6 sm:px-6 lg:px-8">
      <div
        className="
          grid
          grid-cols-1
          gap-x-4
          gap-y-8
          sm:grid-cols-2
          md:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
          2xl:grid-cols-5
        "
      >
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </section>
  );
};

export default VideoContainer;
