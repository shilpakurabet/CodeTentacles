/** @format */

import { Navigate, Outlet } from "react-router";
import { useAuth } from "../utils/helper";
import Register from "../components/Register";
import Login from "../components/Login";

export const ProtectedRoutes = () => {
  const auth = useAuth();
  return auth ? <Outlet /> : <Navigate to="/" />;
};

export const PublicRoutes = () => {
  const auth = useAuth();
  return auth ? <Navigate to="/home" /> : <Outlet />;
};
