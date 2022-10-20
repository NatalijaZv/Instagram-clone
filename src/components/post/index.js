import React, { useRef } from "react";
import Header from "./header";
import Actions from "./actions";
import Image from "./image";
import Footer from "./footer";
import Comments from "./comments";

export default function Post(props) {

  const commentInput = useRef(null);
  const handleFocus = () => commentInput.current.focus();

  return (
    <div className=" rounded-md col-span-4  border bg-white mb-16">
      <Header username={props.photo.username} imageSrc={props.photo.imageSrc} />
      <Image imageSrc={props.photo.imageSrc} />
      <Actions
        docId={props.photo.docId}
        totalLikes={props.photo.likes.length}
        userLikedPhoto={props.photo.userLikedPhoto}
        handleFocus={handleFocus}
      />
      <Footer caption={props.photo.caption} username={props.photo.username} />
      <Comments docId={props.photo.docId} comments={props.photo.comments} posted={props.photo.dateCreated} commentInput={commentInput}/> 
    </div>
  );
}
