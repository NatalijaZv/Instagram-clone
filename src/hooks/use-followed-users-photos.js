import { useState, useEffect, useContext } from "react";
import UserContext from "../context/user";
import { getUserByUserId , getUserFollowedPhotos} from "../services/firebase";


export default function useFollowedUsersPhotos() {
  const [photos, setPhotos] = useState(null);
  const  userObj = useContext(UserContext);
  let userId = ""
  if(userObj.user){
    userId = userObj.user.uid 

  }
  useEffect(() => {
    async function getTimelinePhotos() {
      const [currentUserData] = await getUserByUserId(userId)
      let followedUserPhotos = []
      if(currentUserData && currentUserData.following.length > 0){
       followedUserPhotos = await getUserFollowedPhotos(userId, currentUserData.following)
       console.log(followedUserPhotos)
       followedUserPhotos.sort((a,b)=>b.dateCreated - a.dateCreated)
       setPhotos(followedUserPhotos)
      }
    }
    getTimelinePhotos()
  }, [userId]);

  return { photos };}
