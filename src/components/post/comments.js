import React, { useState } from "react";
import { Link } from "react-router-dom";
import { formatDistance } from "date-fns";

import AddComment from "./add-comment";

export default function Comments({
  docId,
  comments: allComments,
  posted,
  commentInput,
  dateCreated,
}) {
 
  const [comments, setComments] = useState(allComments);
  const result = formatDistance(posted, new Date(), {
    addSuffix: true,
  });

  return (
    <>
      <div className="flex-col p-4 pt-2">
        {comments.length >= 3 && (
          <p className="text-sm text-gray-600 mb-1 cursor-pointer">
            See all {comments.length} comments
          </p>
        )}
        {comments.slice(0, 3).map((comment) => {
          return (
            <div
              className="mb-1"
              key={`${comment.comment}-${comment.displayName}`}
            >
              <Link
                to={`/p/${comment.displayName}`}
                className="font-bold mr-2 cursor-pointer"
              >
                {comment.displayName}
              </Link>
              <span>{comment.comment}</span>
            </div>
          );
        })}
        <p className="text-gray-600 uppercase text-xs mt-3">{result}</p>
      </div>
      <AddComment docId = {docId} commentInput={commentInput} comments={comments} setComments={setComments}/>
    </>
  );
}
