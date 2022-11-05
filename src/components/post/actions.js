import React, { useState, useContext } from "react";
import FirebaseContext from "../../context/firebase";
import UserContext from "../../context/user";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getFirestore,
  updateDoc,
} from "firebase/firestore";


export default function Actions({
  docId,
  totalLikes,
  userLikedPhoto,
  handleFocus,
}) {
  const [toggleLike, setToggleLike] = useState(userLikedPhoto);
  const [likes, setLikes] = useState(totalLikes);
  const { firebase } = useContext(FirebaseContext);
  const { user } = useContext(UserContext);
  const userId = user.uid;

  async function handleToggleLike() {
    setToggleLike((toggleLike) => !toggleLike);
    const db = getFirestore(firebase);
    const dbRef = doc(db, "photos", docId);
    if (!toggleLike) {
      await updateDoc(dbRef, { likes: arrayUnion(userId) });
    } else {
      await updateDoc(dbRef, { likes: arrayRemove(userId) });
    }
    setLikes((likes) => (toggleLike ? likes - 1 : likes + 1));
  }

  return (
    <>
      <div className="flex justify-between p-4">
        <div className="flex">
          <svg
            onClick={handleToggleLike}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleToggleLike();
              }
            }}
            className={`w-8 mr-4 select-none cursor-pointer ${
              toggleLike ? "fill-red text-red-600" : "text-black"
            }`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={toggleLike ? "red" : "none"}
            stroke={toggleLike ? "none" : "black"}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
          <svg
            onClick={handleFocus}
            onKeyDown={(e) => {
                if(e.key = "Enter"){
                    handleFocus()
                }
            }}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 mr-4 select-none cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
            />
          </svg>
        </div>
      </div>
      <div className="px-4">
        <p className="font-bold">
          {likes === 1 ? `${likes} like` : `${likes} likes`}
        </p>
      </div>
    </>
  );
}
