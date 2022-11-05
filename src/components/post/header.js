import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProfilePhotoByUsername } from "../../services/firebase";

export default function Header({ username, imageSrc }) {
  const [profilePhoto, setProfilePhoto] = useState("");
  useEffect(() => {
    const getProfilePhoto = async () => {
      const profilePicture = await getProfilePhotoByUsername(username);
      if( username && profilePhoto!==profilePicture ){
          setProfilePhoto(profilePicture);
      }
    };

    if (username) {
      getProfilePhoto();
    }
    return ()=>{}
  }, [username,profilePhoto]);
  return (
    <div className="flex border-b h-4 px-4 py-8 items-center">
      <Link to={`/p/${username}`} className="flex items-center">
        <img
          className="object-cover h-10 w-10 rounded-full mr-3"
          src={profilePhoto}
          alt=""
        />
        <p className="font-bold">{username}</p>
      </Link>
    </div>
  );
}
