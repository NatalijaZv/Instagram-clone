import React, { useState, useEffect, useContext } from "react";
import * as ROUTES from "../constants/routes";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import FirebaseContext from "../context/firebase";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { nanoid } from "nanoid";
import {doesUsernameExist} from "../services/firebase";

export default function SignUp() {
  const [signUpData, setSignUpData] = useState({
    username: "",
    fullName: "",
    emailAdress: "",
    password: "",
    error: "",
  });
  const isInvalid =
    !signUpData.username ||
    !signUpData.fullName ||
    !signUpData.emailAdress ||
    !signUpData.password;
  const isSpace = signUpData.username.indexOf(" ") === -1 ? false : true;
  const { firebase } = useContext(FirebaseContext);
  const navigate = useNavigate();

  //HANDLE CHANGE OF STATE
  function handleChange(event) {
    event.preventDefault();
    setSignUpData((prevData) => {
      return {
        ...prevData,
        [event.target.name]:
          event.target.name === "username" ||
          event.target.name === "emailAdress"
            ? event.target.value.toLowerCase()
            : event.target.value,
      };
    });
  }
  //HANDLE SUBMIT
  async function handleSubmit(event) {
    event.preventDefault();
    const result = await doesUsernameExist(signUpData.username);
    if (result.length !== 0) {
      setSignUpData((prevData) => {
        return {
          username: "",
          fullName: "",
          emailAdress: "",
          password: "",
          error: "Error: That username is already taken, please try another!",
        };
      });
    } else {
      try {
        if (isSpace) {
          setSignUpData((prevData) => {
            return {
              ...prevData,
              error: "Error: Space in username",
            };
          });
        } else {
          const auth = getAuth();
          await createUserWithEmailAndPassword(
            auth,
            signUpData.emailAdress,
            signUpData.password
          );

          await updateProfile(auth.currentUser, {
            displayName: signUpData.username,
          });

          const db = getFirestore(firebase);
          await addDoc(collection(db, "users"), {
            userId: auth.currentUser.uid,
            username: signUpData.username,
            fullName: signUpData.fullName,
            emailAddress: signUpData.emailAdress,
            following: [],
            followers: [],
            dateCreated: Date.now(),
          });
          await navigate(ROUTES.DASHBOARD);
        }
      } catch (error) {
        const errorMessage = error.message;
        setSignUpData((prevData) => {
          return {
            username: "",
            fullName: "",
            emailAdress: "",
            password: "",
            error: errorMessage,
          };
        });
        // console.log(errorMessage);
      }
    }
  }
  useEffect(() => {
    document.title = "Sign Up - Instagram";
  }, []);

  return (
    <div className="container flex flex-col mx-auto h-screen w-2/4 max-w-xs items-center justify-center">
      <div className="flex flex-col items-center p-4 border bg-white mb-2">
        <h1 className="flex justify-center w-full">
          <img
            src="https://scrimba.com/blobs/sha1:d8f8311ae18fcd2b0d9bea85eb29a20e209518f8.png"
            alt="Instagram"
            className="w-2/4 mt-2 mb-4"
          />
        </h1>

        {signUpData.error && (
          <p className="text-red-500 text-xs">{signUpData.error}</p>
        )}

        <form onSubmit={handleSubmit}>
          <input
            aria-label="Enter your username"
            type="text"
            placeholder="Username"
            name="username"
            className="text-sm py-2 px-4 border mb-2 w-full rounded "
            value={signUpData.username}
            onChange={handleChange}
          />
          <input
            aria-label="Enter your full name"
            type="text"
            placeholder="Full name"
            name="fullName"
            className="text-sm py-2 px-4 border mb-2 w-full rounded "
            value={signUpData.fullName}
            onChange={handleChange}
          />
          <input
            aria-label="Enter your email adress"
            type="text"
            placeholder="Email adress"
            name="emailAdress"
            className="text-sm py-2 px-4 border mb-2 w-full rounded "
            value={signUpData.emailAdress}
            onChange={handleChange}
          />
          <input
            aria-label="Enter your password"
            type="text"
            placeholder="Password"
            className="text-sm py-2 px-4 border mb-2 w-full rounded"
            name="password"
            value={signUpData.password}
            onChange={handleChange}
          />

          <button
            disabled={isInvalid}
            className={`bg-blue-500 text-white font-bold w-full rounded py-1 px-4 ${
              isInvalid ? "opacity-50 cursor-not-allowed " : "opacity-100"
            }`}
          >
            Sign Up
          </button>
        </form>
      </div>
      <div className="flex justify-center items-center w-full bg-white border p-3 mt-3">
        <p className="text-sm">
          Have an account?{" "}
          <Link to={ROUTES.LOGIN} className="font-bold text-blue">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
