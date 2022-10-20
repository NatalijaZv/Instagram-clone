import React, { useState, useContext } from "react";
import UserContext from "../../context/user";
import FirebaseContext from "../../context/firebase";
import { doc, getFirestore, updateDoc, arrayUnion } from "firebase/firestore";

export default function AddComment({
  comments,
  setComments,
  docId,
  commentInput,
}) {
  const {
    user: { displayName },
  } = useContext(UserContext);
  const [currentComment, setCurrentComment] = useState("");
  const { firebase } = useContext(FirebaseContext);

  const handleSubmitComment = async (event) => {
    event.preventDefault();
    setComments((comments) => [
      { comment: currentComment, displayName: displayName },
      ...comments,
    ]);
    setCurrentComment("");
    const db = getFirestore(firebase);
    const dbRef = doc(db, "photos", docId);
    await updateDoc(dbRef, {
      comments: arrayUnion({
        comment: currentComment,
        displayName: displayName,
      }),
    });
  };

  return (
    <div className="border-t border-gray ">
      <form onSubmit={(e) =>(currentComment.length >=3 ?handleSubmitComment(e):e.preventDefault())} className="flex justify-between ">
        <input
          aria-label="Add a comment"
          rows="3"
          autoComplete="off "
          className="w-full text-sm text-gray mr-3 py-5 px-4 flex-wrap"
          type="text"
          value={currentComment}
          name="currentComment"
          placeholder="Add a comment..."
          onChange={(e) => setCurrentComment(e.target.value)}
          ref={commentInput}
        />
        <button
          className={`text-blue-600 font-bold text-sm pr-4 ${currentComment.length < 3?"opacity-25 cursor-not-allowed":"none"             
          }`}
          disabled={currentComment.length < 3} 
        >
          Post
        </button>
      </form>
    </div>
  );
}
