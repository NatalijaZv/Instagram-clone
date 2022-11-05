import React, { memo, useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { getSuggestedProfiles } from "../../services/firebase";
import SuggestedProfile from "./suggested-profile";

function Suggestions({ userId, following, docId, myProfilePhoto }) {
  const [profiles, setProfile] = useState(null);
  useEffect(() => {
    async function suggestedProfiles() {
      const response = await getSuggestedProfiles(userId, following);
      setProfile(response);
    }
    if (userId) {
      suggestedProfiles();
    }
  }, [userId, following]);
  return !profiles ? (
    <Skeleton h={150} cound={1} className="mt-5" />
  ) : profiles.length > 0 ? (
    <div className="flex flex-col">
      <p className="text-sm font-bold text-gray-500 mb-4">
        Suggestions for you
      </p>
      {profiles.map((profil) => {
        console.log(profil.docId, profil.username);
        return (
          <SuggestedProfile
            key={profil.docId}
            userId={profil.userId}
            userDocId={profil.docId}
            username={profil.username}
            myDocId={docId}
            myUserId={userId}
            profilePhoto={profil.profilePhoto}
          />
        );
      })}
    </div>
  ) : null;
}

export default memo(Suggestions);
