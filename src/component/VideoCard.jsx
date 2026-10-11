import React from "react";
import { MoreVertical } from "lucide-react";
import { Navigate, useNavigate } from "react-router";

const VideoCard = ({ video }) => {
  const { id, snippet, statistics } = video;

  const { title, channelTitle, thumbnails, publishedAt } = snippet;

  const formatViews = (views) => {
    const count = Number(views);

    if (count >= 1_000_000) {
      return `${(count / 1_000_000).toFixed(1)}M views`;
    }

    if (count >= 1_000) {
      return `${(count / 1_000).toFixed(1)}K views`;
    }

    return `${count} views`;
  };

  const formatPublishedDate = (date) => {
    const published = new Date(date);
    const now = new Date();

    const seconds = Math.floor((now - published) / 1000);

    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (years > 0) return `${years} year${years > 1 ? "s" : ""} ago`;
    if (months > 0) return `${months} month${months > 1 ? "s" : ""} ago`;
    if (weeks > 0) return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
    if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""}`;

    return "Just now";
  };

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/watch?v=${video.id}`);
  };

  return (
    <article className="group min-w-0 cursor-pointer" onClick={handleClick}>
      {/* Thumbnail */}
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-gray-200">
        <img
          src={
            thumbnails?.high?.url ||
            thumbnails?.medium?.url ||
            thumbnails?.default?.url
          }
          alt={title}
          loading="lazy"
          className="
            h-full
            w-full
            object-cover
            transition-transform
            duration-200
            group-hover:scale-[1.02]
          "
        />

        {/* Hover overlay */}
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-black/0
            transition-colors
            duration-200
            group-hover:bg-black/5
          "
        />
      </div>

      {/* Information */}
      <div className="mt-3 flex gap-3">
        {/* Channel avatar */}
        <div className="flex-shrink-0">
          <div
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              overflow-hidden
              rounded-full
              bg-gray-200
            "
          >
            <span className="text-sm font-semibold text-gray-600">
              {channelTitle?.charAt(0)?.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Text */}
        <div className="min-w-0 flex-1">
          {/* Title + menu */}
          <div className="flex items-start">
            <h3
              title={title}
              className="
                line-clamp-2
                min-w-0
                flex-1
                pr-2
                text-sm
                font-semibold
                leading-5
                text-gray-900
              "
            >
              {title}
            </h3>

            <button
              type="button"
              aria-label="More options"
              onClick={(e) => e.stopPropagation()}
              className="
                flex
                h-8
                w-8
                flex-shrink-0
                items-center
                justify-center
                rounded-full
                hover:bg-gray-100
              "
            >
              <MoreVertical size={19} />
            </button>
          </div>

          {/* Channel */}
          <p className="mt-1.5 truncate text-sm text-gray-600">
            {channelTitle}
          </p>

          {/* Metadata */}
          <p className="mt-0.5 text-sm text-gray-600">
            {formatViews(statistics?.viewCount)} •{" "}
            {formatPublishedDate(publishedAt)}
          </p>
        </div>
      </div>
    </article>
  );
};

export default VideoCard;
