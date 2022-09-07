import React from 'react';
import './App.css';
import * as ROUTES from './constants/routes';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
// import Login from './pages/login';

const Dashboard = React.lazy(() => import("./pages/dashboard"));
const Login = React.lazy(() => import("./pages/login"));
const SignUp = React.lazy(() => import("./pages/signup"));
const Profile = React.lazy(() => import("./pages/profile"));
const NotFound = React.lazy(() => import("./pages/not-found"));

export default function App() {

  return (
    <React.Suspense fallback={<h1>Loading routes...</h1>}>
      <Router>
        <Routes>
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
          <Route path={ROUTES.PROFILE} element={<Profile />} />
          <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
          <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
        </Routes>
      </Router>
    </React.Suspense>
  );

}