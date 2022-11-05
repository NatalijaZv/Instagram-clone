import React, { memo } from "react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

 function User({ username, fullName, profilePhoto }) {
   console.log(profilePhoto)
  return (
    <div>
      {!username || !fullName ? (
        <Skeleton count={1} height={61} />
      ) : (
        <Link
          className="grid grid-cols-4 gap-4 items-center mb-4"
          to={`/p/${username}`}
        >
          <div className="flex items-center justify-between col-span-1">
            <img
              className="w-16 h-16 object-cover rounded-full mr-3"
              src={profilePhoto}
              alt="Profile picture"
            /> 
          </div>
          <div className="col-span-3">
          <p className="font-bold text-sm">{username}</p> 
          <p className="text-sm text-gray-600">{fullName}</p> 
          </div>
          
        </Link>
      )}
    </div>
  );
}
export default memo(User)