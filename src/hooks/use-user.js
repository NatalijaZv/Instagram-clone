 
import { useState, useEffect, useContext } from "react";
import UserContext from "../context/user"
import { getUserByUserId } from "../services/firebase";

export default function useUser(){
    const {user} = useContext(UserContext)
    console.log(user)
    const [activeUser, setActiveUser] = useState({})

    useEffect(()=>{
        async function getUserObjByUserId(){
           const [response] = await getUserByUserId(user.uid) 
           console.log(response,"response user")
           setActiveUser({...response})
           console.log("active User", activeUser)
        }
        if(user && user.uid){
            getUserObjByUserId()
        }
    },[user])
    console.log(activeUser)
    return {user : activeUser}//kaj to pomeni? da returnaš activeuserja pod imenom user?
}