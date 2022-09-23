 
import { useState, useEffect, useContext } from "react";
import UserContext from "../context/user"
import { getUserByUserId } from "../services/firebase";

export default function useUser(){
    const {user} = useContext(UserContext)
    const [activeUser, setActiveUser] = useState({})
    console.log(user)
    useEffect(()=>{
        async function getUserObjByUserId(){
           const [response] = await getUserByUserId(user.uid) 
           console.log(response)
           setActiveUser({...response})
        }
        if(user && user.uid){
            getUserObjByUserId()
        }
    },[user])
    console.log(activeUser)
    return {user : activeUser}
}