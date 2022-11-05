import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserByUsername } from "../services/firebase";
import Header from "../components/header";
import UserProfile from "../components/profile";
import * as ROUTES from "../constants/routes"

export default function Profile() {
    const { username } = useParams()
    const [userExist, setUserExist] = useState(undefined)
    const navigate = useNavigate()
    useEffect(() => {
        async function checkIfUserExist() {
            const doesUserExist = await getUserByUsername(username)
            if(!doesUserExist){
                navigate(ROUTES.NOT_FOUND)
            }
            else(
                setUserExist(true)
            )
        }
        checkIfUserExist()
    },[username, navigate])
    return (
        userExist?
        <div className="bg-gray">
            <Header/>
            <div className="mx-auto max-w-screen-lg">
                <UserProfile username={username}/>
            </div>
        </div>:null)
}