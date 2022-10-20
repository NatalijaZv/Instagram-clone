import { async } from "@firebase/util";
import {
  collection,
  query,
  where,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import { firebase } from "../lib/firebase";

export async function doesUsernameExist(username) {
  const db = getFirestore(firebase);
  const q = query(collection(db, "users"), where("username", "==", username));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {

    console.log(doc, " => ", doc.data());
  });
  return querySnapshot.docs.map((user) => user.data().length > 0);
}

export async function getUserByUserId(userUid) {
  const db = getFirestore(firebase);
  const q = query(collection(db, "users"), where("userId", "==", userUid));
  const querySnapshot = await getDocs(q);
  console.log(querySnapshot, "queryshapshot");
  const user = querySnapshot.docs.map((user) => ({
    ...user.data(),
    docId: user.id,
  }));
  console.log(user);
  return user;
}



export async function getUserFollowedPhotos(userId, followingUserIds) {
  const db = getFirestore(firebase);
  const q = query(
    collection(db, "photos"),
    where("userId", "in", followingUserIds)
  );
  const queryShapshot = await getDocs(q);
  queryShapshot.forEach((doc) => {
    console.log("GLEJ TUKAJ", doc.id, doc.data());
  });
  const userFollowedPhotos = queryShapshot.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));
  const photosWithUserDetails = await Promise.all(
    userFollowedPhotos.map(async (photo) => {
      let userLikedPhoto = false;
      if (photo.likes.includes(userId)) {
        userLikedPhoto = true;
      }
      let [user] = await getUserByUserId(photo.userId);  
      return { username: user.username, ...photo, userLikedPhoto };
    })
  );
  return photosWithUserDetails;
}
