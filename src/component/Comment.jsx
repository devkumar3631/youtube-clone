import React, { useState } from "react";
import { useSelector } from "react-redux";
import { UserRound, ThumbsUp, ThumbsDown } from "lucide-react";

const Avatar = ({ src, name }) => {
  const [imageError, setImageError] = useState(false);

  // No image OR image failed to load
  if (!src || imageError) {
    return (
      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
        <UserRound className="w-5 h-5 text-gray-500" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={name}
      onError={() => setImageError(true)}
      className="w-10 h-10 rounded-full object-cover shrink-0"
    />
  );
};

const CommentItem = ({ comment, level = 0 }) => {
  const {
    authorDisplayName,
    authorProfileImageUrl,
    textDisplay,
    likeCount,
    replies,
  } = comment;

  return (
    <div className="relative">
      {/* Current comment */}
      <div className="flex gap-3 py-3">
        {/* Avatar */}
        <Avatar src={authorProfileImageUrl} name={authorDisplayName} />

        {/* Comment content */}
        <div className="flex flex-col min-w-0">
          {/* Author */}
          <span className="font-semibold text-sm">{authorDisplayName}</span>

          {/* Comment */}
          <p className="text-sm mt-1 break-words">{textDisplay}</p>

          {/* Actions */}
          <div className="flex items-center gap-4 mt-2">
            <button className="flex items-center gap-1 text-sm hover:bg-gray-100 rounded-full px-2 py-1">
              <ThumbsUp className="w-4 h-4" />
              <span>{likeCount || 0}</span>
            </button>

            <button className="flex items-center justify-center text-sm hover:bg-gray-100 rounded-full p-2">
              <ThumbsDown className="w-4 h-4" />
            </button>

            <button className="text-sm font-medium hover:bg-gray-100 rounded-full px-3 py-2">
              Reply
            </button>
          </div>
        </div>
      </div>

      {/* Replies */}
      {replies?.length > 0 && (
        <div className="relative ml-5 pl-8 border-l border-gray-300">
          {replies.map((reply) => (
            <div key={reply.id} className="relative">
              {/* Horizontal connector */}
              <span
                className="
                  absolute
                  -left-8
                  top-8
                  w-8
                  border-t
                  border-gray-300
                "
              />

              <CommentItem comment={reply} level={level + 1} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// const comments = [
//   {
//     authorDisplayName: "dev kumar",
//     authorProfileImageUrl: "",
//     textDisplay: "my name is dev kumar prajapati",
//     likeCount: 100,
//     replies: [
//       {
//         authorDisplayName: "dev kumar",
//         authorProfileImageUrl: "",
//         textDisplay: "my name is dev kumar prajapati",
//         likeCount: 100,
//         replies: [
//           {
//             authorDisplayName: "dev kumar",
//             authorProfileImageUrl: "",
//             textDisplay: "my name is dev kumar prajapati",
//             likeCount: 100,
//             replies: [
//               {
//                 authorDisplayName: "dev kumar",
//                 authorProfileImageUrl: "",
//                 textDisplay: "my name is dev kumar prajapati",
//                 likeCount: 100,
//                 replies: [],
//               },
//             ],
//           },
//           {
//             authorDisplayName: "dev kumar",
//             authorProfileImageUrl: "",
//             textDisplay: "my name is dev kumar prajapati",
//             likeCount: 100,
//             replies: [],
//           },
//           {
//             authorDisplayName: "dev kumar",
//             authorProfileImageUrl: "",
//             textDisplay: "my name is dev kumar prajapati",
//             likeCount: 100,
//             replies: [],
//           },
//         ],
//       },
//       {
//         authorDisplayName: "dev kumar",
//         authorProfileImageUrl: "",
//         textDisplay: "my name is dev kumar prajapati",
//         likeCount: 100,
//         replies: [
//           {
//             authorDisplayName: "dev kumar",
//             authorProfileImageUrl: "",
//             textDisplay: "my name is dev kumar prajapati",
//             likeCount: 100,
//             replies: [
//               {
//                 authorDisplayName: "dev kumar",
//                 authorProfileImageUrl: "",
//                 textDisplay: "my name is dev kumar prajapati",
//                 likeCount: 100,
//                 replies: [
//                   {
//                     authorDisplayName: "dev kumar",
//                     authorProfileImageUrl: "",
//                     textDisplay: "my name is dev kumar prajapati",
//                     likeCount: 100,
//                     replies: [
//                       {
//                         authorDisplayName: "dev kumar",
//                         authorProfileImageUrl: "",
//                         textDisplay: "my name is dev kumar prajapati",
//                         likeCount: 100,
//                         replies: [
//                           {
//                             authorDisplayName: "dev kumar",
//                             authorProfileImageUrl: "",
//                             textDisplay: "my name is dev kumar prajapati",
//                             likeCount: 100,
//                             replies: [
//                               {
//                                 authorDisplayName: "dev kumar",
//                                 authorProfileImageUrl: "",
//                                 textDisplay: "my name is dev kumar prajapati",
//                                 likeCount: 100,
//                                 replies: [
//                                   {
//                                     authorDisplayName: "dev kumar",
//                                     authorProfileImageUrl: "",
//                                     textDisplay:
//                                       "my name is dev kumar prajapati",
//                                     likeCount: 100,
//                                     replies: [],
//                                   },
//                                 ],
//                               },
//                             ],
//                           },
//                         ],
//                       },
//                     ],
//                   },
//                 ],
//               },
//             ],
//           },
//         ],
//       },
//       {
//         authorDisplayName: "dev kumar",
//         authorProfileImageUrl: "",
//         textDisplay: "my name is dev kumar prajapati",
//         likeCount: 100,
//         replies: [],
//       },
//     ],
//   },
//   {
//     authorDisplayName: "dev kumar",
//     authorProfileImageUrl: "",
//     textDisplay: "my name is dev kumar prajapati",
//     likeCount: 100,
//     replies: [],
//   },
//   {
//     authorDisplayName: "dev kumar",
//     authorProfileImageUrl: "",
//     textDisplay: "my name is dev kumar prajapati",
//     likeCount: 100,
//     replies: [
//       {
//         authorDisplayName: "dev kumar",
//         authorProfileImageUrl: "",
//         textDisplay: "my name is dev kumar prajapati",
//         likeCount: 100,
//         replies: [
//           {
//             authorDisplayName: "dev kumar",
//             authorProfileImageUrl: "",
//             textDisplay: "my name is dev kumar prajapati",
//             likeCount: 100,
//             replies: [
//               {
//                 authorDisplayName: "dev kumar",
//                 authorProfileImageUrl: "",
//                 textDisplay: "my name is dev kumar prajapati",
//                 likeCount: 100,
//                 replies: [
//                   {
//                     authorDisplayName: "dev kumar",
//                     authorProfileImageUrl: "",
//                     textDisplay: "my name is dev kumar prajapati",
//                     likeCount: 100,
//                     replies: [],
//                   },
//                 ],
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },
//   {
//     authorDisplayName: "dev kumar",
//     authorProfileImageUrl: "",
//     textDisplay: "my name is dev kumar prajapati",
//     likeCount: 100,
//     replies: [],
//   },
//   {
//     authorDisplayName: "dev kumar",
//     authorProfileImageUrl: "",
//     textDisplay: "my name is dev kumar prajapati",
//     likeCount: 100,
//     replies: [
//       {
//         authorDisplayName: "dev kumar",
//         authorProfileImageUrl: "",
//         textDisplay: "my name is dev kumar prajapati",
//         likeCount: 100,
//         replies: [],
//       },
//     ],
//   },
// ];

const Comment = () => {
  const comments = useSelector((store) => store.comments);

  return (
    <section className="w-full">
      <h2 className="text-xl font-semibold mb-4">Comments</h2>

      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </section>
  );
};

export default Comment;
