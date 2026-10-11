import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addvidoes } from "../store/slices/videoSlice";

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
import video from "../utlis/videos.json";

const usePopularVideos = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getPopularVideos = async () => {
      try {
        const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&key=${API_KEY}`;

        // const response = await fetch(url);

        // if (!response?.ok) {
        //   const error = await response.json();
        //   console.error("YouTube API Error:", error);
        //   throw new Error("Failed to fetch YouTube videos");
        // }

        // const result = await response.json();
        // console.log(result);

        const result = video;
        // console.log(result.items);

        dispatch(addvidoes(result.items));
      } catch (error) {
        console.error("Failed to fetch popular videos:", error);
      }
    };

    getPopularVideos();
  }, [dispatch]);
};

export default usePopularVideos;
