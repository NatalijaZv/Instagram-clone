import { getFirestore, doc, updateDoc, arrayUnion } from "firebase/firestore";
import React, { useState } from "react";
import { firebase } from "../../lib/firebase";
import { Link } from "react-router-dom";
import { updateMyFollowing, updateFollowedUsersFollowers } from "../../services/firebase";

//userDocId
export default function SuggestedProfile({
  userId,
  userDocId,
  username,
  myDocId,
  myUserId,
  profilePhoto
}) {
  const [follow, setFollow] = useState(false);
  async function handleFollowUser() {
    setFollow((prev) => !prev);
    await updateMyFollowing(userId,myDocId,follow)
    await updateFollowedUsersFollowers(myUserId,userDocId,follow)
  }

  return !follow ? (
    <div className="flex flex-row items-center justify-between mb-3">
      <div className="flex items-center justify-between ">
        <img
          className="w-8 h-8 object-cover rounded-full mr-3"
          src={profilePhoto}
          alt="Profile picture"
        />
        <Link className=" items-center" to={`/p/${username}`}>
          <p className="font-bold text-sm">{username}</p>
        </Link>
      </div>
      <div className="flex">
        <button
          onClick={handleFollowUser}
          className="font-bold text-blue-500 text-xs"
        >
          Follow
        </button>
      </div>
    </div>
  ) : null;
}
