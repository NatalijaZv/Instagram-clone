import React, {useEffect, useState, useContext} from "react";
import FirebaseContext from '../context/firebase';
import * as ROUTES from '../constants/routes';
import { Link } from "react-router-dom";
import {
    getAuth,
    onAuthStateChanged,
    signInAnonymously,
    signInWithEmailAndPassword,
  } from "firebase/auth";

export default function Login() {
    const {firebase} = useContext(FirebaseContext)
    console.log(firebase,"firebase")
    const [loginData, setLoginData] = useState({
        emailAdress:"",
        password:"",
        error:""
        })
        const isInvalid = !loginData.emailAdress || !loginData.password

    useEffect(()=>{
        document.title = "Login - Instagram"
    },[])
    console.log(loginData)

    function handleChange(event){
        event.preventDefault()
        setLoginData(prevData => {
            return {
                ...prevData, 
                [event.target.name]:event.target.value}})
    }

    function handleSubmit(event){
        event.preventDefault()
        const auth = getAuth()
            signInWithEmailAndPassword(auth,loginData.emailAdress,loginData.password)
            .then((userCredential) => {
                // Signed in
                // const user = userCredential.user;
                console.log("New sign is succeeded:", userCredential);
            
                // seedDatabase(firebase);   //POMEMBNO!
                // ...
              })
              .catch((error) => {
                  console.error(error.message, "error message")
                  console.error(error, "celoten error")
                  const errorCode = error.code;
                  const errorMessage = error.message;
                setLoginData(prevData => {
                    return {
                        emailAdress:"",
                        password:"",
                        error:`Error: ${errorCode}`}})
             
                console.log("New sign in failed:");
              });
    }
    return (
        <div className="container flex mx-auto max-w-screen-md h-screen items-center">
            <div className="flex w-3/5">
                <img src="https://scrimba.com/blobs/sha1:131a3463481d0fd829b196100e96a70808cce967.jpg" alt="iPhone with Instagram app" />
            </div>
            <div className="flex flex-col w-2/5">
                <div className="flex flex-col items-center p-4 border bg-white mb-2">
                    <h1 className="flex justify-center w-full">
                        <img src="https://scrimba.com/blobs/sha1:d8f8311ae18fcd2b0d9bea85eb29a20e209518f8.png" alt="Instagram" className="w-2/4 mt-2 mb-4" />
                    </h1>
                    {loginData.error && <p className="text-red-500 text-xs">{loginData.error}</p>}
                    <form onSubmit={handleSubmit}>
                        <input
                            aria-label="Enter your email adress"
                            type="text"
                            placeholder="Email adress"
                            name="emailAdress"
                            className="text-sm py-2 px-4 border mb-2 w-full rounded "
                            value={loginData.emailAdress}
                            onChange = {handleChange}
                        />
                        <input
                            aria-label="Enter your password"
                            type="text"
                            placeholder="Password"
                            className="text-sm py-2 px-4 border mb-2 w-full rounded"
                            name="password"
                            value={loginData.password}
                            onChange={handleChange}
                        />
                    
                        <button disabled={isInvalid} className={`bg-blue-500 text-white font-bold w-full rounded py-1 px-4 ${isInvalid?"opacity-50 cursor-not-allowed ":"opacity-100"}`}>Log In</button>

                    </form>
                </div>
                <div className="flex justify-center items-center w-full bg-white border p-3 mt-3">
                    <p className="text-sm">Do you have an account? <Link to={ROUTES.SIGN_UP} className="font-bold">Sign Up</Link></p>
                </div>

            </div>
        </div>

    )
}