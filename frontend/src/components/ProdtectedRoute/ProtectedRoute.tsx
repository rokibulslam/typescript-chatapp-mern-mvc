import React, { ReactNode } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }:{children:ReactNode}) => {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("userInfo") || "{}");
  if (!user) {
    return <Navigate to="/" state={{ from: location }}></Navigate>;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
