import React, { memo } from "react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

 function User({ username, fullName }) {
     
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
              src="https://static.remove.bg/remove-bg-web/c05ac62d076574fad1fbc81404cd6083e9a4152b/assets/start-1abfb4fe2980eabfbbaaa4365a0692539f7cd2725f324f904565a9a744f8e214.jpg"
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