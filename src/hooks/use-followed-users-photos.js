import { async } from "@firebase/util";
import { useState, useEffect, useContext } from "react";
import UserContext from "../context/user";
import { getUserByUserId , getUserFollowedPhotos} from "../services/firebase";


export default function useFollowedUsersPhotos() {
  const [photos, setPhotos] = useState(null);
  const  userObj = useContext(UserContext);
  let userId = ""
  if(userObj.user){
    userId = userObj.user.uid 
  console.log(userObj.user)
  // const {user} = userObj 
  // const {user:{uid:userId = ""}} = userObj
  // const { uid: userId = ""} = user;
  console.log(userId, "bla bla")
  }
  useEffect(() => {
    async function getTimelinePhotos() {
      //currentUserData - info o trenutnem uporabniku
      const [currentUserData] = await getUserByUserId(userId)
      console.log(currentUserData.following)
      //slike od userja, ki ga followam
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
