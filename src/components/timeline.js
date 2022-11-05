import React from "react";
import useUser from "../hooks/use-user";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import useFollowedUsersPhotos from "../hooks/use-followed-users-photos";
import Post from "./post";

export default function Timeline() {
  const { photos } = useFollowedUsersPhotos();
  console.log(photos);

  return (
    <div className="container col-span-2">
      {!photos ? (
        <Skeleton count={4} width={640} height={500} className="mb-5" />
      ) : (
        <>
          {photos.map((photo) => (
            <Post key={photo.docId} photo={photo} />
          ))}
        </>
      )}
    </div>
  );
}
