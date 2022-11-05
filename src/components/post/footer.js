import React from "react";

export default function Footer(props) {
    return(
        <div className="flex p-4 pt-2 pb-0">
            <p className="mr-3 font-bold">{props.username}</p>
            <p>{props.caption}</p>
    
        </div>
    )
}
