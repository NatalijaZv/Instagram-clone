import React from "react";
import useUser from "../../hooks/use-user";

export default function Sidebar() {
  // const data = useUser()
  const { user: { username, fullName, userId, docId, following } = {} } = useUser();
  return (
    <div className="p-4">
        <p>Sidebar</p>
    </div>
  );
}
