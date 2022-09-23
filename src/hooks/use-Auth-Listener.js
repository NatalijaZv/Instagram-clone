import { useState, useEffect, useContext } from "react";
import FirebaseContext from "../context/firebase.tsx";
import { onAuthStateChanged, getAuth } from "firebase/auth";

export default function useAuthListener() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("authUser"))
  );
  const { firebase } = useContext(FirebaseContext);

  useEffect(
    function listener() {
      const auth = getAuth();
      console.log(auth, "auth obj");
      onAuthStateChanged(auth, (authUser) => {
        if (authUser) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          // const uid = user.uid;
          localStorage.setItem("authUser", JSON.stringify(authUser));
          setUser(authUser);
          console.log(authUser, "user auth info");
          // ...
        } else {
          // User is signed out
          // ...
          console.log("user signed out");
          localStorage.removeItem("authUser");
          setUser(null);
          return () => {};
        }
      });
    }
  , [firebase]);
  return {user};
}
