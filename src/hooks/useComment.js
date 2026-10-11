import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addComment } from "../store/slices/commentSlice";

const useComment = (videoId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!videoId) return;

    const fetchComments = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet,replies&videoId=${videoId}&maxResults=20&textFormat=plainText&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch comments");
        }

        const data = await response.json();

        // console.log("Comments:", data);

        const comments = data.items.map((thread) => {
          const topComment = thread.snippet.topLevelComment;

          return {
            id: topComment.id,

            authorDisplayName: topComment.snippet.authorDisplayName,

            authorProfileImageUrl: topComment.snippet.authorProfileImageUrl,

            textDisplay: topComment.snippet.textDisplay,

            likeCount: topComment.snippet.likeCount,

            replies:
              thread.replies?.comments?.map((reply) => ({
                id: reply.id,

                authorDisplayName: reply.snippet.authorDisplayName,

                authorProfileImageUrl: reply.snippet.authorProfileImageUrl,

                textDisplay: reply.snippet.textDisplay,

                likeCount: reply.snippet.likeCount,

                replies: [],
              })) || [],
          };
        });

        dispatch(addComment(comments || []));
      } catch (error) {
        console.error("Comment API error:", error);
      }
    };

    fetchComments();
  }, [videoId, dispatch]);
};

export default useComment;
