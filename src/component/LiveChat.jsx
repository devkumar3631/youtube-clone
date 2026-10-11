import React, { useEffect, useRef, useState } from "react";
import { Send, Radio } from "lucide-react";
import LiveComment from "./LiveComment";

import { useDispatch, useSelector } from "react-redux";
import { addLiveComment } from "../store/slices/liveChatSlice";

import { generateName, generateId } from "../utlis/utilityFunction";

const LiveChat = () => {
  const dispatch = useDispatch();

  const comments = useSelector((store) => store.liveChat);

  const [message, setMessage] = useState("");

  const commentsContainerRef = useRef(null);

  /*
   * --------------------------------
   * Simulated API Polling
   * --------------------------------
   */

  useEffect(() => {
    const intervalId = setInterval(() => {
      const name = generateName();
      const text = generateId(15);

      dispatch(
        addLiveComment({
          id: text,
          name,
          text,
        }),
      );
    }, 500);

    return () => {
      clearInterval(intervalId);
    };
  }, [dispatch]);

  /*
   * --------------------------------
   * Automatically scroll to newest
   * comment
   * --------------------------------
   */

  useEffect(() => {
    const container = commentsContainerRef.current;

    if (!container) return;

    container.scrollTop = container.scrollHeight;
  }, [comments]);

  /*
   * --------------------------------
   * Add user comment
   * --------------------------------
   */

  const handleSend = () => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage) return;

    dispatch(
      addLiveComment({
        id: `${Date.now()}-${Math.random()}`,
        name: "dev",
        text: trimmedMessage,
      }),
    );

    setMessage("");
  };

  /*
   * --------------------------------
   * Enter key
   * --------------------------------
   */

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      className="
        w-full
        h-[450px]
        sm:h-[500px]
        lg:h-[450px]
        xl:h-[500px]

        flex
        flex-col

        bg-white
        border
        border-gray-200

        rounded-xl
        overflow-hidden

        shadow-sm
      "
    >
      {/* =========================
          Header
      ========================== */}

      <div
        className="
          flex
          items-center
          justify-between

          px-4
          py-3

          border-b
          border-gray-200

          bg-white
          shrink-0
        "
      >
        {/* Title */}

        <div className="flex items-center gap-2">
          <Radio size={18} className="text-red-500" />

          <h2 className="font-semibold text-gray-900">Live Chat</h2>
        </div>

        {/* Live indicator */}

        <span
          className="
            flex
            items-center
            gap-1.5

            text-xs
            text-red-500
            font-medium
          "
        >
          <span
            className="
              w-2
              h-2
              rounded-full
              bg-red-500
              animate-pulse
            "
          />
          LIVE
        </span>
      </div>

      {/* =========================
          Comments
      ========================== */}

      <div
        ref={commentsContainerRef}
        className="
          flex-1

          overflow-y-auto

          py-2

          scrollbar-thin
          scrollbar-thumb-gray-300
          scrollbar-track-transparent

          overscroll-contain
        "
      >
        {comments.map((comment) => (
          <LiveComment
            key={comment.id}
            name={comment.name}
            text={comment.text}
          />
        ))}
      </div>

      {/* =========================
          Input
      ========================== */}

      <div
        className="
          border-t
          border-gray-200

          p-3

          bg-white

          shrink-0
        "
      >
        <div className="flex items-center gap-2">
          {/* Input */}

          <input
            type="text"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Say something..."
            className="
              flex-1

              min-w-0

              px-4
              py-2.5

              text-sm

              bg-gray-100

              rounded-full

              outline-none

              border
              border-transparent

              focus:border-red-400
              focus:ring-2
              focus:ring-red-100

              focus:bg-white

              transition
            "
          />

          {/* Send */}

          <button
            onClick={handleSend}
            disabled={!message.trim()}
            aria-label="Send message"
            className="
              w-10
              h-10

              shrink-0

              flex
              items-center
              justify-center

              rounded-full

              bg-red-500
              text-white

              hover:bg-red-600

              disabled:bg-gray-300
              disabled:cursor-not-allowed

              transition
            "
          >
            <Send size={17} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LiveChat;
