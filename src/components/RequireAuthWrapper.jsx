import { Outlet, Navigate } from "react-router-dom";
import { Paths } from "../paths";

const RequireAuthWrapper = () => {
    const isUserLoggedIn = !!localStorage.getItem("token");
    return isUserLoggedIn ? <Outlet /> : <Navigate to={Paths.login} replace />;
  };

export { RequireAuthWrapper }