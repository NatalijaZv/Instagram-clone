import React, { Fragment } from "react";
import * as ROUTES from "./constants/routes";
import UserContext from "./context/user";
import useAuthListener from "./hooks/use-Auth-Listener";
import ProtectedRoute from "./helpers/is-user-logged-in";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";


const Dashboard = React.lazy(() => import("./pages/dashboard"));
const Login = React.lazy(() => import("./pages/login"));
const SignUp = React.lazy(() => import("./pages/signup"));
const Profile = React.lazy(() => import("./pages/profile"));
const NotFound = React.lazy(() => import("./pages/not-found"));

export default function App() {
  const { user } = useAuthListener();
  //AUTH user
  console.log("APP USER", user);
  return (
    <UserContext.Provider value={{ user }}>
      <React.Suspense fallback={<h1>Loading routes...</h1>}>
        <Router>
          <Routes>
            <Route
              element={
                <ProtectedRoute
                  redirectToRoute={ROUTES.DASHBOARD}
                  needsToBeLoggedIn={false}
                />
              }
            >
              <Route path={ROUTES.LOGIN} element={<Login />} />
              <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
            </Route>
            <Route element={<ProtectedRoute redirectToRoute={ROUTES.LOGIN} />}>
              <Route path={ROUTES.PROFILE} element={<Profile />} />
              <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </React.Suspense>
    </UserContext.Provider>
  );
}
