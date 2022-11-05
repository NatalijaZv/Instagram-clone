import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import useUser from "../../hooks/use-user";
import { toggleFollow } from "../../services/firebase";
import { isUserFollowingProfile } from "../../services/firebase";

export default function Header({
  photosCount,
  profile,
  followerCount,
  setFollowerCount,
  username,
}) {
  const { user } = useUser();
  console.log(profile);

  const [isFollowingProfile, setIsFollowingProfile] = useState(false);
  const isFollowBtnActive = user.username && user.username !== username;

  async function handleToggleFollow() {
    setIsFollowingProfile((prev) => !prev);
    setFollowerCount({
      followerCount: isFollowingProfile ? followerCount - 1 : followerCount + 1,
    });
    await toggleFollow(
      profile.userId,
      user.docId,
      user.userId,
      profile.docId,
      isFollowingProfile
    );
  }
  useEffect(() => {
    const isLoggedInUserFollowingProfile = async () => {
        // const isFollowing = await isUserFollowingProfile(user.username, profile.userId);
        const isFollowing = await isUserFollowingProfile(user.userId,profile.userId)
        setIsFollowingProfile(isFollowing);
    };
    if (user.userId && profile.userId) {
        isLoggedInUserFollowingProfile();   
    }
}, [user.userId, profile.userId]);

  return (
    <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
      <div className=" container flex justify-center">
        <img
          className="h-40 w-40 rounded-full object-cover"
          src={profile.profilePhoto}
          alt={`${username} profile picture`}
        />
      </div>
      <div className="flex flex-col items-center justify-center col-span-2 ">
        <div className="container flex items-center">
          <p className="text-2xl mr-4">{username}</p>
          {isFollowBtnActive && (
            <button
              type="button"
              className="bg-blue-500 font-bold text-sm rounded text-white w-20 h-8"
              onClick={handleToggleFollow}
            >
              {isFollowingProfile ? "Unfollow" : "Follow"}
            </button>
          )}
        </div>
        <div className="container flex mt-4">
          {profile.following === undefined ||
          profile.followers === undefined ? (
            [...new Array(3)].map((_, index) => (
              <Skeleton key={index} className="mr-10" height={24} width={100} />
            ))
          ) : (
            <div className="flex ">
              <p className="mr-10">
                <span className="font-bold">{photosCount} </span>
                {photosCount === 1 ? "post" : "posts"}
              </p>
              <p className="mr-10">
                <span className="font-bold">{followerCount} </span>
                {followerCount === 1 ? "follower" : "followers"}
              </p>
              <p className="mr-10">
                <span className="font-bold">{profile.following.length} </span>
                following{" "}
              </p>
            </div>
          )}
        </div>
        <div className="flex container mt-4 font-bold">
          {!profile.fullName ? (
            <Skeleton height={24} width={150} />
          ) : (
            <p className="font-medium">{profile.fullName}</p>
          )}
        </div>
      </div>
    </div>
  );
}
