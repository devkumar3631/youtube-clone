import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { closeSideBar } from "../store/slices/sideBarSlice";
import { useSearchParams } from "react-router";
import useComment from "../hooks/useComment";
import Comment from "./Comment";
import LiveChat from "./LiveChat";

const Watch = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(closeSideBar());
  }, [dispatch]);

  const [searchParam] = useSearchParams();
  const id = searchParam.get("v");

  useComment(id);

  return (
    <main className="w-full px-4 sm:px-6 lg:px-8 py-6">
      <div className="max-w-[1500px] mx-auto">
        {/* Video + Live Chat */}
        <div className="flex flex-col xl:flex-row gap-6">
          {/* Video Section */}
          <div className="w-full xl:flex-1">
            <div className="relative w-full aspect-video overflow-hidden rounded-xl bg-black shadow-md">
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${id}?si=LXRgmhWQ8uXiti8z`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>

          {/* Live Chat */}
          <div className="w-full xl:w-[380px] 2xl:w-[420px] shrink-0">
            <LiveChat />
          </div>
        </div>

        {/* Comments */}
        <section className="mt-8">
          <Comment />
        </section>
      </div>
    </main>
  );
};

export default Watch;
