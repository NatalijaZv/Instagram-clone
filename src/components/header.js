import React, { useState, useContext } from "react";
import * as ROUTES from "../constants/routes";
import { Link } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import UserContext from "../context/user";

export default function Header() {
  // const user = true;
  const { user } = useContext(UserContext);
  console.log(user);

  async function handleSignOut() {
    const auth = getAuth();
    try {
      await signOut(auth);
      console.log("User Sign out");
      // setUser("")
    } catch (error) {
      console.error(error);
    }
  }
  // function handleSignOut(event) {
  //   event.preventDefault();
  //   setUser((prevUser) => !prevUser);
  //   console.log("dela");
  //   const auth = getAuth();
  //   signOut(auth)
  //     .then(() => {
  //       console.log("successful");
  //       // Sign-out successful.
  //     })
  //     .catch((error) => {
  //       // An error happened.
  //     });
  // }
  return (
    <header className="h-16 bg-white mb-8 border-b ">
      <div className="container mx-auto  max-width-lg  h-full ">
        <div className="flex justify-between h-full items-center text-center">
          <div className="text-center flex items-center align-items cursor-pointer">
            <h1 className="text-gray-700">
              <Link to={ROUTES.DASHBOARD} aria-label="Dashboard">
                <img
                  src="https://scrimba.com/blobs/sha1:d8f8311ae18fcd2b0d9bea85eb29a20e209518f8.png"
                  alt="Instagram"
                  className="mt-2 w-2/4"
                />
              </Link>
            </h1>
          </div>
          <div className="flex justify-center flex-row align-middle">
            {user ? (
              <>
                <Link
                  className="text-sm font-bold px-5 py-1 "
                  to={ROUTES.DASHBOARD}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-8 mr-6 text-black-light cursor-pointer"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                    />
                  </svg>
                </Link>
                <button
                  onClick={handleSignOut}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSignOut();
                    }
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-8 mr-6 text-black-light cursor-pointer"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                    />
                  </svg>
                </button>
                <div>
                  <Link to={`/p/${user.displayName}`}>
                    <img
                      src={"https://th.bing.com/th/id/R.17bfdd845df1440c98a5cfcdeedd633f?rik=u%2bTNThBSlaIVZA&riu=http%3a%2f%2fcdn.onlinewebfonts.com%2fsvg%2fimg_155117.png&ehk=egteo%2fJ8IV6AkqZ2Nlmota2csGEWyhjQbas775TyeHo%3d&risl=&pid=ImgRaw&r=0"}
                      alt={user.displayName}
                      className="h-8 w-8 rounded-full ml-5"
                    />
                  </Link>
                </div>
              </>
            ) : (
              <div>
                <Link to={ROUTES.LOGIN}>
                  <button className="bg-blue-500 text-white text-sm font-bold border rounded px-5 py-1 ">
                    Log In
                  </button>
                </Link>
                <Link to={ROUTES.SIGN_UP}>
                  <button className="text-sm font-bold px-5 py-1 text-blue">
                    Sign Up
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
