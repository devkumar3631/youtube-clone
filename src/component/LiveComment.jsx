import React from "react";
import { UserRound } from "lucide-react";

const LiveComment = ({ name, text }) => {
  return (
    <div className="flex items-start gap-2 px-3 py-2 hover:bg-gray-50 transition-colors">
      {/* Avatar */}
      <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
        <UserRound size={16} className="text-gray-500" />
      </div>

      {/* Comment */}
      <p className="text-sm leading-5 text-gray-700">
        <span className="font-semibold text-gray-900 mr-2">{name}</span>

        {text}
      </p>
    </div>
  );
};

export default LiveComment;
