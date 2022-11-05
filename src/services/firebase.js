import { async } from "@firebase/util";
import {
  doc,
  collection,
  query,
  where,
  getDocs,
  getDoc,
  getFirestore,
  limit,
  updateDoc,
  arrayUnion,
  arrayRemove,
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

export async function getSuggestedProfiles(userId, following) {
  console.log(following);
  const db = getFirestore(firebase);
  const q = query(
    collection(db, "users"),
    where("userId", "not-in", [...following, userId]),
    limit(10)
  );
  const querySnapshot = await getDocs(q);
  const notFollowedProfiles = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    docId: doc.id,
  }));
  console.log(notFollowedProfiles);
  return notFollowedProfiles;
}

export async function updateMyFollowing(userId, myDocId, isFollowingProfile) {
  const db = getFirestore(firebase);
  const dbRef = doc(db, "users", myDocId);
  if (isFollowingProfile) {
    await updateDoc(dbRef, { following: arrayRemove(userId) });
  } else {
    await updateDoc(dbRef, { following: arrayUnion(userId) });
  }
}

export async function updateFollowedUsersFollowers(
  myUserId,
  userDocId,
  isFollowingProfile
) {
  const db = getFirestore(firebase);
  const dbRef = doc(db, "users", userDocId);
  if (isFollowingProfile) {
    await updateDoc(dbRef, { followers: arrayRemove(myUserId) });
  } else {
    await updateDoc(dbRef, { followers: arrayUnion(myUserId) });
  }
}

export async function getUserByUsername(username) {
  const db = getFirestore(firebase);
  const q = query(collection(db, "users"), where("username", "==", username));
  const queryShapshot = await getDocs(q);
  const user = queryShapshot.docs.map((user) => ({
    ...user.data(),
    docId: user.id,
  }));

  return user.length > 0 ? user : false;
}
export async function getUserIdByUsername(username) {
  const db = getFirestore(firebase);
  const q = query(collection(db, "users"), where("username", "==", username));
  const queryShapshot = await getDocs(q);
  const [{ userId = null }] = queryShapshot.docs.map((user) => ({
    ...user.data(),
    docId: user.id,
  }));
  console.log(userId);
  return userId;
}

export async function getUserPhotosByUsername(username) {
  const userId = await getUserIdByUsername(username);
  const db = getFirestore(firebase);
  const q = query(collection(db, "photos"), where("userId", "==", userId));
  const queryShapshot = await getDocs(q);
  const photos = queryShapshot.docs.map((photo) => ({
    ...photo.data(),
    docId: photo.id,
  }));
  console.log(photos);
  return photos.length > 0 ? photos : [];
}

export async function toggleFollow(profileId, myDocId,myUserId,userDocId,isFollowingProfile) {
  await updateMyFollowing(profileId, myDocId, isFollowingProfile);
  await updateFollowedUsersFollowers(myUserId, userDocId, isFollowingProfile);
}

export async function isUserFollowingProfile(myUserId,profileUserId){
   const db = getFirestore(firebase)
   const q = query(collection(db,"users"),where("userId","==",myUserId), where("following","array-contains",profileUserId))
   const queryShapshot = await getDocs(q)
   const [response ={}] = queryShapshot.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));
  console.log(response);

  return !!response.fullName
}

export async function getProfilePhotoByUsername(username){

  const db = getFirestore(firebase);
  const q = query(collection(db, "users"), where("username", "==", username));
  const queryShapshot = await getDocs(q);
  const [{ profilePhoto = null }] = queryShapshot.docs.map((user) => ({
    ...user.data(),
    docId: user.id,
  }));
  return profilePhoto;
}
