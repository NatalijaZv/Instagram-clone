import React from "react";
import {Navigate, Outlet } from "react-router-dom";
import useAuthListener from "../hooks/use-Auth-Listener";

const ProtectedRoute = ({
  children,
  redirectToRoute,
  needsToBeLoggedIn = true,
}) => {
  const { user } = useAuthListener();
  console.log("lalalala", redirectToRoute);
  if ((needsToBeLoggedIn && !user) || (!needsToBeLoggedIn && user)) {
    // user is not authenticated
    return <Navigate to={redirectToRoute} />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
