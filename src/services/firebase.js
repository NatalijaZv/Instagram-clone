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
    // doc.data() is never undefined for query doc snapshots
    console.log(doc, " => ", doc.data());
  });
  return querySnapshot.docs.map((user) => user.data().length > 0);
}

export async function getUserByUserId(userUid) {
  const db = getFirestore(firebase);
  const q = query(collection(db, "users"), where("userId", "==", userUid));
  const querySnapshot = await getDocs(q);

  const user = querySnapshot.docs.map((user) => ({
    ...user.data(),
    docId: user.id,
  }));
  console.log(user[0])
  return user
}
