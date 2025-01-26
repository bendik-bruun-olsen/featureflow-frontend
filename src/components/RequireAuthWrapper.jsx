import { Outlet, Navigate } from "react-router-dom";

const RequireAuthWrapper = () => {
    const isUserLoggedIn = !!localStorage.getItem("token");
    return isUserLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
  };

export { RequireAuthWrapper }