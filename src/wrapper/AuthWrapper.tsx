import useAuthRedirect from "@hooks/useAuthRedirect";
import { Outlet } from "react-router-dom";

const AuthWrapper = () => {
  useAuthRedirect();

  return <Outlet />;
};

export default AuthWrapper;
