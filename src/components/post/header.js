import React from "react";
import { Link } from "react-router-dom";

export default function Header({ username, imageSrc }) {
  return (
    <div className="flex border-b h-4 px-4 py-8 items-center">
      <Link to={`/p/${username}`} className="flex items-center">
        <img
          className="object-cover h-10 w-10 rounded-full mr-3"
          src={imageSrc}
          alt=""
        />
        <p className="font-bold">{username}</p>
      </Link>
    </div>
  );
}
