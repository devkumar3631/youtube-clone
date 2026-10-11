import { useDispatch } from "react-redux";
import { addvidoes } from "../store/slices/videoSlice";

// const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
import video from "../utlis/videos.json";

export async function getPopularVideos() {
  console.log(video);

  // const dispatch = useDispatch();

  // const url = `{https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=IN&key=${API_KEY}}`;

  // const response = await fetch(url);

  // if (!response.ok) {
  //   const error = await response.json();
  //   console.error(error);

  //   throw new Error("Failed to fetch YouTube videos");
  // }

  // const result = response.json();

  // console.log(video);

  // const result = video.items;
  // console.log(result);

  // dispatch(addvidoes(result));
}
