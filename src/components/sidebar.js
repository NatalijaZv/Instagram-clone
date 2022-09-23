import React from 'react';
import useUser from "../hooks/use-user"

export default function Sidebar() {
    // const data = useUser()
    const {user: {username,fullName,userId,docId,following}={}} = useUser()
    console.log("dela", username)
    return (<p>Hello, {fullName}</p>);
}