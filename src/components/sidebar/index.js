import React from "react";
import useUser from "../../hooks/use-user";
import User from "./user";
import useFollowedUsersPhotos from "../../hooks/use-followed-users-photos";
import Suggestions from "./suggestions";

export default function Sidebar() {
  // const data = useUser()
  const { photos } = useFollowedUsersPhotos();
  const { user: { username, fullName, userId, docId, following } = {} } = useUser();
  console.log(following)
  return (
    <div className="p-4">
        <User username={username} fullName={fullName} photo={photos}/>
      
        <Suggestions userId = {userId} following={following} docId = {docId}/>
    </div>
  );
}
