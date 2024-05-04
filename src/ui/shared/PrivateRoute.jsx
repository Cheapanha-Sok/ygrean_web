import { Outlet, Navigate } from "react-router-dom";
import { UseAuth } from "../../utils/constant/UseAuth";

export default function PrivateRoutes() {
  const token = UseAuth();
  return token ? <Outlet /> : <Navigate to="/authentication" />;
}